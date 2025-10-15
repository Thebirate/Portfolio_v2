import React from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import SpotifyPlayer from './components/SpotifyPlayer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Projects />
        <SpotifyPlayer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
