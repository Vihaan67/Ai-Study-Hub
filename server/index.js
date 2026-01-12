const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 10000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

app.use(cors());
app.use(express.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

// --- AUTH ROUTES ---

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// --- CONTENT ROUTES ---

app.get('/api/subjects', async (req, res) => {
    try {
        const subjects = await prisma.subject.findMany({
            include: { _count: { select: { subtopics: true } } },
        });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subjects' });
    }
});

app.get('/api/subjects/:id', async (req, res) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: req.params.id },
            include: {
                subtopics: {
                    include: {
                        lessons: true,
                    },
                },
            },
        });
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subject details' });
    }
});

app.get('/api/lessons/:id', async (req, res) => {
    try {
        const lesson = await prisma.lesson.findUnique({
            where: { id: req.params.id },
            include: {
                quizzes: {
                    include: {
                        questions: true,
                    },
                },
            },
        });
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lesson' });
    }
});

// --- PROGRESS ROUTES ---

app.post('/api/progress', authenticateToken, async (req, res) => {
    try {
        const { lessonId, completed, score } = req.body;
        const progress = await prisma.progress.upsert({
            where: {
                userId_lessonId: {
                    userId: req.user.id,
                    lessonId,
                },
            },
            update: { completed, score },
            create: {
                userId: req.user.id,
                lessonId,
                completed,
                score,
            },
        });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

app.get('/api/user/progress', authenticateToken, async (req, res) => {
    try {
        const progress = await prisma.progress.findMany({
            where: { userId: req.user.id },
            include: {
                lesson: {
                    include: {
                        subtopic: {
                            include: {
                                subject: true,
                            },
                        },
                    },
                },
            },
        });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user progress' });
    }
});


// All other GET requests not handled will return our React app
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(404).send('App not found. Please check build configuration.');
        }
    });
});

app.listen(PORT, () => {
    const fs = require('fs');
    const publicPath = path.join(__dirname, 'public');
    console.log(`Server running on port ${PORT}`);
    console.log('Public directory path:', publicPath);

    if (fs.existsSync(publicPath)) {
        console.log('Public directory exists');
        const files = fs.readdirSync(publicPath);
        console.log('Files in public directory:', files);
    } else {
        console.error('WARNING: Public directory does not exist!');
    }
});
