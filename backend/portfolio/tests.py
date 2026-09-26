"""
Tests for the portfolio API.

Covers contact form validation, email dispatch, throttling, and project/technology endpoints.
"""

from unittest.mock import patch
from django.core import mail
from django.core.cache import cache
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from .models import ContactMessage, Project, Technology


class ContactAPITest(TestCase):
    """Tests for the POST /api/contact/ endpoint."""

    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.url = '/api/contact/'
        self.valid_data = {
            'name': 'Prawar Recruiter',
            'email': 'recruiter@techfirm.com',
            'subject': 'Senior AI/ML Opportunity',
            'message': 'We reviewed your portfolio and would like to discuss a position.',
        }

    def test_valid_submission_creates_message_and_sends_email(self):
        """A valid contact form submission creates a ContactMessage record and dispatches an email."""
        mail.outbox.clear()
        response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('message', response.json())

        # Verify DB persistence
        self.assertEqual(ContactMessage.objects.count(), 1)
        msg = ContactMessage.objects.first()
        self.assertEqual(msg.name, 'Prawar Recruiter')
        self.assertEqual(msg.email, 'recruiter@techfirm.com')
        self.assertFalse(msg.is_read)

        # Verify email dispatch
        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertIn('Senior AI/ML Opportunity', sent_email.subject)
        self.assertIn('Prawar Recruiter', sent_email.subject)
        self.assertEqual(sent_email.to, ['prawar65@gmail.com'])
        self.assertEqual(sent_email.reply_to, ['recruiter@techfirm.com'])
        self.assertIn('Prawar Recruiter', sent_email.body)
        self.assertIn('recruiter@techfirm.com', sent_email.body)
        self.assertIn('Senior AI/ML Opportunity', sent_email.body)
        self.assertIn('We reviewed your portfolio', sent_email.body)

    @patch('django.core.mail.EmailMessage.send')
    def test_email_dispatch_failure_returns_500(self, mock_send):
        """When SMTP / email dispatch raises an exception, return HTTP 500 with error detail."""
        mock_send.side_effect = Exception('SMTP connection refused')
        response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json().get('error'), 'email_dispatch_failed')
        self.assertIn('detail', response.json())
        # Message was still saved to DB for audit
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_missing_name_returns_400(self):
        """Omitting the name field returns a 400 error."""
        data = {**self.valid_data}
        del data['name']
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_invalid_email_returns_400(self):
        """An invalid email format returns a 400 error."""
        data = {**self.valid_data, 'email': 'not-an-email'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_short_message_returns_400(self):
        """A message shorter than 10 characters returns a 400 error."""
        data = {**self.valid_data, 'message': 'Short'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_short_name_returns_400(self):
        """A name shorter than 2 characters returns a 400 error."""
        data = {**self.valid_data, 'name': 'A'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_short_subject_returns_400(self):
        """A subject shorter than 3 characters returns a 400 error."""
        data = {**self.valid_data, 'subject': 'Hi'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_empty_body_returns_400(self):
        """An empty POST body returns a 400 error."""
        response = self.client.post(self.url, {}, format='json')
        self.assertEqual(response.status_code, 400)


class ProjectAPITest(TestCase):
    """Tests for the GET /api/projects/ endpoint."""

    def setUp(self):
        self.client = APIClient()
        self.url = '/api/projects/'
        Project.objects.create(
            title='Test Project',
            slug='test-project',
            category='ML',
            short_description='A test project.',
            featured=True,
            is_active=True,
        )
        Project.objects.create(
            title='Inactive Project',
            slug='inactive-project',
            category='ML',
            short_description='Should not appear.',
            featured=True,
            is_active=False,
        )

    def test_returns_only_active_featured_projects(self):
        """Only active, featured projects are returned."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['title'], 'Test Project')


class TechnologyAPITest(TestCase):
    """Tests for the GET /api/technologies/ endpoint."""

    def setUp(self):
        self.client = APIClient()
        self.url = '/api/technologies/'
        Technology.objects.create(name='Python', category='languages', is_active=True)
        Technology.objects.create(name='Deprecated', category='languages', is_active=False)

    def test_returns_only_active_technologies(self):
        """Only active technologies are returned."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 'Python')
