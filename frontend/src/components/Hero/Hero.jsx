/**
 * Hero section component displaying primary introduction, technical CTAs,
 * and a precision HUD portrait frame.
 */
import React, { useState } from 'react';
import styles from './Hero.module.css';
import personal from '../../data/personal';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const telemetrySpecs = [
    { label: 'CORE', val: 'PYTHON_3.12' },
    { label: 'ML_ENGINE', val: 'SCIKIT-LEARN' },
    { label: 'DATA', val: 'PANDAS / NUMPY' },
    { label: 'DATABASE', val: 'MYSQL / SQL' },
    { label: 'TELEMETRY', val: 'ACTIVE // READY' },
  ];

  return (
    <section id="home" className={styles.hero}>
      {/* Subtle blueprint grid & crosshairs in background */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.blueprintGrid}></div>
        <div className={styles.crosshairTL}>+</div>
        <div className={styles.crosshairBR}>+</div>
      </div>

      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Command Intro & CTAs */}
          <div className={styles.content}>
            <div className={styles.systemBadge}>
              <span className={styles.systemPulse}></span>
              <span className={styles.systemCode}>00 / COMMAND SYSTEM // AI_ML_CORE</span>
            </div>

            <h1 className={styles.heading}>
              I BUILD WITH <span className={styles.highlight}>DATA.</span><br />
              I THINK IN <span className={styles.highlight}>MODELS.</span>
            </h1>

            <p className={styles.subheading}>
              I'm Prawar Karande, an AI/ML Engineer focused on Machine Learning, Python, Data Analysis, and SQL.
            </p>

            <div className={styles.ctaRow}>
              <a href="#projects" className={styles.primaryBtn}>
                <span>VIEW MY WORK</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a href="#contact" className={styles.secondaryBtn}>
                <span>LET'S CONNECT</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </a>
            </div>

            <div className={styles.socialRow}>
              <span className={styles.socialLabel}>DIRECT CHANNELS //</span>
              <a href={personal?.github || 'https://github.com'} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>GitHub</span>
              </a>
              <a href={personal?.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Tech Precision Portrait Frame */}
          <div className={styles.portraitArea}>
            <div className={styles.frameWrapper}>
              {/* HUD Corner Ticks */}
              <span className={`${styles.cornerTick} ${styles.cornerTL}`} aria-hidden="true"></span>
              <span className={`${styles.cornerTick} ${styles.cornerTR}`} aria-hidden="true"></span>
              <span className={`${styles.cornerTick} ${styles.cornerBL}`} aria-hidden="true"></span>
              <span className={`${styles.cornerTick} ${styles.cornerBR}`} aria-hidden="true"></span>

              <div className={styles.frameHeader}>
                <span className={styles.hudId}>IDENTITY // ID: PK-AIML</span>
                <span className={styles.hudCoord}>LAT: 22.7196° N, 75.8577° E</span>
              </div>

              <div className={styles.portraitContainer}>
                {!imageError ? (
                  <img
                    src={personal.photoPath || '/mypic.png'}
                    alt="Prawar Karande"
                    className={`${styles.portraitImg} ${imageLoaded ? styles.loaded : ''}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                ) : null}

                {(!imageLoaded || imageError) && (
                  <div className={styles.portraitFallback}>
                    <div className={styles.fallbackGrid}></div>
                    <div className={styles.fallbackReticle}>
                      <svg viewBox="0 0 100 100" className={styles.reticleSvg} aria-hidden="true">
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" fill="none" />
                        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.75" fill="none" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                      </svg>
                      <div className={styles.monogram}>PK</div>
                    </div>
                    <div className={styles.fallbackSpec}>
                      <span className={styles.fallbackTag}>AI/ML ENGINEER</span>
                      <span className={styles.fallbackSub}>SYSTEM ARCHITECTURE</span>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.frameFooter}>
                <div className={styles.footingSpec}>
                  <span className={styles.specKey}>PROFILE</span>
                  <span className={styles.specVal}>AI/ML ENGINEER</span>
                </div>
                <div className={styles.footingSpec}>
                  <span className={styles.specKey}>CALIBRATION</span>
                  <span className={styles.specVal}>OPTIMIZED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Telemetry Bar */}
        <div className={styles.telemetryBar}>
          <div className={styles.telemetryLabel}>
            <span className={styles.telemetryDot}></span>
            <span>SYSTEM TELEMETRY:</span>
          </div>
          <div className={styles.telemetryItems}>
            {telemetrySpecs.map((item, idx) => (
              <div key={idx} className={styles.telemetryItem}>
                <span className={styles.itemKey}>{item.label}:</span>
                <span className={styles.itemVal}>{item.val}</span>
                {idx < telemetrySpecs.length - 1 && <span className={styles.itemSep}>//</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
