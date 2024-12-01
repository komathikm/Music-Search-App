import React from 'react';

const Playlist = ({ songs, currentIndex, setCurrentIndex }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Your Playlist</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {songs.map((song, index) => (
          <li
            key={index}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: index === currentIndex ? '#fa90d1' : 'transparent',
              color: index === currentIndex ? 'white' : 'black',
              borderBottom: '1px solid #ddd',
            }}
            onClick={() => setCurrentIndex(index)}
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
