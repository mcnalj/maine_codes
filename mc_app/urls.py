"""Defines URL patterns for mc_app."""

from django.urls import path
from . import views

app_name = 'mc_app'
urlpatterns = [
    #Home page
    path('', views.index, name='index'),
    # JavaScript Punctuation Quiz page.
    path('jsPunctuation/', views.jsPunctuation, name='jsPunctuation'),
    # Simple derivatives drill using MathJax.
    path('skill_selection/', views.skill_selection, name='skill_selection'),
    # Simple derivatives drill using MathJax.
    path('derivatives/', views.derivatives, name='derivatives'),
    # Simple derivatives drill using MathJax.
    path('fractionalCoefficients/', views.fractionalCoefficients, name='fractionalCoefficients'),
    # Record data afte a DerivativesSkills skill has been mastered.
    path('masteredRoutine/', views.masteredRoutine, name='masteredRoutine'),
]
