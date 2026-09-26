/**
 * Technical Stack / Skills section presented as an engineering system specification interface.
 * Structures technologies into 4 categorical specification groups with technical icons.
 */
import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.js';
import technologies from '../../data/technologies.js';
import styles from './TechStack.module.css';

const CATEGORY_ICONS = {
  LANGUAGES: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'MACHINE LEARNING & DATA': (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  DATABASE: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  TOOLS: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

const TechStack = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          
          {/* Section Header */}
          <div className="section-header-block">
            <div className="section-tagline">
              <span className="section-number">02 //</span>
              <span className="section-label">SKILLS // SYSTEM SPECIFICATION MATRIX</span>
              <div className="section-divider-line"></div>
            </div>
            <h2 className="section-title">Technical Arsenal</h2>
            <p className="section-subtitle">
              Structured engineering components across programming languages, machine learning pipelines, relational databases, and diagnostic tooling.
            </p>
          </div>

          {/* 4 Technical Groups */}
          <div className={styles.specContainer}>
            {technologies.map((group) => (
              <div key={group.category} className={styles.groupSection}>
                
                {/* Group Header Bar */}
                <div className={styles.groupHeader}>
                  <div className={styles.groupTitleRow}>
                    <span className={styles.groupIconBox} aria-hidden="true">
                      {CATEGORY_ICONS[group.category] || CATEGORY_ICONS.LANGUAGES}
                    </span>
                    <h3 className={styles.groupName}>{group.category}</h3>
                  </div>
                  <p className={styles.groupSubtitle}>{group.subtitle}</p>
                  <div className={styles.groupDivider}></div>
                </div>

                {/* Modules Grid */}
                <div className={`${styles.modulesGrid} ${styles[`grid${group.code}`]}`}>
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className={`${styles.moduleCard} ${tech.isPrimary ? styles.primaryModule : ''}`}
                    >
                      {/* HUD Corner Ticks */}
                      <span className={`${styles.cornerTick} ${styles.cornerTL}`} aria-hidden="true"></span>
                      <span className={`${styles.cornerTick} ${styles.cornerBR}`} aria-hidden="true"></span>

                      {/* Card Header */}
                      <div className={styles.cardHeader}>
                        <span className={styles.techTag}>{tech.tag}</span>
                        {tech.isPrimary && (
                          <span className={styles.primaryBadge}>
                            <span className={styles.badgeDot}></span>
                            CORE
                          </span>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className={styles.cardBody}>
                        <h4 className={styles.techName}>{tech.name}</h4>
                        <span className={styles.techSpec}>{tech.spec}</span>
                        <p className={styles.techDesc}>{tech.description}</p>
                      </div>

                      {/* Micro Diagnostic Tick */}
                      <div className={styles.cardFooter}>
                        <div className={styles.diagnosticTick}>
                          <span className={styles.tickBar}></span>
                          <span className={styles.tickLabel}>MODULE_VERIFIED</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStack;
