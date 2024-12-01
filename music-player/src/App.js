import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const songsList = [
  {
    title: 'vennilavu saaral nee',
    artist: 'Sivakarthikeyan, Sai Pallavi',
    src: '/Vennilavu Saaral.mp3',
    albumArt: 'song1.jpeg',
  },
  {
    title: 'Hey Minnale',
    artist: 'Sivakarthikeyan, Sai Pallavi',
    src: '/Hey Minnale.mp3',
    albumArt: '/heyminnaleImg.jpeg',
  },
  {
    title: 'Matta',
    artist: 'Vijay, Thrisha',
    src: '/MATTA-The-GOAT.mp3',
    albumArt: '/mattaImg.jpeg',
  },
  {
    title: 'Srimathi Garu',
    artist: ' Dulquer Salmaan, Meenakshi Chaudhary',
    src: '/Srimathi Garu.mp3',
    albumArt: '/sreemathiImg.jpeg',
  },
  {
    title: 'Un-Perai-Sollum-Pothe',
    artist: 'Mahesh, Anjali ',
    src: '/Un-Perai-Sollum-Pothe.mp3',
    albumArt: '/unperaiImg.jpeg',
  },
  {
    title: 'Tamil Pasanga',
    artist: 'Vijay, Amalapal',
    src: '/Tamil Pasanga.mp3',
    albumArt: '/tamilpasangaImg.jpeg',
  },
  {
    title: 'Yem Maya Jaruguthundo',
    artist: 'Vijay, Amalapal',
    src: '/Yem Maya Jaruguthundo - SenSongsmp3.Co.mp3',
    albumArt: '/em-maya-Img.jpeg',
  },
  {
    title: 'Kadhal Kanava',
    artist: 'Rajinikanth, Deepika Padukone',
    src: '/Kadhal-Kanava.mp3',
    albumArt: '/kadhalKanavaImg.jpeg',
  },
  {
    title: 'en jeevan',
    artist: 'Vijay, Samantha',
    src: '/en jeevan.mp3',
    albumArt: '/en-jeevan-Img.jpeg',
  },
  {
    title: 'pirai Thedum',
    artist: 'Dhanush, Richa Gangopadhyay',
    src: '/Pirai Thedum.mp3',
    albumArt: '/piraithedumImg.jpeg',
  },
  // Add more songs as needed...
];

function App() {
  const [songs] = useState(songsList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page of the playlist
  const [songsPerPage] = useState(2); // Number of songs per page
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentIndex]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentIndex);
      setCurrentIndex(randomIndex); // Update currentIndex after shuffle
      updatePageForSong(randomIndex); // Update the page based on the new index
    } else {
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentIndex(nextIndex);  // Update currentIndex after next track
      updatePageForSong(nextIndex); // Update the page based on the new index
    }
  };
  
  const prevTrack = () => {
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);  // Update currentIndex after previous track
    updatePageForSong(prevIndex); // Update the page based on the new index
  };
  
  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const onSeek = (event) => {
    const seekTime = (event.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    audioRef.current.volume = event.target.value;
  };

  const onEnded = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextTrack();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted; // Mute or unmute audio
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Paginate songs
  // Paginate songs
  const getPaginatedSongs = () => {
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  return songs.slice(indexOfFirstSong, indexOfLastSong); // Get the songs for the current page
};

  const updatePageForSong = (index) => {
    const page = Math.ceil((index + 1) / songsPerPage); // Determine the page where the song is located
    setCurrentPage(page); // Update the currentPage state
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong); // Get the songs for the current page

  return (
    <div className="App">
      <header className="app-header">
        <h1>Music Player App</h1>
      </header>
      <div className="player">
        <div className="track-info">
          <img
            src={songs[currentIndex].albumArt}
            alt={songs[currentIndex].title}
            className="album-art"
          />
          <h3>
            <span className="song-title">{songs[currentIndex].title}</span>
          </h3>
          <h4>
            <span className="artist-label">Artists: </span>
            <span className="artist-name">{songs[currentIndex].artist}</span>
          </h4>
        </div>

        {isPlaying && (
          <div className="playing-gif">
            <img src="/control-1.gif" alt="Playing Animation" />
          </div>
        )}

        <audio
          ref={audioRef}
          src={songs[currentIndex].src}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        ></audio>

        <div className="controls">
          <button className="control-button" onClick={prevTrack}>⏮️</button>
          <button className="control-button" onClick={playPauseHandler}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="control-button" onClick={nextTrack}>⏭️</button>
          <button className="control-button" onClick={toggleShuffle}>
            {isShuffle ? '🔀 On' : '🔀 Off'}
          </button>
          <button className="control-button" onClick={toggleRepeat}>
            {isRepeat ? '🔁 On' : '🔁 Off'}
          </button>
          <button className="control-button" onClick={toggleMute}>
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>

        <div className="progress-container">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / (audioRef.current && audioRef.current.duration ? audioRef.current.duration : 1)) * 100}
            onChange={onSeek}
            className="progress-bar"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="volume-control">
          <label>Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>

        <div className="playlist">
          <h3>Playlist</h3>
          <ul>
            {currentSongs.map((song, index) => {
              const isActive = (index + (currentPage - 1) * songsPerPage) === currentIndex; // Check if the song is the currently playing song
              return (
                <li
                  key={index}
                  className={isActive ? 'active' : ''} // Apply 'active' class to the currently playing song
                  onClick={() => {
                    setCurrentIndex(index + (currentPage - 1) * songsPerPage); // Set global index when a song is clicked
                    updatePageForSong(index + (currentPage - 1) * songsPerPage); // Update the page to match clicked song's index
                  }}
                >
                  <span className="song-title">{song.title}</span> - <span className="artist-name">{song.artist}</span>
                </li>
              );
            })}
          </ul>

          {/* Pagination Controls */}
          <div className="pagination">
            {[...Array(Math.ceil(songs.length / songsPerPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}  // Handle page change on button click
                className={currentPage === index + 1 ? 'active' : ''}  // Highlight the active page button
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
