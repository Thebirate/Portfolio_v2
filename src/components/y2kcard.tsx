import React from 'react';

// --- TYPE DEFINITIONS ---
// Defines the properties for our project card component
interface ProjectProps {
  image: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

// --- SVG ICONS ---
// A reusable GitHub icon component
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// A reusable Rocket icon component for the "Live" link
const RocketIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.1S6.05 15.78 4.5 16.5z"></path>
        <path d="M7.5 14.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.1S9.05 13.78 7.5 14.5z"></path>
        <path d="M10.5 12.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.1S12.05 11.78 10.5 12.5z"></path>
        <path d="M13.5 10.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.1S15.05 9.78 13.5 10.5z"></path>
        <path d="M15 4.5l5 5"></path><path d="M14 8.5l-5-5"></path>
    </svg>
);


// --- GEL BUTTON COMPONENT ---
// A reusable "gel" or "aqua" style button, popular in the Y2K era
const GelButton: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({ href, children, className = '' }) => {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-bold text-white shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl ${className}`}
        >
            {/* Glossy highlight effect */}
            <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent"></span>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </a>
    );
};

// --- THE MAIN CARD COMPONENT ---
const Y2KProjectCard: React.FC<ProjectProps> = ({ image, name, description, githubUrl, liveUrl }) => {
  return (
    // Outer container for the chrome border and neon glow - matching Spotify player size
    <div className="relative w-full max-w-[500px] mx-auto rounded-2xl bg-gradient-to-b from-gray-400 to-gray-700 p-1 shadow-[0_0_25px_rgba(255,0,255,0.5)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,0,255,0.8)]" style={{borderRadius: '16px'}}>
      
      {/* Inner container for the card content */}
      <div className="relative h-full w-full rounded-xl bg-[#1a1a1a] p-4 flex flex-col font-sans overflow-hidden" style={{borderRadius: '12px'}}>
        
        {/* Faint scanline overlay for the retro tech feel */}
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAFUlEQVQImWNggID/D34A/wMu+gADGnt1NAAAAABJRU5ErkJggg==')] bg-repeat opacity-20 pointer-events-none z-0"></div>
        
        <div className="relative z-10 flex flex-col flex-grow">
            {/* Project Image */}
            <div className="p-4 bg-gray-800/30 rounded-xl" style={{padding: '16px', backgroundColor: 'rgba(31, 41, 55, 0.3)', borderRadius: '12px'}}>
              <img 
                src={image} 
                alt={`${name} screenshot`} 
                className="h-48 w-full object-cover rounded-lg border-2 border-gray-500"
                style={{border: '2px solid #6B7280', borderRadius: '8px'}}
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/ff00ff?text=Project+Image'; }}
              />
            </div>
            
            {/* Text Content */}
            <div className="flex-grow pt-4 px-4">
              <h3 
                className="text-3xl text-fuchsia-400 font-vt323 mb-3" 
                style={{textShadow: '0 0 6px #FF00FF, 0 0 8px #FF00FF', padding: '8px 0'}}
              >
                {name}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed" style={{padding: '8px 0'}}>
                {description}
              </p>
            </div>

            {/* Footer with Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-center items-center gap-10">
                <GelButton href={githubUrl} className="bg-gradient-to-b from-gray-600 to-gray-800 hover:shadow-gray-500/50">
                    <GitHubIcon/> GitHub
                </GelButton>
                <GelButton href={liveUrl} className="bg-gradient-to-b from-fuchsia-500 to-purple-700 hover:shadow-fuchsia-400/50">
                    <RocketIcon/> Live
                </GelButton>
            </div>
        </div>
      </div>
    </div>
  );
};


// Export the main Y2KProjectCard component
export default Y2KProjectCard;
