'use client';

import { useState, useEffect } from "react";
import SongCard from "./(components)/SongCard";

export default function Home() {

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/spotify/callback", {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors',
          cache: 'no-cache',
        });

        if (response.ok) {
          const data = await response.json();
          setSongs(data); // Set fetched songs
        } else {
          setError("Failed to fetch songs. Please try again.");
        }
      } catch (err) {
        setError("Network error: Unable to fetch data.");
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/spotify/login"; // Redirect to Spotify login
  };

  return (
    <div className="container">
      <h1>Top 5 Spotify Songs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p>Error: {error}</p>
          <button onClick={handleLogin}>Authenticate with Spotify</button>
        </div>
      ) : songs.length > 0 ? (
        songs.map((song, index) => <SongCard key={index} song={song} />)
      ) : (
        <div>
          <p>No songs available. Please authenticate to see your top songs.</p>
          <button onClick={handleLogin}>Authenticate with Spotify</button>
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 24px;
          color: #222;
        }
        button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #1db954;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #1ed760;
        }
      `}</style>
    </div>
  );
}
