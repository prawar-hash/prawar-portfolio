/**
 * Renders the About section in a clean two-panel technical profile dossier layout.
 * Left: Primary About Panel (Statement + Core Focus).
 * Right: Information Panel (Focus / Approach / Mindset specifications).
 * Bottom: Full-width Currently Refining telemetry bar.
 */
import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.js';
import styles from './About.module.css';

const About = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const coreFocusAreas = [
    {
      id: 'ml',
      name: 'Machine Learning',
      code: 'ML.01',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      ),
    },
    {
      id: 'python',
      name: 'Python',
      code: 'PY.02',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
    },
    {
      id: 'data-analytics',
      name: 'Data Analysis',
      code: 'DA.03',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 'sql',
      name: 'SQL / MySQL',
      code: 'DB.04',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
  ];

  const supportingInfo = [
    {
      label: 'FOCUS',
      value: 'Building data-driven solutions.',
      tag: '01',
    },
    {
      label: 'APPROACH',
      value: 'Analyze. Model. Validate.',
      tag: '02',
    },
    {
      label: 'MINDSET',
      value: 'Engineer solutions that create impact.',
      tag: '03',
    },
  ];

  const currentlyRefining = [
    'Predictive Systems',
    'Recommendation Models',
    'Data-Driven Solutions',
  ];

  return (
    <section id="about" className={styles.aboutSection} ref={ref}>
      {/* Subtle blueprint grid & mechanical measurement markings */}
      <div className={styles.technicalBackdrop} aria-hidden="true">
        <div className={styles.gridOverlay}></div>
        <div className={styles.crosshairTopLeft}>+</div>
        <div className={styles.crosshairBottomRight}>+</div>
      </div>

      <div className="container">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          
          {/* Section Header */}
          <div className="section-header-block">
            <div className="section-tagline">
              <span className="section-number">01 //</span>
              <span className="section-label">ABOUT // PROFILE SPECIFICATION</span>
              <div className="section-divider-line"></div>
            </div>
          </div>

          <div className={styles.dossierLayout}>
            {/* ── TWO-COLUMN PROFILE COMPOSITION ── */}
            <div className={styles.twoColumnGrid}>
              
              {/* LEFT: PRIMARY ABOUT PANEL (Larger Section) */}
              <div className={styles.primaryPanel}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelStatus}>
                    <span className={styles.statusDot}></span>
                    <span className={styles.panelCode}>PROFILE SPECIFICATION // STATEMENT</span>
                  </div>
                  <span className={styles.panelMeta}>DOSSIER // 01</span>
                </div>

                <div className={styles.narrativeContent}>
                  <p className={styles.secondaryBio}>
                    I enjoy turning raw data into predictions, recommendations, and practical systems. From feature engineering and model development to database architecture, I build technology that solves real-world problems.
                  </p>
                </div>

                {/* Subtle Divider */}
                <div className={styles.panelDivider}></div>

                {/* Core Focus Matrix */}
                <div className={styles.coreFocusSection}>
                  <div className={styles.focusHeaderRow}>
                    <span className={styles.focusHeading}>CORE FOCUS</span>
                    <span className={styles.specBadge}>TECH.SPEC</span>
                  </div>

                  <div className={styles.focusGrid}>
                    {coreFocusAreas.map((area) => (
                      <div key={area.id} className={styles.focusItem}>
                        <div className={styles.focusItemLeft}>
                          <span className={styles.focusIcon}>{area.icon}</span>
                          <span className={styles.focusName}>{area.name}</span>
                        </div>
                        <div className={styles.focusItemRight}>
                          <span className={styles.focusLine} aria-hidden="true"></span>
                          <span className={styles.focusCode}>{area.code}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: INFORMATION PANEL (Secondary Dossier Modules) */}
              <div className={styles.infoPanel}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelStatus}>
                    <span className={styles.statusDot}></span>
                    <span className={styles.panelCode}>TECHNICAL PRINCIPLES</span>
                  </div>
                  <span className={styles.panelMeta}>SPEC // 02</span>
                </div>

                <div className={styles.infoRows}>
                  {supportingInfo.map((info, idx) => (
                    <div key={idx} className={styles.infoRowModule}>
                      <div className={styles.rowHeader}>
                        <span className={styles.rowLabel}>{info.label}</span>
                        <span className={styles.rowTag}>//{info.tag}</span>
                      </div>
                      <p className={styles.rowValue}>{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── FULL-WIDTH CURRENTLY REFINING PANEL ── */}
            <div className={styles.refiningPanel}>
              <div className={styles.refiningHeader}>
                <span className={styles.statusPulse}></span>
                <span className={styles.refiningTitle}>CURRENTLY REFINING</span>
              </div>
              <div className={styles.refiningTags}>
                {currentlyRefining.map((item, idx) => (
                  <div key={idx} className={styles.refiningChip}>
                    <span className={styles.refiningDot}></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
