'use client';

import { useState, useEffect } from "react";
import SongCard from "./(components)/SongCard";
import ArtistCard from './(components)/ArtistCard';

export default function Home() {

  const [data, setData] = useState({
    top_songs: [],
    top_artists: [],
    playlists: [],
    recent_tracks: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/spotify/login"; // Redirect to Spotify login
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/spotify/logout", {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      setData({
        top_songs: [],
        top_artists: [],
        playlists: [],
        recent_tracks: []
      });
      setIsAuthenticated(false);
      
      window.location.href = 'https://accounts.spotify.com/logout';
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/spotify/get_songs", {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors',
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          setIsAuthenticated(true);
        } else {
          setError("Please log in to see your music data");
          setIsAuthenticated(false);
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Your Spotify Stats</h1>
      
      <div className="auth-buttons">
        {!isAuthenticated ? (
          <button onClick={handleLogin} className="login-btn">
            Login with Spotify
          </button>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="content-grid">
          <section>
            <h2>Top Songs</h2>
            <div className="songs-container">
              {data.top_songs.map((song, index) => (
                <SongCard key={index} song={song} />
              ))}
            </div>
          </section>

          <section>
            <h2>Top Artists</h2>
            <div className="artists-container">
              {data.top_artists.map((artist, index) => (
                <ArtistCard key={index} artist={artist} />
              ))}
            </div>
          </section>

          <section>
            <h2>Recent Tracks</h2>
            <div className="recent-tracks">
              {data.recent_tracks.map((track, index) => (
                <div key={index} className="recent-track">
                  <span>{track.name}</span>
                  <span>{track.artist}</span>
                  <span>{new Date(track.played_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .auth-buttons {
          margin: 20px 0;
        }

        button {
          padding: 10px 20px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .login-btn {
          background-color: #1DB954;
          color: white;
        }

        .logout-btn {
          background-color: #282828;
          color: white;
        }

        button:hover {
          opacity: 0.8;
          transform: scale(1.05);
        }

        .songs-container {
          margin-top: 20px;
        }

        .error {
          color: #e74c3c;
          margin: 20px 0;
        }

        .content-grid {
          display: grid;
          gap: 32px;
          margin-top: 32px;
        }

        section h2 {
          margin-bottom: 16px;
          color: #333;
        }

        .recent-tracks {
          display: grid;
          gap: 8px;
        }

        .recent-track {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 16px;
          padding: 8px;
          background: #f9f9f9;
          border-radius: 4px;
        }
      `}</style>
    </div>
      
  );
}
