// Mock data for the application
// In a real application, this would be fetched from an API

export const mockStudents = [
  {
    id: 'D100000001',
    name: 'Clark Kent',
    email: 'clark.kent@designden.space',
    studentId: 'D100000001',
    avatarUrl: 'https://i.pravatar.cc/150?u=clark.kent'
  },
  {
    id: 'D100000002',
    name: 'Bruce Wayne',
    email: 'bruce.wayne@designden.space',
    studentId: 'D100000002',
    avatarUrl: 'https://i.pravatar.cc/150?u=bruce.wayne'
  },
  {
    id: 'D100000003',
    name: 'Diana Prince',
    email: 'diana.prince@designden.space',
    studentId: 'D100000003',
    avatarUrl: 'https://i.pravatar.cc/150?u=diana.prince'
  },
  {
    id: 'D100000013',
    name: 'Kara Danvers',
    email: 'kara.danvers@designden.space',
    studentId: 'D100000013',
    avatarUrl: 'https://i.pravatar.cc/150?u=kara.danvers'
  },
  {
    id: 'D100000027',
    name: 'Peter Parker',
    email: 'peter.parker@designden.space',
    studentId: 'D100000027',
    avatarUrl: 'https://i.pravatar.cc/150?u=peter.parker'
  }
];

const statuses = ['❓', '❌', '⚠️', '✅', '🔎'];
const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];

export const mockCourses = [
  {
    id: 'DSGN101',
    name: 'Introduction to Design',
    description: 'Fundamentals of design principles and elements',
    year: '2025',
    term: 'Fall',
    enrolledStudents: ['D100000001', 'D100000003', 'D100000013'],
    completionRate: 72,
    forms: [
      { id: '101', name: 'Hot Glue Gun Safety Quiz', status: getRandomStatus() },
      { id: '102', name: 'Color Theory Assessment', status: getRandomStatus() },
      { id: '103', name: 'Typography Fundamentals', status: getRandomStatus() }
    ]
  },
  {
    id: 'DSGN201',
    name: 'Advanced Typography',
    description: 'In-depth study of typography in modern design',
    year: '2025',
    term: 'Winter',
    enrolledStudents: ['D100000002', 'D100000027'],
    completionRate: 45,
    forms: [
      { id: '201', name: 'Hot Glue Gun Safety Quiz', status: getRandomStatus() },
      { id: '202', name: 'Typography History', status: getRandomStatus() },
      { id: '203', name: 'Layout Design Principles', status: getRandomStatus() },
      { id: '204', name: 'Typographic Hierarchy', status: getRandomStatus() }
    ]
  },
  {
    id: 'DSGN301',
    name: 'Visual Communication',
    description: 'Effective communication through visual design',
    year: '2026',
    term: 'Spring',
    enrolledStudents: ['D100000001', 'D100000002', 'D100000003', 'D100000013', 'D100000027'],
    completionRate: 30,
    forms: [
      { id: '301', name: 'Hot Glue Gun Safety Quiz', status: getRandomStatus() },
      { id: '302', name: 'Infographic Design', status: getRandomStatus() },
      { id: '303', name: 'Brand Identity Creation', status: getRandomStatus() }
    ]
  }
];

// Student view of courses with more detailed form information
export const mockStudentCourses = [
  {
    id: 'DSGN101',
    name: 'Introduction to Design',
    description: 'Fundamentals of design principles and elements',
    year: '2025',
    term: 'Fall',
    enrolledStudents: ['D100000001', 'D100000003', 'D100000013'],
    forms: [
      { 
        id: '101', 
        name: 'Hot Glue Gun Safety Quiz', 
        description: 'Safety certification for hot glue gun operation',
        status: getRandomStatus(),
        lastAttempt: '2025-03-15T10:30:00Z'
      },
      { 
        id: '102', 
        name: 'Color Theory Assessment', 
        description: 'Certification for understanding and applying color theory',
        status: getRandomStatus(),
        lastAttempt: '2025-03-18T14:45:00Z'
      },
      { 
        id: '103', 
        name: 'Typography Fundamentals', 
        description: 'Certification for typography principles and usage',
        status: getRandomStatus(),
        lastAttempt: null
      }
    ]
  },
  {
    id: 'DSGN201',
    name: 'Advanced Typography',
    description: 'In-depth study of typography in modern design',
    year: '2025',
    term: 'Winter',
    enrolledStudents: ['D100000002', 'D100000027'],
    forms: [
      { 
        id: '201', 
        name: 'Hot Glue Gun Safety Quiz', 
        description: 'Safety certification for hot glue gun operation',
        status: getRandomStatus(),
        lastAttempt: '2025-03-10T09:15:00Z'
      },
      { 
        id: '202', 
        name: 'Typography History', 
        description: 'Assessment of knowledge about typography history',
        status: getRandomStatus(),
        lastAttempt: '2025-03-12T11:00:00Z'
      },
      { 
        id: '203', 
        name: 'Layout Design Principles', 
        description: 'Certification for page layout and design principles',
        status: getRandomStatus(),
        lastAttempt: null
      },
      { 
        id: '204', 
        name: 'Typographic Hierarchy', 
        description: 'Assessment of typographic hierarchy implementation',
        status: getRandomStatus(),
        lastAttempt: null
      }
    ]
  },
  {
    id: 'DSGN301',
    name: 'Visual Communication',
    description: 'Effective communication through visual design',
    year: '2026',
    term: 'Spring',
    enrolledStudents: ['D100000001', 'D100000002', 'D100000003', 'D100000013', 'D100000027'],
    forms: [
      { 
        id: '301', 
        name: 'Hot Glue Gun Safety Quiz', 
        description: 'Safety certification for hot glue gun operation',
        status: getRandomStatus(),
        lastAttempt: '2025-04-05T15:30:00Z'
      },
      { 
        id: '302', 
        name: 'Infographic Design', 
        description: 'Assessment of data visualization and infographic creation',
        status: getRandomStatus(),
        lastAttempt: null
      },
      { 
        id: '303', 
        name: 'Brand Identity Creation', 
        description: 'Certification for brand identity design principles',
        status: getRandomStatus(),
        lastAttempt: null
      }
    ]
  }
];

// Mock form template data
export const mockFormTemplate = {
  id: '101',
  title: 'Hot Glue Gun Safety Quiz',
  description: 'Safety certification for proper hot glue gun operation and handling',
  sections: [
    {
      id: 's1',
      title: 'Student Information',
      questions: [
        {
          id: 'q1',
          type: 'text',
          question: 'Email Address',
          required: true
        },
        {
          id: 'q2',
          type: 'text',
          question: 'First Name',
          required: true
        },
        {
          id: 'q3',
          type: 'text',
          question: 'Last Name',
          required: true
        }
      ]
    },
    {
      id: 's2',
      title: 'Course Information',
      questions: [
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'Which class is requiring you to take this quiz?',
          options: [
            'MS Robotics',
            'US Robotics',
            'Parish Inc.',
            '6th Science',
            '8th Science',
            'CAD/CAM',
            'MAKE',
            'Rover',
            'Intro/Advanced Engineering',
            'Panther Tech',
            'Physics',
            'Independent Study/Want to hang out in the Den',
            'Comp Sci',
            'Sustainable Architecture',
            'Digital Media',
            'Boot Camp',
            'I C.A.N. Innovate',
            '6th engineering',
            '6th reverse engineering',
            'Option 20'
          ],
          required: true
        }
      ]
    },
    {
      id: 's3',
      title: 'Safety Questions',
      questions: [
        {
          id: 'q5',
          type: 'true_false',
          question: 'True or False: Upon discovering the condition of the power strip seen in the picture below the teacher did a "happy dance" celebrating this creative and innovative use for hot glue.',
          correctAnswer: false,
          required: true
        },
        {
          id: 'q6',
          type: 'multiple_choice',
          question: 'I should only use tools if.... (check all that apply)',
          options: [
            'I have scored 100% on my tool demonstration quiz.',
            'I have seen a teacher demonstrate the proper use of the tool.',
            'I have scored 100% on my tool quiz.',
            'I have teacher permission.'
          ],
          multiSelect: true,
          correctAnswers: [
            'I have scored 100% on my tool demonstration quiz.',
            'I have seen a teacher demonstrate the proper use of the tool.',
            'I have scored 100% on my tool quiz.',
            'I have teacher permission.'
          ],
          required: true
        },
        {
          id: 'q7',
          type: 'multiple_choice',
          question: 'A student has instructor permission to use a tool. Before using the tool the student should...',
          options: [
            'Put on proper personal safety equipment',
            'Ride up and down on their stool at least four times',
            'Tie back long hair',
            'Remove their tie',
            'Remove any dangly jewelry'
          ],
          multiSelect: true,
          correctAnswers: [
            'Put on proper personal safety equipment',
            'Tie back long hair',
            'Remove their tie',
            'Remove any dangly jewelry'
          ],
          required: true
        },
        {
          id: 'q8',
          type: 'multiple_choice',
          question: 'If the glue sticks I have are too big for the hole on the hot glue gun I should...',
          options: [
            'use a tool to trim it down until it fits',
            'sit and do nothing',
            'check in the hot glue stick bin to see if there are any glue sticks that will fit my hot glue gun',
            'trade my hot glue gun for one that will fit the larger hot glue gun stick'
          ],
          correctAnswer: 'check in the hot glue stick bin to see if there are any glue sticks that will fit my hot glue gun',
          required: true
        },
        {
          id: 'q9',
          type: 'true_false',
          question: 'True or False: Hot glue can cause burns',
          correctAnswer: true,
          required: true
        },
        {
          id: 'q10',
          type: 'true_false',
          question: 'True or False: Melted hot glue can soak through thin material and cause burns',
          correctAnswer: true,
          required: true
        },
        {
          id: 'q11',
          type: 'multiple_choice',
          question: 'My class is over but another class is coming right after mine I should...',
          options: [
            'leave my hot glue gun plugged in so it is ready for the other class.',
            'unplug my hot glue gun and put it away carefully. A hot glue gun left plugged in an unattended is a fire risk.'
          ],
          correctAnswer: 'unplug my hot glue gun and put it away carefully. A hot glue gun left plugged in an unattended is a fire risk.',
          required: true
        },
        {
          id: 'q12',
          type: 'multiple_choice',
          question: 'Which photo and explanation BEST describe the preferred and safest way to set-up a hot glue gun in the Design Den?',
          options: [
            'Option 1 - I\'m on the floor close to the outlet, mostly out of the way and I have hot glue gun is resting on paper.',
            'Option 2 - I carefully used an extension cord to reach from the nearest outlet and up on to the table. The cord for my hot glue gun is just hanging there but it seems safe as long as no one catches their foot on the extension and pulls the hot glue gun off the table.',
            'Option 3 - I\'m working right by where the hot glue guns and extra glue is kept. There are globs of glue on top of the cart but who cares its card board and it looks like other people did it so it MUST be okay. Plus I\'m super close to Mr. Cribbs if I need to ask a question.',
            'Option 4 - I have paper under my hot glue gun to catch any drips. I\'ve plugged the hot glue gun into a power strip that is on top of the table so others can use hot glue guns on the table too. For extra safety I wrapped the power strip cord in case any one catches their foot underneath the hot glue gun shouldn\'t go flying.',
            'Option 5 - I have paper for my hot glue gun to catch drips and wrapped my extension cord around the table leg so the hot glue gun shouldn\'t fly off if someone trips.'
          ],
          correctAnswer: 'Option 4 - I have paper under my hot glue gun to catch any drips. I\'ve plugged the hot glue gun into a power strip that is on top of the table so others can use hot glue guns on the table too. For extra safety I wrapped the power strip cord in case any one catches their foot underneath the hot glue gun shouldn\'t go flying.',
          required: true
        }
      ]
    },
    {
      id: 's4',
      title: 'Certification',
      questions: [
        {
          id: 'q13',
          type: 'text',
          question: 'Type your full name',
          required: true
        },
        {
          id: 'q14',
          type: 'signature',
          question: 'Sign your name below to certify that you understand and will follow these safety guidelines',
          required: true
        }
      ]
    }
  ]
};

// Available academic terms
export const academicTerms = [
  { year: '2025-2026', term: 'Fall' },
  { year: '2025-2026', term: 'Winter' },
  { year: '2025-2026', term: 'Spring' },
  { year: '2025-2026', term: 'Summer' },
  { year: '2026-2027', term: 'Fall' },
  { year: '2026-2027', term: 'Winter' },
  { year: '2026-2027', term: 'Spring' },
  { year: '2026-2027', term: 'Summer' },
  { year: '2027-2028', term: 'Fall' },
  { year: '2027-2028', term: 'Winter' },
  { year: '2027-2028', term: 'Spring' },
  { year: '2027-2028', term: 'Summer' }
];