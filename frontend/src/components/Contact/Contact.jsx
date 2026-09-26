/**
 * Renders the Contact section styled as a technical communication interface.
 */
import React, { useState } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.js';
import styles from './Contact.module.css';
import { submitContactForm } from '../../services/api';
import personal from '../../data/personal';

const Contact = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await submitContactForm(formData);
      setSubmitStatus('success');
      setSubmitMessage(response?.message || 'Transmission received. I will review and respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 6000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'Transmission failed. Please try again or reach out directly via email/LinkedIn.');
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contactSection}`} ref={ref}>
      <div className="container">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          
          <div className="section-header-block">
            <div className="section-tagline">
              <span className="section-number">06 //</span>
              <span className="section-label">CONTACT // DIRECT TRANSMISSION</span>
              <div className="section-divider-line"></div>
            </div>
            <h2 className="section-title">Ready to Start the Next System?</h2>
            <p className="section-subtitle">
              Have a machine learning project, technical problem, or engineering opportunity worth discussing? Let's connect.
            </p>
          </div>

          <div className={styles.layout}>
            {/* Direct Communication Channels */}
            <div className={styles.infoColumn}>
              <div className={styles.channelHeader}>
                <span className={styles.channelDot}></span>
                <span className={styles.channelTitle}>COMMUNICATION CHANNELS</span>
              </div>

              <a href={`mailto:${personal.email || 'prawar65@gmail.com'}`} className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>DIRECT EMAIL</span>
                  <span className={styles.infoValue}>{personal.email || 'prawar65@gmail.com'}</span>
                </div>
              </a>

              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>PROFESSIONAL NETWORK</span>
                  <span className={styles.infoValue}>LinkedIn Profile</span>
                </div>
              </a>

              <a href={personal.github} target="_blank" rel="noopener noreferrer" className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>SOURCE REPOSITORIES</span>
                  <span className={styles.infoValue}>github.com/prawar-hash</span>
                </div>
              </a>
            </div>

            {/* Terminal Input Form */}
            <div className={styles.formColumn}>
              <div className={styles.formWrapper}>
                <div className={styles.terminalHeader}>
                  <span className={styles.terminalDot}></span>
                  <span className={styles.terminalTitle}>DISPATCH MESSAGE // ENCRYPTED</span>
                </div>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.fieldLabel}>NAME</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      required
                    />
                    {errors.name && <span id="name-error" className={styles.errorText}>{errors.name}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.fieldLabel}>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      required
                    />
                    {errors.email && <span id="email-error" className={styles.errorText}>{errors.email}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="subject" className={styles.fieldLabel}>SUBJECT</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Topic or project overview"
                      className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      required
                    />
                    {errors.subject && <span id="subject-error" className={styles.errorText}>{errors.subject}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message" className={styles.fieldLabel}>MESSAGE</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Provide details about your project, idea, or inquiry..."
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows={4}
                      required
                    />
                    {errors.message && <span id="message-error" className={styles.errorText}>{errors.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.submittingState}>
                        <span className={styles.spinner}></span>
                        TRANSMITTING DATA...
                      </span>
                    ) : (
                      <span>TRANSMIT MESSAGE</span>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <div className={styles.successMessage}>{submitMessage}</div>
                  )}
                  {submitStatus === 'error' && (
                    <div className={styles.errorMessage}>{submitMessage}</div>
                  )}
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
