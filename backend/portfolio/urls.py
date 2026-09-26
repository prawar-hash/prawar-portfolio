""" Portfolio API URL routing. """

from django.urls import path

from .views import ContactCreateView, ProjectListView, TechnologyListView

urlpatterns = [
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('technologies/', TechnologyListView.as_view(), name='technology-list'),
]
