const SongCard = ({ song }) => {
    return (
      <div className="song-card">
        {song.image && <img src={song.image} alt={song.name} className="song-image" />}
        <h3 className="song-title">{song.name}</h3>
        <p className="song-artist"><strong>Artist:</strong> {song.artist}</p>
        <p className="song-album"><strong>Album:</strong> {song.album}</p>
        
        <div className="audio-features">
          <h4>Audio Features</h4>
          <div className="features-grid">
            <div className="feature">
              <label>Energy</label>
              <div className="feature-bar">
                <div className="feature-fill" style={{ width: `${song.audio_features.energy * 100}%` }}></div>
              </div>
            </div>
            <div className="feature">
              <label>Danceability</label>
              <div className="feature-bar">
                <div className="feature-fill" style={{ width: `${song.audio_features.danceability * 100}%` }}></div>
              </div>
            </div>
            <div className="feature">
              <label>Acousticness</label>
              <div className="feature-bar">
                <div className="feature-fill" style={{ width: `${song.audio_features.acousticness * 100}%` }}></div>
              </div>
            </div>
            <div className="feature">
              <label>Valence</label>
              <div className="feature-bar">
                <div className="feature-fill" style={{ width: `${song.audio_features.valence * 100}%` }}></div>
              </div>
            </div>
            <div className="feature">
              <label>Tempo</label>
              <span>{Math.round(song.audio_features.tempo)} BPM</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .song-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            margin: 12px 0;
            background-color: #f9f9f9;
            transition: box-shadow 0.2s;
          }
          .song-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 12px;
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
          .audio-features {
            margin-top: 16px;
          }
          .features-grid {
            display: grid;
            gap: 8px;
          }
          .feature {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .feature label {
            width: 100px;
            font-size: 0.9rem;
          }
          .feature-bar {
            flex: 1;
            height: 8px;
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
          }
          .feature-fill {
            height: 100%;
            background: #1DB954;
            transition: width 0.3s ease;
          }
        `}</style>
      </div>
    );
};

export default SongCard;