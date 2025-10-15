import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 component">
      <div className="container mx-auto header-container">
        <div className="flex items-center">
          {/* Replace with your logo image */}
          <img src="/vite.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-white text-lg font-bold">Your Name</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Hello, I'm Your Name</h1>
          <p className="text-lg">
            A brief "About Me" paragraph. This text should be clean and readable.
            I am a passionate developer with a focus on creating engaging and
            user-friendly web experiences.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
