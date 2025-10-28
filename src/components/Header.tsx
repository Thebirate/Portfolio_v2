import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 component">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {/* Replace with your logo image */}
          <img src="/vite.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-white text-lg font-bold">Yo Name</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Hello, I am Hassan</h1>
          <p className="text-lg">
            An upcoming Solutions Architect and Cloud Engineer dedicated to designing 
            innovative, scalable systems. With a strong foundation in both backend 
            infrastructure and frontend development, I bring a comprehensive approach 
            to solving complex technical challenges and delivering end-to-end solutions.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
