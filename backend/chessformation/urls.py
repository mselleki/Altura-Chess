"""
URL configuration for chessformation project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/contact/', include('contact.urls')),
]

