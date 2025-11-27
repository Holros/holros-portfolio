interface Testimonial {
  id: string;
  firstName: string;
  lastName: string;
  testimonial: string;
  profilePicture: string;
  userId: string;
  created_at: string;
  updated_at: string;
}

interface Skill {
  id: string;
  fullName: string;
  shortName: string;
  userId: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  landingPageAbout: string;
  resumeLink: string;
  homePageAbout: string;
  created_at: string;
  updated_at: string;
  testimonials: Testimonial[];
  skills: Skill[];
}

interface Project {
  id: string;
  projectPicture: string;
  projectName: string;
  liveLink: string | null;
  githubLink: string | null;
  androidLink: string | null;
  iosLink: string | null;
  isMobileApp: boolean;
  userId: string;
  created_at: string;
  updated_at: string;
  skills: Skill[];
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
