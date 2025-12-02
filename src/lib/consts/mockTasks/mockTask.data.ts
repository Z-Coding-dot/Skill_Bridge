import type { Task } from "../../../types/task";


export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Web Design for Student Portfolio',
    description: 'Looking for a creative designer to build a modern portfolio website. Must be proficient in Figma and have experience with responsive design.',
    category: 'Gig',
    deadline: '2025-11-15',
    type: 'Gig',
    postedBy: {
      id: '101',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    status: 'Open',
    createdAt: '2025-10-10'
  },
  {
    id: '2',
    title: 'Marketing Intern - Social Media',
    description: 'Join our startup as a marketing intern! Help manage social media accounts, create content, and engage with our community. Great opportunity to learn digital marketing.',
    category: 'Internship',
    deadline: '2025-12-01',
    type: 'Internship',
    postedBy: {
      id: '102',
      name: 'Tech Startup Inc.',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop'
    },
    status: 'Open',
    createdAt: '2025-10-12'
  },
  {
    id: '3',
    title: 'Math Tutor for Calculus',
    description: 'Need help with Calculus I. Looking for a patient tutor who can explain concepts clearly. 2 sessions per week, flexible schedule.',
    category: 'Tutoring',
    deadline: '2025-10-30',
    type: 'Tutoring',
    postedBy: {
      id: '103',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    status: 'Open',
    createdAt: '2025-10-14'
  },
  {
    id: '4',
    title: 'Mobile App Development - React Native',
    description: 'Building a fitness tracking app and need a developer with React Native experience. This is a paid project with potential for long-term collaboration.',
    category: 'Project',
    deadline: '2025-11-30',
    type: 'Gig',
    postedBy: {
      id: '104',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    },
    status: 'Open',
    createdAt: '2025-10-08'
  },
  {
    id: '5',
    title: 'Content Writer for Tech Blog',
    description: 'Looking for writers passionate about technology. Write 2-3 articles per week on trending tech topics. Flexible schedule, work from anywhere.',
    category: 'Freelance',
    deadline: '2025-11-20',
    type: 'Gig',
    postedBy: {
      id: '105',
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    },
    status: 'Open',
    createdAt: '2025-10-11'
  },
  {
    id: '6',
    title: 'Python Programming Tutor',
    description: 'Beginner seeking help with Python programming. Topics include data structures, algorithms, and basic web scraping.',
    category: 'Tutoring',
    deadline: '2025-11-05',
    type: 'Tutoring',
    postedBy: {
      id: '106',
      name: 'Jessica Lee',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop'
    },
    status: 'Open',
    createdAt: '2025-10-13'
  }
];
