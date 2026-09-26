/**
 * Technical engineering module card styled as a realistic automotive engine bay with a 3D opening car hood.
 * Features an explicit latch release button and full-card click handling when closed.
 */
import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, index, isOpen, onToggleOpen, onViewCaseStudy }) => {
  const code = `SYS.0${index + 1}`;

  const handleCardClick = (e) => {
    // If closed, clicking anywhere on the card opens the hood
    if (!isOpen) {
      onToggleOpen();
    }
  };

  const handleCardKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Avoid triggering when focused on internal buttons/links
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
        e.preventDefault();
        onToggleOpen();
      }
    }
  };

  const getStatusBadge = () => {
    if (project.id === 'torqvia') {
      return (
        <span className={`${styles.statusBadge} ${styles.refining}`}>
          <span className={styles.statusDot}></span>
          UNDER REFINEMENT
        </span>
      );
    }
    if (project.id === 'oncosphere') {
      return (
        <span className={styles.statusBadge}>
          <span className={`${styles.statusDot} ${styles.green}`}></span>
          HEALTHCARE CORE
        </span>
      );
    }
    return (
      <span className={styles.statusBadge}>
        <span className={`${styles.statusDot} ${styles.blue}`}></span>
        ML REGRESSION
      </span>
    );
  };

  return (
    <article
      className={`${styles.chassisCard} ${isOpen ? styles.hoodOpen : styles.hoodClosed}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Project: ${project.title}`}
    >
      {/* ── TOP HINGE & REAR STRUT ASSEMBLY ── */}
      <div className={styles.hingeBar} aria-hidden="true">
        <div className={styles.hingeBracketLeft}>
          <span className={styles.hingePin}></span>
          <span className={styles.hingeLabel}>HINGE.L</span>
        </div>
        <div className={styles.hingeCenterTrack}>
          <span className={styles.hingeAxisLine}></span>
          <span className={styles.hingeCenterText}>CHASSIS PIVOT // 1000N DUAL STRUT</span>
        </div>
        <div className={styles.hingeBracketRight}>
          <span className={styles.hingePin}></span>
          <span className={styles.hingeLabel}>HINGE.R</span>
        </div>
      </div>

      {/* Hydraulic Gas Struts on sides */}
      <div className={styles.strutAssembly} aria-hidden="true">
        <div className={`${styles.strut} ${styles.strutLeft}`}>
          <span className={styles.strutCylinder}></span>
          <span className={styles.strutPiston}></span>
        </div>
        <div className={`${styles.strut} ${styles.strutRight}`}>
          <span className={styles.strutCylinder}></span>
          <span className={styles.strutPiston}></span>
        </div>
      </div>

      {/* ── 3D CAR HOOD / BONNET PANEL ── */}
      <div
        className={styles.hoodPanel}
        onClick={(e) => {
          if (isOpen) {
            e.stopPropagation();
            onToggleOpen();
          }
        }}
      >
        {/* Exterior Hood Finish & Body Lines */}
        <div className={styles.hoodSurface}>
          {/* Aerodynamic Body Creases */}
          <div className={styles.hoodCreaseLeft} aria-hidden="true"></div>
          <div className={styles.hoodSpine} aria-hidden="true"></div>
          <div className={styles.hoodCreaseRight} aria-hidden="true"></div>

          {/* Hood Header Specs */}
          <div className={styles.hoodHeader}>
            <div className={styles.hoodMetaGroup}>
              <span className={styles.hoodCode}>{code}</span>
              <span className={styles.hoodPanelTag}>HOOD // CARBON-COMPOSITE</span>
            </div>
            {getStatusBadge()}
          </div>

          {/* Hood Center Identification */}
          <div className={styles.hoodCenter}>
            <span className={styles.hoodCategory}>{project.category}</span>
            <h3 className={styles.hoodTitle}>{project.title}</h3>
            {project.subtitle && <p className={styles.hoodSubtitle}>{project.subtitle}</p>}
            <div className={styles.hoodWatermark} aria-hidden="true">0{index + 1}</div>
          </div>

          {/* Bottom Hood Latch Release Button */}
          <div className={styles.hoodLatch}>
            <button
              type="button"
              className={styles.latchButton}
              onClick={(e) => {
                e.stopPropagation();
                onToggleOpen();
              }}
              aria-expanded={isOpen}
              aria-controls={`bay-content-${project.id || index}`}
              aria-label={isOpen ? `Close hood for ${project.title}` : `Open hood for ${project.title}`}
            >
              <span className={styles.latchIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {isOpen ? (
                    <polyline points="18 15 12 9 6 15"></polyline>
                  ) : (
                    <polyline points="6 9 12 15 18 9"></polyline>
                  )}
                </svg>
              </span>
              <span className={styles.latchText}>
                {isOpen ? 'HOOD ELEVATED // CLICK TO SECURE' : 'RELEASE LATCH // CLICK TO OPEN HOOD'}
              </span>
            </button>
            <span className={styles.latchStatusDot}></span>
          </div>

          {/* Carbon Texture & Spec Sheen */}
          <div className={styles.hoodSheen} aria-hidden="true"></div>
        </div>

        {/* Under-Hood Structural Ribbing (Visible when lifted in 3D) */}
        <div className={styles.underHoodLiner} aria-hidden="true">
          <div className={styles.linerReinforcement}></div>
          <span className={styles.linerBadge}>SPEC.ISO-9001 // REINFORCED</span>
        </div>
      </div>

      {/* ── EXPOSED ENGINE BAY / INTERNAL ASSEMBLY ── */}
      <div
        id={`bay-content-${project.id || index}`}
        className={styles.engineBay}
        aria-hidden={!isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cast shadow from lifted hood */}
        <div className={styles.hoodCastShadow} aria-hidden="true"></div>

        {/* Internal Chassis Blueprint Framing */}
        <div className={styles.bayFrame}>
          <div className={styles.bayHeader}>
            <div className={styles.bayTelemetry}>
              <span className={styles.bayPulse}></span>
              <span className={styles.bayLabel}>INTERNAL ASSEMBLY // {code}</span>
            </div>
            <span className={styles.bayCategory}>{project.category}</span>
          </div>

          {/* Title & Core Architecture */}
          <div className={styles.bayMain}>
            <h3 className={styles.bayTitle}>{project.title}</h3>
            {project.subtitle && <p className={styles.baySubtitle}>{project.subtitle}</p>}
            <p className={styles.bayDescription}>{project.shortDescription}</p>

            {/* Component Technology Modules */}
            <div className={styles.bayTechSection}>
              <span className={styles.techSectionLabel}>INSTALLED MODULES // TECH ARSENAL:</span>
              <div className={styles.techTags}>
                {project.technologies?.map((tech, i) => (
                  <span key={i} className={styles.techPill}>
                    <span className={styles.techDot}></span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Internal Action Dock */}
          <div className={styles.bayActionDock}>
            <button
              type="button"
              className={styles.caseStudyBtn}
              onClick={(e) => {
                e.stopPropagation();
                onViewCaseStudy(project);
              }}
              aria-label={`Open complete system specification for ${project.title}`}
            >
              <span>OPEN SYSTEM SPEC</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <div className={styles.secondaryActions}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubIcon}
                  aria-label={`View ${project.title} on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              )}

              <button
                type="button"
                className={styles.closeHoodBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleOpen();
                }}
                aria-label={`Secure hood for ${project.title}`}
              >
                <span>SECURE HOOD</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* HUD Corner Ticks */}
      <span className={`${styles.cornerTick} ${styles.cornerTL}`} aria-hidden="true"></span>
      <span className={`${styles.cornerTick} ${styles.cornerTR}`} aria-hidden="true"></span>
      <span className={`${styles.cornerTick} ${styles.cornerBL}`} aria-hidden="true"></span>
      <span className={`${styles.cornerTick} ${styles.cornerBR}`} aria-hidden="true"></span>
    </article>
  );
};

export default ProjectCard;
