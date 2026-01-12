import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Users
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: hashedPassword,
      name: 'John Doe',
      role: Role.STUDENT,
    },
  });

  // Subjects
  const subjects = [
    {
      name: 'Mathematics',
      description: 'The study of numbers, shapes, and patterns.',
      icon: 'calculator',
      color: 'blue',
      subtopics: [
        {
          name: 'Numbers & Operations',
          lessons: [
            {
              title: 'Introduction to Integers',
              content: 'Integers are whole numbers that can be positive, negative, or zero. They do not include fractions or decimals.',
              quizzes: [
                {
                  title: 'Integers Quiz',
                  questions: [
                    {
                      text: 'Which of the following is an integer?',
                      options: ['1.5', '-5', '2/3', '0.75'],
                      answer: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Algebra', lessons: [] },
        { name: 'Geometry', lessons: [] },
        { name: 'Trigonometry', lessons: [] },
        { name: 'Calculus', lessons: [] },
        { name: 'Statistics & Probability', lessons: [] },
      ],
    },
    {
      name: 'Science',
      description: 'The systematic study of the structure and behavior of the physical and natural world.',
      icon: 'beaker',
      color: 'green',
      subtopics: [
        {
          name: 'Physics',
          lessons: [
            {
              title: 'Newtons Laws of Motion',
              content: '1. An object at rest stays at rest. 2. F = ma. 3. Every action has an equal and opposite reaction.',
              quizzes: [
                {
                  title: 'Physics Quiz',
                  questions: [
                    {
                      text: 'What is the formula for force?',
                      options: ['F = m/a', 'F = ma', 'F = a/m', 'F = m+a'],
                      answer: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Chemistry', lessons: [] },
        { name: 'Biology', lessons: [] },
        { name: 'Earth Science', lessons: [] },
        { name: 'Environmental Science', lessons: [] },
      ],
    },
    {
      name: 'English',
      description: 'Language, literature, and communication skills.',
      icon: 'book',
      color: 'purple',
      subtopics: [
        {
          name: 'Grammar',
          lessons: [
            {
              title: 'Parts of Speech',
              content: 'Nouns, Verbs, Adjectives, Adverbs, Pronouns, Prepositions, Conjunctions, and Interjections are the 8 parts of speech.',
              quizzes: [
                {
                  title: 'Grammar Quiz',
                  questions: [
                    {
                      text: 'Which of these is a verb?',
                      options: ['Apple', 'Running', 'Beautiful', 'Quickly'],
                      answer: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Vocabulary', lessons: [] },
        { name: 'Reading Comprehension', lessons: [] },
        { name: 'Writing Skills', lessons: [] },
        { name: 'Literature', lessons: [] },
      ],
    },
    {
      name: 'History',
      description: 'The study of past events, particularly in human affairs.',
      icon: 'landmark',
      color: 'amber',
      subtopics: [
        {
          name: 'Ancient History',
          lessons: [
            {
              title: 'The Indus Valley Civilization',
              content: 'The Indus Valley Civilization was a Bronze Age civilization in the northwestern regions of South Asia.',
              quizzes: [
                {
                  title: 'History Quiz',
                  questions: [
                    {
                      text: 'Which river was central to the Indus Valley Civilization?',
                      options: ['Nile', 'Indus', 'Ganges', 'Amazon'],
                      answer: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Medieval History', lessons: [] },
        { name: 'Modern History', lessons: [] },
        { name: 'World History', lessons: [] },
        { name: 'Civics', lessons: [] },
      ],
    },
    {
      name: 'Geography',
      description: 'The study of the physical features of the earth and its atmosphere.',
      icon: 'globe',
      color: 'emerald',
      subtopics: [
        {
          name: 'Physical Geography',
          lessons: [
            {
              title: 'Internal Structure of the Earth',
              content: 'The Earth consists of three main layers: the crust, the mantle, and the core.',
              quizzes: [
                {
                  title: 'Geography Quiz',
                  questions: [
                    {
                      text: 'What is the outermost layer of the Earth?',
                      options: ['Core', 'Mantle', 'Crust', 'Magma'],
                      answer: 2,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Human Geography', lessons: [] },
        { name: 'Maps & Skills', lessons: [] },
        { name: 'Climate & Weather', lessons: [] },
      ],
    },
    {
      name: 'ICT / Computer Science',
      description: 'Technology, computing, and digital literacy.',
      icon: 'cpu',
      color: 'indigo',
      subtopics: [
        {
          name: 'Computer Basics',
          lessons: [
            {
              title: 'Introduction to Hardware',
              content: 'Hardware refers to the physical components of a computer system, such as the CPU, RAM, and storage.',
              quizzes: [
                {
                  title: 'ICT Quiz',
                  questions: [
                    {
                      text: 'What does CPU stand for?',
                      options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Process Utility', 'Common Power Unit'],
                      answer: 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Internet & Safety', lessons: [] },
        { name: 'Programming Basics', lessons: [] },
        { name: 'Data & Databases', lessons: [] },
        { name: 'AI Fundamentals', lessons: [] },
      ],
    },
    {
      name: 'General Knowledge (GK)',
      description: 'Broad knowledge across various fields.',
      icon: 'lightbulb',
      color: 'yellow',
      subtopics: [
        {
          name: 'World Facts',
          lessons: [
            {
              title: 'Seven Wonders of the World',
              content: 'The Seven Wonders of the Ancient World is a list of remarkable constructions of classical antiquity.',
              quizzes: [
                {
                  title: 'GK Quiz',
                  questions: [
                    {
                      text: 'Which of these is one of the Seven Wonders?',
                      options: ['Eiffel Tower', 'Great Wall of China', 'Statue of Liberty', 'Burj Khalifa'],
                      answer: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Current Affairs', lessons: [] },
        { name: 'Science & Tech GK', lessons: [] },
        { name: 'Sports GK', lessons: [] },
        { name: 'Logical Reasoning', lessons: [] },
      ],
    },
    {
      name: 'Languages',
      description: 'Study of different world languages.',
      icon: 'languages',
      color: 'pink',
      subtopics: [
        {
          name: 'Grammar',
          lessons: [
            {
              title: 'Noun Genders',
              content: 'In many languages, nouns have genders (masculine, feminine, neuter).',
              quizzes: [
                {
                  title: 'Languages Quiz',
                  questions: [
                    {
                      text: 'What is "gender" in the context of grammar?',
                      options: ['A type of verb', 'A category for nouns', 'A punctuation mark', 'A tense'],
                      answer: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Speaking', lessons: [] },
        { name: 'Listening', lessons: [] },
        { name: 'Writing', lessons: [] },
      ],
    },
    {
      name: 'Life Skills',
      description: 'Essential skills for personal growth and career.',
      icon: 'user-check',
      color: 'cyan',
      subtopics: [
        {
          name: 'Financial Literacy',
          lessons: [
            {
              title: 'Introduction to Budgeting',
              content: 'Budgeting is the process of creating a plan to spend your money.',
              quizzes: [
                {
                  title: 'Life Skills Quiz',
                  questions: [
                    {
                      text: 'What is a budget?',
                      options: ['A spending plan', 'A bank account', 'A type of loan', 'A credit card'],
                      answer: 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Critical Thinking', lessons: [] },
        { name: 'Health & Wellness', lessons: [] },
        { name: 'Career Awareness', lessons: [] },
      ],
    },
  ];

  for (const s of subjects) {
    const subject = await prisma.subject.upsert({
      where: { name: s.name },
      update: {},
      create: {
        name: s.name,
        description: s.description,
        icon: s.icon,
        color: s.color,
      },
    });

    for (const st of s.subtopics) {
      const subtopic = await prisma.subtopic.create({
        data: {
          name: st.name,
          subjectId: subject.id,
        },
      });

      if (st.lessons) {
        for (const l of st.lessons) {
          const lesson = await prisma.lesson.create({
            data: {
              title: l.title,
              content: l.content,
              subtopicId: subtopic.id,
            },
          });

          for (const q of l.quizzes) {
            const quiz = await prisma.quiz.create({
              data: {
                title: q.title,
                lessonId: lesson.id,
              },
            });

            for (const ques of q.questions) {
              await prisma.question.create({
                data: {
                  text: ques.text,
                  options: ques.options,
                  answer: ques.answer,
                  quizId: quiz.id,
                },
              });
            }
          }
        }
      }
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
