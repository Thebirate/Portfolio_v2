import React, { useState, useEffect } from 'react';

interface Project {
  id: number;
  image: string;
  description: string;
  githubLink: string;
  liveLink: string | null;
}

const projectData: Project[] = [
  {
    id: 1,
    image: '/images/crdsrvl.png',
    description: 'A brief description of Project 1.',
    githubLink: 'https://github.com/yourusername/project1',
    liveLink: 'https://project1.com',
  },
  {
    id: 2,
    image: '/images/eventdriven.png',
    description: 'A brief description of Project 2.',
    githubLink: 'https://github.com/yourusername/project2',
    liveLink: null,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150',
    description: 'A brief description of Project 3.',
    githubLink: 'https://github.com/yourusername/project3',
    liveLink: 'https://project3.com',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/150',
    description: 'A brief description of Project 4.',
    githubLink: 'https://github.com/yourusername/project4',
    liveLink: 'https://project4.com',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/150',
    description: 'A brief description of Project 5.',
    githubLink: 'https://github.com/yourusername/project5',
    liveLink: null,
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/150',
    description: 'A brief description of Project 6.',
    githubLink: 'https://github.com/yourusername/project6',
    liveLink: 'https://project6.com',
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/150',
    description: 'A brief description of Project 7.',
    githubLink: 'https://github.com/yourusername/project7',
    liveLink: 'https://project7.com',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/150',
    description: 'A brief description of Project 8.',
    githubLink: 'https://github.com/yourusername/project8',
    liveLink: null,
  },
];

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(5);
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    if (visibleProjects >= projectData.length) {
      setShowMoreButton(false);
    } else {
      setShowMoreButton(true);
    }
  }, [visibleProjects]);

  const handleShowMore = () => {
    setVisibleProjects((prev) => prev + 3);
  };

  // This is a simplified scroll detection. In a real app, you'd use Intersection Observer or more robust scroll event handling.
  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects-section');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        // If the top of the section is out of view, collapse the list
        if (rect.top < 0 && visibleProjects > 5) {
          setVisibleProjects(5);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleProjects]);

  return (
    <section id="projects-section" className="container mx-auto p-4 my-8 component">
      <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
      <div className="projects-grid">
        {projectData.slice(0, visibleProjects).map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.description} />
            <p className="text-white">{project.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                GitHub Repo
              </a>
              {project.liveLink ? (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                  Live Link
                </a>
              ) : (
                <span className="text-gray-500 cursor-not-allowed">Live Link</span>
              )}
            </div>
          </div>
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
