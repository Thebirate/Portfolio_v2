import React from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import SpotifyPlayer from './components/SpotifyPlayer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 site-bg">
        <Header />
        <main className="flex-grow">
          <Projects />
          <SpotifyPlayer />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
