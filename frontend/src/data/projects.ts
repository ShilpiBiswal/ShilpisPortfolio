import mindpopImg from "../assets/mindpop.png";
import atsImg from "../assets/ats.png";
import libImg from "../assets/literary.png";

export type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Company Expense Management System",
    description:
      "A web application built to streamline how organizations manage employee expenses and project-related spending. The system centralizes expense tracking, receipt management, and financial records, improving transparency and operational efficiency.",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818",
    tech: ["Java", "MySQL", "HTML", "CSS", "JDBC"],
  },
  {
    title: "Literary Retail Platform",
    description:
      "A MERN-based platform that enables users to buy and sell books through an intuitive marketplace. The application includes an AI-powered chatbot to assist users with book discovery, recommendations, and seamless navigation.",
    image: libImg,
    tech: ["MongoDB", "Express", "React", "Node.js", "GenAI"],
  },
  {
    title: "ATS Resume Analyzer & Job Search Tool",
    description:
      "An AI-powered platform that analyzes resumes against job descriptions to generate ATS compatibility scores and skill-match insights. It also supports job search, salary estimation, and personalized suggestions to improve candidate profiles.",
    image: atsImg,
    tech: ["Python", "Streamlit", "Google Gemini API", "JSearch API"],
  },
  {
    title: "MindPop – Gamified Learning Platform",
    description:
      "A gamified learning platform designed to support neurodivergent children, particularly those with ADHD. The application delivers engaging cognitive games while tracking progress through a database-backed system for meaningful insights.",
    image: mindpopImg,
    tech: ["MongoDB", "Express", "React","Node.js"],
  },
];
