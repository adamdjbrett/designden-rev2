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
      { id: '101', name: 'Design Software Basics', status: 'approved_unsupervised' },
      { id: '102', name: 'Color Theory Assessment', status: 'approved_supervised' },
      { id: '103', name: 'Typography Fundamentals', status: 'not_started' }
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
      { id: '201', name: 'Font Creation Tools', status: 'approved_supervised' },
      { id: '202', name: 'Typography History', status: 'failed' },
      { id: '203', name: 'Layout Design Principles', status: 'not_started' },
      { id: '204', name: 'Typographic Hierarchy', status: 'not_started' }
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
      { id: '301', name: 'Visual Storytelling', status: 'approved_unsupervised' },
      { id: '302', name: 'Infographic Design', status: 'needs_review' },
      { id: '303', name: 'Brand Identity Creation', status: 'not_started' }
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
        name: 'Design Software Basics', 
        description: 'Certification for basic design software tools',
        status: 'approved_unsupervised',
        lastAttempt: '2025-03-15T10:30:00Z'
      },
      { 
        id: '102', 
        name: 'Color Theory Assessment', 
        description: 'Certification for understanding and applying color theory',
        status: 'approved_supervised',
        lastAttempt: '2025-03-18T14:45:00Z'
      },
      { 
        id: '103', 
        name: 'Typography Fundamentals', 
        description: 'Certification for typography principles and usage',
        status: 'not_started',
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
        name: 'Font Creation Tools', 
        description: 'Certification for font design and creation tools',
        status: 'approved_supervised',
        lastAttempt: '2025-03-10T09:15:00Z'
      },
      { 
        id: '202', 
        name: 'Typography History', 
        description: 'Assessment of knowledge about typography history',
        status: 'failed',
        lastAttempt: '2025-03-12T11:00:00Z'
      },
      { 
        id: '203', 
        name: 'Layout Design Principles', 
        description: 'Certification for page layout and design principles',
        status: 'not_started',
        lastAttempt: null
      },
      { 
        id: '204', 
        name: 'Typographic Hierarchy', 
        description: 'Assessment of typographic hierarchy implementation',
        status: 'not_started',
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
        name: 'Visual Storytelling', 
        description: 'Certification for visual narrative techniques',
        status: 'approved_unsupervised',
        lastAttempt: '2025-04-05T15:30:00Z'
      },
      { 
        id: '302', 
        name: 'Infographic Design', 
        description: 'Assessment of data visualization and infographic creation',
        status: 'needs_review',
        lastAttempt: null
      },
      { 
        id: '303', 
        name: 'Brand Identity Creation', 
        description: 'Certification for brand identity design principles',
        status: 'not_started',
        lastAttempt: null
      }
    ]
  }
];

// Mock form template data
export const mockFormTemplate = {
  id: '101',
  title: 'Design Software Basics',
  description: 'Certification for basic design software tools and practices',
  sections: [
    {
      id: 's1',
      title: 'Software Knowledge',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Which tool would you use to create vector graphics?',
          options: ['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro'],
          correctAnswer: 'Illustrator'
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'Which file format preserves layers?',
          options: ['JPEG', 'PNG', 'PSD', 'GIF'],
          correctAnswer: 'PSD'
        }
      ]
    },
    {
      id: 's2',
      title: 'Safety Protocols',
      questions: [
        {
          id: 'q3',
          type: 'true_false',
          question: 'You should always save your work frequently.',
          correctAnswer: true
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'What is the proper way to handle software crashes?',
          options: [
            'Force restart the computer immediately',
            'Wait for the system to recover on its own',
            'Try to save work in other open applications, then restart the application',
            'Unplug the computer'
          ],
          correctAnswer: 'Try to save work in other open applications, then restart the application'
        }
      ]
    },
    {
      id: 's3',
      title: 'Practical Application',
      questions: [
        {
          id: 'q5',
          type: 'text',
          question: 'Describe the process you would use to create a logo for a client.',
          minWords: 30
        },
        {
          id: 'q6',
          type: 'file_upload',
          question: 'Upload a screenshot of your workspace with proper tool arrangement.',
          allowedFileTypes: ['image/jpeg', 'image/png'],
          maxFileSize: 5 // MB
        }
      ]
    },
    {
      id: 's4',
      title: 'Certification',
      questions: [
        {
          id: 'q7',
          type: 'signature',
          question: 'I certify that I have completed this training and understand the proper use of design software tools.',
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