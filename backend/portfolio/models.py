"""
Portfolio models — Project, Technology, and ContactMessage.

All models include timestamps, soft-delete support, and ordering fields
for flexible content management through Django admin.
"""

from django.db import models


class Technology(models.Model):
    """Represents a technology/tool in the portfolio tech stack."""

    CATEGORY_CHOICES = [
        ('languages', 'Languages'),
        ('ml_data', 'Machine Learning & Data'),
        ('tools', 'Tools'),
        ('database', 'Database'),
        ('backend', 'Backend'),
        ('web_dev', 'Web Development'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=50, blank=True, help_text='Icon identifier or emoji')
    description = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0, help_text='Display order within category')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Technologies'
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f'{self.name} ({self.get_category_display()})'


class Project(models.Model):
    """Represents a portfolio project with case study content."""

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    subtitle = models.CharField(max_length=250, blank=True)
    category = models.CharField(max_length=100)
    short_description = models.TextField(max_length=500)
    full_description = models.TextField(blank=True)
    overview = models.TextField(blank=True, help_text='Project overview summary')
    problem = models.TextField(blank=True, help_text='What problem does this project solve?')
    approach = models.TextField(blank=True, help_text='How was this project built?')
    solution = models.TextField(blank=True, help_text='What is the solution developed?')
    engineering = models.TextField(blank=True, help_text='Engineering and architecture details')
    features = models.JSONField(
        default=list,
        blank=True,
        help_text='List of key features (JSON array of strings)',
    )
    technologies = models.JSONField(
        default=list,
        blank=True,
        help_text='List of technology names (JSON array of strings)',
    )
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False, help_text='Show in featured projects section')
    order = models.PositiveIntegerField(default=0, help_text='Display order')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Stores contact form submissions from the portfolio website."""

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    subject = models.CharField(max_length=200)
    message = models.TextField(max_length=5000)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.subject} ({self.created_at:%Y-%m-%d})'
