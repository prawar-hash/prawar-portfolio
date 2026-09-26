/**
 * Precision crosshair reticle cursor follower.
 * Fixed in place directly at the cursor tip with zero jumping, scale shifting, or hover displacement.
 */
import React, { useEffect, useState, useRef } from 'react';
import styles from './PrecisionCursor.module.css';

const PrecisionCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || (hasTouch && !isFinePointer)) {
      isTouchDevice.current = true;
      return;
    }

    const onMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"], input, textarea, select, .card, [data-interactive]');
      setIsHovering(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (isTouchDevice.current || !isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.cursorContainer} ${isHovering ? styles.hovering : ''}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Precision Crosshair Center */}
      <div className={styles.reticle}>
        <div className={styles.crosshairH}></div>
        <div className={styles.crosshairV}></div>
      </div>

      {/* Subtle Precision Ring */}
      <div className={styles.toolAccent}>
        <svg viewBox="0 0 24 24" className={styles.toolSvg}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.5" />
          <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.25" />
          <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.25" />
          <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.25" />
          <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </div>
    </div>
  );
};

export default PrecisionCursor;
