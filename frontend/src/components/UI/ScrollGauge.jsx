/**
 * Vertical Progress Gauge — Analog/mechanical precision scroll instrument.
 * Occupies the far-right scrollbar space spanning full height below the navbar.
 * Calculates progress based on real-time section DOM positions with smooth interpolation.
 * Reserves dedicated usable track space below 06 CONTACT so the red progress line
 * smoothly continues to the bottom of the navigator at 100% page scroll.
 */
import React, { useState, useEffect, useRef } from 'react';
import styles from './ScrollGauge.module.css';

const SECTIONS = [
  { code: '00', name: 'HOME', id: 'home' },
  { code: '01', name: 'ABOUT', id: 'about' },
  { code: '02', name: 'SKILLS', id: 'skills', altId: 'stack' },
  { code: '03', name: 'PROJECTS', id: 'projects' },
  { code: '04', name: 'EXPERTISE', id: 'expertise' },
  { code: '05', name: 'EDUCATION', id: 'education' },
  { code: '06', name: 'CONTACT', id: 'contact' },
];

// 06 CONTACT sits at 85% of the vertical track, leaving 15% clean track space below it to reach bottom
const CONTACT_TRACK_POS = 0.85;

const ScrollGauge = ({ activeSection: parentActiveSection, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCode, setActiveCode] = useState('00');
  const [activeName, setActiveName] = useState('HOME');
  const [globalPercent, setGlobalPercent] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;

      if (maxScroll <= 0) {
        setScrollProgress(0);
        setGlobalPercent(0);
        setActiveCode(SECTIONS[0].code);
        setActiveName(SECTIONS[0].name);
        return;
      }

      // 1. Overall page progress percentage
      const rawPercent = Math.min(Math.max(Math.round((scrollY / maxScroll) * 100), 0), 100);
      setGlobalPercent(rawPercent);

      // 2. Section DOM Trigger Positions (accounting for sticky navbar offset)
      const offset = 120;
      const sectionScrollTops = SECTIONS.map((sec, idx) => {
        if (idx === 0) return 0;
        const el =
          document.getElementById(sec.id) ||
          (sec.altId && document.getElementById(sec.altId));
        if (el) {
          const rect = el.getBoundingClientRect();
          return Math.max(0, rect.top + scrollY - offset);
        }
        return (idx / (SECTIONS.length - 1)) * maxScroll * 0.85;
      });

      // Ensure monotonic ordering
      for (let i = 1; i < sectionScrollTops.length; i++) {
        if (sectionScrollTops[i] < sectionScrollTops[i - 1]) {
          sectionScrollTops[i] = sectionScrollTops[i - 1] + 1;
        }
      }

      // 3. Clamping for absolute top and bottom
      if (scrollY <= 5) {
        setScrollProgress(0);
        setActiveCode(SECTIONS[0].code);
        setActiveName(SECTIONS[0].name);
        return;
      }

      if (windowHeight + scrollY >= documentHeight - 15) {
        setScrollProgress(1);
        setActiveCode(SECTIONS[SECTIONS.length - 1].code);
        setActiveName(SECTIONS[SECTIONS.length - 1].name);
        return;
      }

      // 4. Section-based position calculation with reserved bottom track
      const totalIntervals = SECTIONS.length - 1; // 6 intervals between 7 sections
      let calculatedProgress = 0;
      let currentIdx = 0;

      for (let i = 0; i < sectionScrollTops.length; i++) {
        if (scrollY >= sectionScrollTops[i]) {
          currentIdx = i;
        }
      }

      if (currentIdx < totalIntervals) {
        // Between sections 00 and 06 (interpolated within 0.00 -> 0.85 track range)
        const startY = sectionScrollTops[currentIdx];
        const endY = sectionScrollTops[currentIdx + 1];
        const span = Math.max(endY - startY, 1);
        const localRatio = Math.max(0, Math.min(1, (scrollY - startY) / span));

        const targetStart = (currentIdx / totalIntervals) * CONTACT_TRACK_POS;
        const targetEnd = ((currentIdx + 1) / totalIntervals) * CONTACT_TRACK_POS;
        calculatedProgress = targetStart + localRatio * (targetEnd - targetStart);
      } else {
        // Beyond 06 CONTACT towards the bottom of the page/footer (0.85 -> 1.00 track range)
        const startY = sectionScrollTops[totalIntervals];
        const endY = maxScroll;
        const span = Math.max(endY - startY, 1);
        const localRatio = Math.max(0, Math.min(1, (scrollY - startY) / span));
        calculatedProgress = CONTACT_TRACK_POS + localRatio * (1.0 - CONTACT_TRACK_POS);
      }

      setScrollProgress(Math.min(Math.max(calculatedProgress, 0), 1));
      setActiveCode(SECTIONS[currentIdx].code);
      setActiveName(SECTIONS[currentIdx].name);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Handle dynamic DOM changes (e.g. project hood opens/closes, images load)
    const observer = new MutationObserver(() => {
      handleScroll();
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSectionClick = (e, section) => {
    e.preventDefault();
    const targetElement =
      document.getElementById(section.id) ||
      (section.altId && document.getElementById(section.altId));

    if (targetElement) {
      if (onNavigate) {
        onNavigate(section.id);
      }

      const navbarHeight = 70;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition =
        section.id === 'home' ? 0 : elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', `#${section.id}`);
      }
    }
  };

  return (
    <aside className={styles.gaugeContainer} aria-label="Page scroll position navigator">
      {/* Precision Full-Height Rail Frame */}
      <div className={styles.gaugeFrame}>
        
        {/* Full-Height Vertical Measurement Track (Shared Center Axis) */}
        <div className={styles.gaugeTrackArea} ref={trackRef}>
          {/* 1. Background Track Rail Line */}
          <div className={styles.trackLine}></div>

          {/* 2. Active Filled Red Progress Line (Interpolated Section Progress + Bottom Extension) */}
          <div
            className={styles.trackFill}
            style={{ height: `${scrollProgress * 100}%` }}
          ></div>

          {/* 3. Micro Calibration Ticks spanning 100% height */}
          <div className={styles.ticksOverlay} aria-hidden="true">
            {[...Array(31)].map((_, i) => (
              <span
                key={i}
                className={`${styles.tick} ${i % 5 === 0 ? styles.majorTick : ''}`}
                style={{ top: `${(i / 30) * 100}%` }}
              ></span>
            ))}
          </div>

          {/* 4. Section Waypoint Markers (00 at 0% to 06 at 85%, leaving 15% track below 06) */}
          <div className={styles.waypointsList}>
            {SECTIONS.map((sec, idx) => {
              const isCurrent = sec.code === activeCode;
              const posPercent = (idx / (SECTIONS.length - 1)) * CONTACT_TRACK_POS * 100;
              const isPassed = scrollProgress >= (idx / (SECTIONS.length - 1)) * CONTACT_TRACK_POS;
              return (
                <button
                  key={sec.code}
                  type="button"
                  className={`${styles.waypointBtn} ${isCurrent ? styles.activeWaypoint : ''} ${isPassed ? styles.passedWaypoint : ''}`}
                  style={{ top: `${posPercent}%` }}
                  onClick={(e) => handleSectionClick(e, sec)}
                  aria-label={`Scroll to ${sec.name} (${sec.code})`}
                  title={`${sec.code} // ${sec.name}`}
                >
                  <span className={styles.waypointPoint}></span>
                  <span className={styles.waypointCode}>{sec.code}</span>
                </button>
              );
            })}
          </div>

          {/* 5. Active Floating Indicator Needle (Travels from 0% at top to 100% at bottom of track) */}
          <div
            className={styles.indicatorNeedle}
            style={{ top: `${scrollProgress * 100}%` }}
            aria-hidden="true"
          >
            {/* Active Red Center Circle Pip */}
            <span className={styles.needleDot}></span>

            {/* Active Section Telemetry Panel (Vertically locked to red circle center) */}
            <div className={styles.readoutBadge}>
              <span className={styles.readoutCode}>{activeCode}</span>
              <span className={styles.readoutName}>{activeName}</span>
              <span className={styles.readoutDivider}>|</span>
              <span className={styles.readoutPercent}>{globalPercent}%</span>
            </div>
          </div>

        </div>

      </div>
    </aside>
  );
};

export default ScrollGauge;
