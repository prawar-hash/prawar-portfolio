"""
DRF serializers for the portfolio API.

Handles input validation for the contact form and serialization
for project/technology data.
"""

import re

from rest_framework import serializers

from .models import ContactMessage, Project, Technology


class ContactMessageSerializer(serializers.ModelSerializer):
    """Validates and creates contact form submissions."""

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']

    def validate_name(self, value):
        """Ensure name has at least 2 characters."""
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError('Name must be at least 2 characters.')
        if len(value) > 100:
            raise serializers.ValidationError('Name must be 100 characters or fewer.')
        return value

    def validate_email(self, value):
        """Ensure email is well-formed."""
        value = value.strip().lower()
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, value):
            raise serializers.ValidationError('Please enter a valid email address.')
        return value

    def validate_subject(self, value):
        """Ensure subject has at least 3 characters."""
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError('Subject must be at least 3 characters.')
        if len(value) > 200:
            raise serializers.ValidationError('Subject must be 200 characters or fewer.')
        return value

    def validate_message(self, value):
        """Ensure message meets length requirements."""
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError('Message must be at least 10 characters.')
        if len(value) > 5000:
            raise serializers.ValidationError('Message must be 5000 characters or fewer.')
        return value


class TechnologySerializer(serializers.ModelSerializer):
    """Serializes technology data for the API."""

    class Meta:
        model = Technology
        fields = ['id', 'name', 'category', 'icon', 'description', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializes project data for the API."""

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'subtitle', 'category', 'short_description',
            'full_description', 'overview', 'problem', 'approach', 'solution',
            'engineering', 'features', 'technologies', 'github_url', 'live_url',
            'featured', 'order',
        ]
