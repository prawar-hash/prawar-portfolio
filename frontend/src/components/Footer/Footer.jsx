import React from 'react';
import styles from './Footer.module.css';
import personalData from '../../data/personal.js';

/**
 * Technical engineering command center footer with two-panel composition:
 * Left: Identity, role, and direct channels.
 * Right: Multi-column technical section navigation index.
 */
const Footer = () => {
  const navSections = [
    { code: '00', name: 'HOME', href: '#home' },
    { code: '01', name: 'ABOUT', href: '#about' },
    { code: '02', name: 'SKILLS', href: '#skills' },
    { code: '03', name: 'PROJECTS', href: '#projects' },
    { code: '04', name: 'EXPERTISE', href: '#expertise' },
    { code: '05', name: 'EDUCATION', href: '#education' },
    { code: '06', name: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    const targetId = href.replace('#', '');
    let targetElement = document.getElementById(targetId);
    if (!targetElement && targetId === 'skills') {
      targetElement = document.getElementById('stack');
    }

    if (targetElement) {
      e.preventDefault();
      const navbarHeight = 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetId === 'home' ? 0 : elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Row: Left (Identity & Channels) | Right (Navigation Index) */}
        <div className={styles.mainRow}>
          
          {/* Left / Primary Area: Identity + Role + Contact Channels */}
          <div className={styles.identityBlock}>
            <div className={styles.brandTitle}>
              PRAWAR KARANDE<span className={styles.dot}>.SYS</span>
            </div>
            <p className={styles.tagline}>
              AI/ML Engineer · Python Developer · Data Analytics
            </p>

            <div className={styles.links}>
              <a
                href={personalData?.github || 'https://github.com/prawar-hash'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span>GitHub</span>
              </a>
              <span className={styles.sep}>//</span>
              <a
                href={personalData?.linkedin || 'https://in.linkedin.com/in/prawar-karande-b1ab33249'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span>LinkedIn</span>
              </a>
              <span className={styles.sep}>//</span>
              <a
                href={`mailto:${personalData?.email || 'prawar65@gmail.com'}`}
                className={styles.link}
              >
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right / Secondary Area: Technical Section Navigation Grid */}
          <div className={styles.navIndexBlock}>
            <div className={styles.navIndexHeader}>
              <span className={styles.navIndexDot}></span>
              <span className={styles.navIndexLabel}>NAVIGATION // SYSTEM INDEX</span>
            </div>

            <nav className={styles.sectionNav} aria-label="Footer Navigation Index">
              <div className={styles.navGrid}>
                {navSections.map((item) => (
                  <a
                    key={item.code}
                    href={item.href}
                    className={styles.indexItem}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    <span className={styles.indexCode}>{item.code}</span>
                    <span className={styles.indexName}>{item.name}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>

        </div>

        {/* Bottom Row: System Telemetry & Coordinates */}
        <div className={styles.bottomRow}>
          <div className={styles.telemetryInfo}>
            <span className={styles.statusDot}></span>
            <span>SYSTEM CORE: ONLINE // 2026 PRAWAR KARANDE</span>
          </div>
          <div className={styles.specLocation}>
            <span>LOC: INDORE, INDIA // LAT: 22.7196° N, 75.8577° E</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
