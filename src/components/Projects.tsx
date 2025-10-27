import React, { useState, useEffect } from 'react';
import Y2KProjectCard from './y2kcard';

interface Project {
  id: number;
  name: string;
  image: string;
  description: string;
  githubLink: string;
  liveLink: string | null;
}

const projectData: Project[] = [
  {
    id: 1,
    name: 'CRD Server',
    image: '/images/crdsrvl.png',
    description: 'Serverless CRUD API for user data management using AWS Lambda, API Gateway, and DynamoDB.',
    githubLink: 'https://github.com/hassan-a-abdirahman/crd-serverless',
    liveLink: null,
  },
  {
    id: 2,
    name: 'Event Driven System',
    image: '/images/eventdriven.png',
    description: 'Image processing pipeline triggered by S3 events, using Lambda to add watermarks.',
    githubLink: 'https://github.com/hassan-a-abdirahman/event-driven-sys',
    liveLink: null,
  },
  {
    id: 3,
    name: 'Cloud Analytics',
    image: 'https://via.placeholder.com/150',
    description: 'Analytics platform to process and visualize cloud infrastructure spending.',
    githubLink: '#',
    liveLink: 'https://project3.com',
  },
  {
    id: 4,
    name: 'Portfolio Website',
    image: 'https://via.placeholder.com/150',
    description: 'Personal portfolio built with React, TypeScript, and Tailwind CSS for a modern, responsive design.',
    githubLink: 'https://github.com/hassan-a-abdirahman/hassan-a-abdirahman.github.io',
    liveLink: 'https://hassan-a-abdirahman.github.io/',
  },
  {
    id: 5,
    name: 'API Gateway',
    image: 'https://via.placeholder.com/150',
    description: 'A secure and scalable API Gateway setup for a microservices architecture.',
    githubLink: '#',
    liveLink: null,
  },
  {
    id: 6,
    name: 'Luxury Hotel Website',
    image: 'https://via.placeholder.com/150',
    description: 'A sleek frontend for a luxury hotel client, focusing on UI/UX and brand identity.',
    githubLink: '#',
    liveLink: 'https://hamzaawi.vercel.app/',
  },
  {
    id: 7,
    name: 'Exam Platform',
    image: 'https://via.placeholder.com/150',
    description: 'A MERN stack application to help users practice for certification exams.',
    githubLink: '#',
    liveLink: 'https://passerexam.com',
  },
  {
    id: 8,
    name: 'Data Pipeline',
    image: 'https://via.placeholder.com/150',
    description: 'ETL pipeline for processing large datasets using AWS Glue and Redshift.',
    githubLink: '#',
    liveLink: null,
  },
];

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    if (visibleProjects >= projectData.length) {
      setShowMoreButton(false);
    } else {
      setShowMoreButton(true);
    }
  }, [visibleProjects]);

  const handleShowMore = () => {
    setVisibleProjects((prev) => prev + 4);
  };

  return (
    <section id="projects-section" className="w-full p-4 my-8 component">
      <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
      <div className="projects-grid">
        {projectData.slice(0, visibleProjects).map((project) => (
          <Y2KProjectCard
            key={project.id}
            image={project.image}
            name={project.name}
            description={project.description}
            githubUrl={project.githubLink}
            liveUrl={project.liveLink || '#'}
          />
        ))}
      </div>
      {showMoreButton && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
