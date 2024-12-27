const SongCard = ({ song }) => {
    return (
      <div className="song-card">
        <h3 className="song-title">{song.name}</h3>
        <p className="song-artist"><strong>Artist:</strong> {song.artist}</p>
        <p className="song-album"><strong>Album:</strong> {song.album}</p>
        <style jsx>{`
          .song-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            margin: 12px 0;
            background-color: #f9f9f9;
            transition: box-shadow 0.2s;
          }
          .song-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .song-title {
            margin: 0;
            font-size: 1.2rem;
            color: #333;
          }
          .song-artist, .song-album {
            margin: 4px 0;
            font-size: 1rem;
            color: #555;
          }
        `}</style>
      </div>
    );
  };
  
  export default SongCard;