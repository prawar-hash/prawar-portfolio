"""
API views for the portfolio backend.

Provides endpoints for contact form submission with automatic email dispatch
and read-only project/technology listing.
"""

import resend
import logging
from django.conf import settings
from django.core.mail import EmailMessage
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import ContactMessage, Project, Technology
from .serializers import (
    ContactMessageSerializer,
    ProjectSerializer,
    TechnologySerializer,
)

logger = logging.getLogger(__name__)


class ContactThrottle(AnonRateThrottle):
    """Rate limiter for contact form with scope configuration."""
    scope = 'contact'


class ContactCreateView(generics.CreateAPIView):
    """
    Accepts contact form submissions, records them in the database,
    and dispatches an email notification to the portfolio owner.
    """

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [ContactThrottle]

    def create(self, request, *args, **kwargs):
        """Validate, persist contact message, and dispatch notification email."""

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_msg = serializer.save()

        timestamp = contact_msg.created_at.astimezone(
            timezone.get_current_timezone()
        ).strftime('%Y-%m-%d %H:%M:%S %Z')

        email_body = (
            "NEW CONTACT TRANSMISSION RECEIVED\n"
            "============================================================\n"
            f"Portfolio:   Prawar Karande\n"
            f"Timestamp:   {timestamp}\n\n"
            "SENDER DETAILS\n"
            "------------------------------------------------------------\n"
            f"Name:        {contact_msg.name}\n"
            f"Email:       {contact_msg.email}\n"
            f"Subject:     {contact_msg.subject}\n\n"
            "MESSAGE CONTENT\n"
            "------------------------------------------------------------\n"
            f"{contact_msg.message}\n"
            "------------------------------------------------------------\n\n"
            f"Reply directly to this email to respond to "
            f"{contact_msg.name} ({contact_msg.email}).\n"
        )

        recipient = getattr(
            settings,
            'PORTFOLIO_OWNER_EMAIL',
            'prawar65@gmail.com'
        )

        try:
            resend.api_key = settings.RESEND_API_KEY

            resend.Emails.send({
                "from": settings.DEFAULT_FROM_EMAIL,
                "to": [recipient],
                "subject": (
                    f"[Portfolio Transmission] "
                    f"{contact_msg.subject} — from {contact_msg.name}"
                ),
                "text": email_body,
                "reply_to": contact_msg.email,
            })

        except Exception as exc:
            logger.error(
                "Failed to dispatch contact notification email for record #%s: %s",
                contact_msg.pk,
                str(exc),
                exc_info=True,
            )

            return Response(
                {
                    "detail": (
                        "Message recorded in database, "
                        "but notification dispatch failed."
                    ),
                    "error": "email_dispatch_failed",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {
                "message": (
                    "Transmission received. "
                    "I will review and respond shortly."
                )
            },
            status=status.HTTP_201_CREATED,
        )


class ProjectListView(generics.ListAPIView):
    """Returns active, featured projects ordered by display order."""

    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(is_active=True, featured=True)


class TechnologyListView(generics.ListAPIView):
    """Returns active technologies grouped by category."""

    serializer_class = TechnologySerializer
    queryset = Technology.objects.filter(is_active=True)
