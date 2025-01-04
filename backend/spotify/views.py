import os
from spotipy import Spotify, SpotifyOAuth

from django.shortcuts import redirect
from django.http import JsonResponse
from django.conf import settings
import json

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

def spotify_logout(request):
    # Clear Django session
    request.session.flush()
    
    # Clear Spotify OAuth cache
    cache_path = ".cache"
    if os.path.exists(cache_path):
        os.remove(cache_path)
    
    # Clear the SpotifyOAuth token info
    global sp_oauth
    sp_oauth = SpotifyOAuth(
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET,
        redirect_uri=SPOTIFY_REDIRECT_URI,
        scope=SCOPE
    )
    
    return JsonResponse({'message': 'Logged out successfully'})

def spotify_callback(request):
    # Extract the authorization code from the callback
    code = request.GET.get('code')
    
    try:
        # Fetch the access token
        token_info = sp_oauth.get_access_token(code)
        access_token = token_info.get('access_token')
        
        # Store the access token in session
        request.session['spotify_token'] = access_token

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
        
        # Store the songs data in session
        request.session['top_songs'] = json.dumps(top_songs)
        
        # Redirect to frontend
        return redirect('http://localhost:3000')
        
    except Exception as e:
        print(f"Error in callback: {str(e)}")
        return redirect('http://localhost:3000?error=authentication_failed')

def get_songs(request):
    access_token = request.session.get('spotify_token')
    if not access_token:
        return JsonResponse({'error': 'Not authenticated'}, status=401)
    
    try:
        sp = Spotify(auth=access_token)
        
        # Get user's top tracks with audio features
        top_tracks = sp.current_user_top_tracks(limit=5)
        track_ids = [track['id'] for track in top_tracks['items']]
        audio_features = sp.audio_features(track_ids)
        
        # Get top artists
        top_artists = sp.current_user_top_artists(limit=5)
        
        # Get followed playlists
        playlists = sp.current_user_playlists(limit=5)
        
        # Get recently played
        recent_tracks = sp.current_user_recently_played(limit=5)
        
        # Combine track info with audio features
        top_songs = []
        for track, features in zip(top_tracks['items'], audio_features):
            top_songs.append({
                'name': track['name'],
                'artist': ', '.join(artist['name'] for artist in track['artists']),
                'album': track['album']['name'],
                'image': track['album']['images'][0]['url'] if track['album']['images'] else None,
                'audio_features': {
                    'energy': features['energy'],
                    'tempo': features['tempo'],
                    'valence': features['valence'],
                    'danceability': features['danceability'],
                    'acousticness': features['acousticness']
                }
            })
        
        # Process artists data
        top_artists_data = [{
            'name': artist['name'],
            'genres': artist['genres'],
            'image': artist['images'][0]['url'] if artist['images'] else None,
        } for artist in top_artists['items']]
        
        # Process playlists data
        playlists_data = [{
            'name': playlist['name'],
            'tracks_count': playlist['tracks']['total'],
            'image': playlist['images'][0]['url'] if playlist['images'] else None,
        } for playlist in playlists['items']]
        
        # Process recent tracks
        recent_tracks_data = [{
            'name': item['track']['name'],
            'artist': ', '.join(artist['name'] for artist in item['track']['artists']),
            'played_at': item['played_at'],
        } for item in recent_tracks['items']]
        
        response_data = {
            'top_songs': top_songs,
            'top_artists': top_artists_data,
            'playlists': playlists_data,
            'recent_tracks': recent_tracks_data,
        }
        
        return JsonResponse(response_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)