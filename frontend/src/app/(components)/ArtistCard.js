const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card">
      {artist.image && <img src={artist.image} alt={artist.name} className="artist-image" />}
      <h3 className="artist-name">{artist.name}</h3>
      <div className="genres">
        {artist.genres.map((genre, index) => (
          <span key={index} className="genre-tag">{genre}</span>
        ))}
      </div>

      <style jsx>{`
        .artist-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          margin: 12px 0;
          background-color: #f9f9f9;
        }
        .artist-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
        }
        .artist-name {
          margin: 12px 0;
          font-size: 1.2rem;
        }
        .genres {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .genre-tag {
          background: #1DB954;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default ArtistCard; 