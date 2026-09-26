/** API service — handles communication with the Django backend. */
const API_BASE = '/api';

/** Submits the contact form to the backend. */
export async function submitContactForm({ name, email, subject, message }) {
  const response = await fetch(`${API_BASE}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.detail ||
      errorData?.message ||
      'Something went wrong. Please try again.';
    throw new Error(errorMessage);
  }

  return response.json();
}
