import React from 'react';

const songList = [
  { title: 'Song Title 1', artist: 'Artist Name 1' },
  { title: 'Song Title 2', artist: 'Artist Name 2' },
  { title: 'Song Title 3', artist: 'Artist Name 3' },
  { title: 'Song Title 4', artist: 'Artist Name 4' },
];

const SpotifyPlayer: React.FC = () => {
  return (
    <section className="container mx-auto p-4 my-8 spotify-player">
      <h2 className="text-3xl font-bold mb-6 text-center">My Favorite Tunes</h2>
      <div>
        <ul>
          {songList.map((song, index) => (
            <li key={index} className="py-2 border-b border-gray-800 last:border-b-0">
              <p className="text-white font-semibold">{song.title}</p>
              <p className="text-gray-400 text-sm">{song.artist}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SpotifyPlayer;
