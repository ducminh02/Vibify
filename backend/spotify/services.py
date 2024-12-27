import os
from dotenv import load_dotenv

from typing import Dict, List, Optional, Union
import spotipy
from spotipy.oauth2 import SpotifyOAuth


class SpotifyService:
    def __init__(self, access_token: Optional[str] = None):
        """Initialize Spotify service with optional access token"""
        if access_token:
            self.client = spotipy.Spotify(auth=access_token)
        else:
            self.client = spotipy.Spotify(
                auth_manager=SpotifyOAuth(
                    client_id=os.getenv('SPOTIFY_CLIENT_ID'),
                    client_secret=os.getenv('SPOTIFY_CLIENT_SECRET'),
                    redirect_uri=os.getenv('SPOTIFY_REDIRECT_URI'),
                    scope=os.getenv('SPOTIFY_SCOPE'),
                )
            )
        
    def get_user_profile(self) -> Dict:
        """Get current user's Spotify profile"""
        return self.client.current_user()
    
    def get_user_top_tracks(self, limit: int = 20, 
                           time_range: str = 'medium_term') -> Dict:
        """
        Get user's top tracks
        
        Args:
            limit: Number of tracks (max 50)
            time_range: Over what time frame (short_term, medium_term, long_term)
        """
        return self.client.current_user_top_tracks(
            limit=limit,
            time_range=time_range
        )