import os
from spotipy import Spotify, SpotifyOAuth

from django.shortcuts import redirect
from django.http import JsonResponse
from django.conf import settings

# Create your views here.
SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI = settings.SPOTIFY_REDIRECT_URI

SCOPE = 'user-top-read'

sp_oauth = SpotifyOAuth(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET,
    redirect_uri=SPOTIFY_REDIRECT_URI,
    scope=SCOPE
)

def spotify_login(request):
    # Redirect user to Spotify's authentication page
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

def spotify_callback(request):
    # Extract the authorization code from the callback
    code = request.GET.get('code')

    # Fetch the access token
    token_info = sp_oauth.get_access_token(code)
    access_token = token_info.get('access_token')

    # Initialize Spotify client with the token
    sp = Spotify(auth=access_token)

    # Get user's top 5 tracks
    top_tracks = sp.current_user_top_tracks(limit=5)
    top_songs = [
        {
            'name': track['name'],
            'artist': ', '.join(artist['name'] for artist in track['artists']),
            'album': track['album']['name'],
        }
        for track in top_tracks['items']
    ]

    return JsonResponse(top_songs, safe=False)