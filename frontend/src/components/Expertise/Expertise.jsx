/**
 * Renders the Expertise section highlighting technical AI/ML, Data, and Database capabilities
 * structured as an engineering capability matrix.
 */
import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.js';
import expertiseData from '../../data/expertise.js';
import styles from './Expertise.module.css';

const getIcon = (id) => {
  switch (id) {
    case 'ml-solutions':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case 'predictive-modeling':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'recommendation-systems':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 8 8 12 12 16 16 12 12 8" />
        </svg>
      );
    case 'data-feature-engineering':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'database-architecture':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'model-integration':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    default:
      return null;
  }
};

const Expertise = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="expertise" className="section" ref={ref}>
      <div className="container">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          
          <div className="section-header-block">
            <div className="section-tagline">
              <span className="section-number">04 //</span>
              <span className="section-label">EXPERTISE // TECHNICAL CAPABILITY MATRIX</span>
              <div className="section-divider-line"></div>
            </div>
            <h2 className="section-title">Technical Capabilities</h2>
            <p className="section-subtitle">
              Core focus areas spanning machine learning, predictive analytics, data engineering, and model deployment.
            </p>
          </div>

          <div className={styles.grid}>
            {expertiseData.map((item, index) => {
              const code = `0${index + 1}`;
              return (
                <div key={item.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      {getIcon(item.id)}
                    </div>
                    <div className={styles.headerMeta}>
                      <span className={styles.moduleCode}>MODULE // {code}</span>
                      <h3 className={styles.title}>{item.title}</h3>
                    </div>
                  </div>

                  <p className={styles.description}>{item.description}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.techLabel}>
                      <span className={styles.telemetryDot}></span>
                      <span>TECHNOLOGIES</span>
                    </div>
                    <div className={styles.techTags}>
                      {item.technologies.map((tech, techIdx) => (
                        <span key={techIdx} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Expertise;
