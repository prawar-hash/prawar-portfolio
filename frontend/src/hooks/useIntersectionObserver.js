/**
 * Intersection Observer hooks for reveal animations and active section tracking.
 */
import { useEffect, useRef, useState } from 'react';

/**
 * Triggers reveal animation once element enters the viewport.
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/**
 * Accurately tracks which navigation section is currently in view.
 * Accounts for sticky navbar height, manual clicks, and scroll boundaries.
 */
export function useActiveSection(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home');
  const isManualScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Top of page boundary: always 'home'
      if (scrollY < 80) {
        setActiveSection(sectionIds[0] || 'home');
        return;
      }

      // Bottom of page boundary: always the last section ('contact')
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Find current section by comparing bounding rects against sticky navbar trigger line
      let currentSection = sectionIds[0];

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Run on initial mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [sectionIds, offset]);

  const setManualActive = (id) => {
    setActiveSection(id);
    isManualScroll.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 850);
  };

  return [activeSection, setManualActive];
}

export default useIntersectionObserver;
