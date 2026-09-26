/**
 * Renders the Education section showing academic background and qualification specifications.
 */
import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.js';
import educationData from '../../data/education.js';
import styles from './Education.module.css';

const Education = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="education" className="section" ref={ref}>
      <div className="container">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          
          <div className="section-header-block">
            <div className="section-tagline">
              <span className="section-number">05 //</span>
              <span className="section-label">EDUCATION // ACADEMIC SPECIFICATIONS</span>
              <div className="section-divider-line"></div>
            </div>
            <h2 className="section-title">Academic Background</h2>
            <p className="section-subtitle">
              Formal computer applications education, mathematical foundations, and technical qualification trajectory.
            </p>
          </div>

          <div className={styles.timeline}>
            {educationData.map((item, index) => {
              const code = `ACAD.0${index + 1}`;
              return (
                <div key={item.id} className={styles.item}>
                  <div className={styles.markerColumn}>
                    <span className={styles.specMarker}>{code}</span>
                    <div className={styles.verticalLine}></div>
                  </div>

                  <div className={styles.card}>
                    <div className={styles.headerRow}>
                      <span className={styles.levelHeading}>{item.level}</span>
                      <span className={styles.periodBadge}>{item.period}</span>
                    </div>

                    <h3 className={styles.degreeTitle}>{item.degree}</h3>
                    <p className={styles.institutionName}>{item.institution}</p>

                    <div className={styles.metaRow}>
                      {item.score && (
                        <span className={styles.metaBadge}>
                          <span className={styles.metaDot}></span>
                          {item.score}
                        </span>
                      )}
                      {item.board && (
                        <span className={styles.metaBadge}>
                          <span className={styles.metaDot}></span>
                          {item.board}
                        </span>
                      )}
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

export default Education;
