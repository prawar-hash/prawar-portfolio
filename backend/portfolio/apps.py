""" Portfolio app configuration. """

from django.apps import AppConfig


class PortfolioConfig(AppConfig):
    """Django app config for the portfolio module."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'portfolio'
    verbose_name = 'Portfolio'
