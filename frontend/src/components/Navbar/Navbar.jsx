import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import personalData from '../../data/personal.js';

/**
 * Technical navigation bar with active section tracking, smooth scrolling, and mobile support.
 * Section Sequence: Home (00) · About (01) · Skills (02) · Projects (03) · Expertise (04) · Education (05) · Contact (07).
 */
const Navbar = ({ activeSection, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', code: '00' },
    { name: 'About', href: '#about', id: 'about', code: '01' },
    { name: 'Skills', href: '#skills', id: 'skills', altId: 'stack', code: '02' },
    { name: 'Projects', href: '#projects', id: 'projects', code: '03' },
    { name: 'Expertise', href: '#expertise', id: 'expertise', code: '04' },
    { name: 'Education', href: '#education', id: 'education', code: '05' },
    { name: 'Contact', href: '#contact', id: 'contact', code: '06' },
  ];

  const handleLinkClick = (e, link) => {
    const targetId = link.href.replace('#', '');
    let targetElement = document.getElementById(targetId);
    
    // Support fallback alias (e.g. #skills -> #stack if id is stack)
    if (!targetElement && link.altId) {
      targetElement = document.getElementById(link.altId);
    }

    if (targetElement) {
      e.preventDefault();
      if (onNavClick) {
        onNavClick(link.id);
      }
      setIsMobileMenuOpen(false);

      const navbarHeight = 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = link.id === 'home' ? 0 : elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', link.href);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const isLinkActive = (link) => {
    if (!activeSection) return false;
    const normalized = activeSection.toLowerCase();
    return (
      normalized === link.id ||
      normalized === link.name.toLowerCase() ||
      (link.altId && normalized === link.altId)
    );
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>
        <div className={styles.brandGroup}>
          <a
            href="#home"
            className={styles.logo}
            onClick={(e) => handleLinkClick(e, { href: '#home', id: 'home' })}
          >
            PRAWAR<span className={styles.dot}>.</span>
          </a>
          <div className={styles.telemetryBadge}>
            <span className={styles.telemetryDot}></span>
            <span className={styles.telemetryText}>SYSTEM // ONLINE</span>
          </div>
        </div>

        <nav className={styles.desktopNav}>
          <ul className={styles.navItems}>
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${styles.navLink} ${active ? styles.active : ''}`}
                    onClick={(e) => handleLinkClick(e, link)}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className={styles.navCode}>{link.code}</span>
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.rightSection}>
          <div className={styles.socialLinks}>
            <a href={personalData?.github || 'https://github.com'} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.iconLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href={personalData?.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.iconLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
          <a href={personalData?.resumePath || '/Prawar Resume.pdf'} target="_blank" rel="noopener noreferrer" className={styles.resumeButton}>
            Resume
          </a>
          <button
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <nav className={styles.mobileNav}>
            <div className={styles.mobileHeader}>
              <span className={styles.mobileStatusDot}></span>
              <span className={styles.mobileStatusText}>AI/ML COMMAND NAVIGATION</span>
            </div>
            <ul className={styles.mobileNavItems}>
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`${styles.mobileNavLink} ${active ? styles.active : ''}`}
                      onClick={(e) => handleLinkClick(e, link)}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className={styles.mobileNavCode}>{link.code} //</span>
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
