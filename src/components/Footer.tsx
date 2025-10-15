import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // You'll need to install react-icons

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full p-4 mt-8 component">
      <div className="container mx-auto footer-container">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-gray-400 text-sm">© Your Name {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
