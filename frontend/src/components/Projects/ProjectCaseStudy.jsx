/**
 * Modal component displaying in-depth case study of a selected project.
 */
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './ProjectCaseStudy.module.css';

const ProjectCaseStudy = ({ project, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const hasDisclaimer = Boolean(
    project.disclaimer ||
    project.fullDescription?.toLowerCase().includes('does not perform medical diagnosis') ||
    project.overview?.toLowerCase().includes('does not perform medical diagnosis')
  );
  const disclaimerText = project.disclaimer || 'Note: This project is for educational and portfolio purposes only and does not perform medical diagnosis.';

  const renderParagraphs = (text) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, pIdx) => (
      <p key={pIdx} className={styles.sectionContent}>
        {paragraph.split('\n').map((line, lIdx) => (
          <React.Fragment key={lIdx}>
            {lIdx > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </p>
    ));
  };

  return createPortal(
    <div 
      className={styles.overlay} 
      ref={overlayRef} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.content}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className={styles.header}>
          <span className={styles.categoryBadge}>{project.category}</span>
          <h2 id="modal-title" className={styles.title}>{project.title}</h2>
          {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
          <p className={styles.shortDescription}>{project.shortDescription}</p>
        </div>

        <div className={styles.sections}>
          {hasDisclaimer && (
            <div className={styles.infoCallout}>
              <p>Note: This project is for educational and portfolio purposes only and does not perform medical diagnosis.</p>
            </div>
          )}

          {project.status && (
            <div className={styles.statusCallout}>
              <span className={styles.statusDot}></span>
              <p className={styles.statusText}>{project.status}</p>
            </div>
          )}

          {project.overview && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Overview</h3>
              {renderParagraphs(project.overview)}
            </div>
          )}

          {project.problem && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{project.problemHeading || (project.overview ? 'Problem' : 'Overview & Problem')}</h3>
              {renderParagraphs(project.problem)}
            </div>
          )}

          {project.solution && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{project.solutionHeading || 'Solution'}</h3>
              {renderParagraphs(project.solution)}
            </div>
          )}

          {project.approach && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Approach</h3>
              {renderParagraphs(project.approach)}
            </div>
          )}

          {project.engineering && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Engineering & Architecture</h3>
              {renderParagraphs(project.engineering)}
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Technologies</h3>
            <div className={styles.techTags}>
              {project.technologies?.map((tech, i) => (
                <span key={i} className={styles.techTag}>{tech}</span>
              ))}
            </div>
          </div>

          {project.features && project.features.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Key Features</h3>
              <ul className={styles.featuresList}>
                {project.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {(project.githubUrl || project.liveUrl) && (
            <div className={`${styles.section} ${styles.linksSection}`}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                  GitHub
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.linkButton} ${styles.primaryButton}`}>
                  Live Demo
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectCaseStudy;
