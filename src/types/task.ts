export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'Gig' | 'Internship' | 'Tutoring' | 'Project' | 'Freelance';
  deadline: string;
  type: 'Gig' | 'Internship' | 'Tutoring';
  postedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'Open' | 'Closed';
  createdAt: string;
}