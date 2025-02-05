from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.spotify_login, name='spotify_login'),
    path('callback/', views.spotify_callback, name='spotify_callback'),
    path('logout/', views.spotify_logout, name='spotify_logout'),
    path('get_songs/', views.get_songs, name='get_songs'),
]