/**
 * Renders a subtle animated SVG network visualization representing data flows or neural networks.
 */
import React, { useMemo, useState, useEffect } from 'react';
import styles from './NetworkVisual.module.css';

const NetworkVisual = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { dots, lines } = useMemo(() => {
    const generatedDots = [];
    const generatedLines = [];
    const numDots = 35;
    const width = 800;
    const height = 800;
    const maxDistance = 180;

    // Generate random stable dots
    for (let i = 0; i < numDots; i++) {
      // Use deterministic pseudo-randomness or pure random since it's a visual effect
      // But using pure random is fine for a one-off render.
      generatedDots.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        delay: Math.random() * 5 // 0 to 5 seconds staggered delay
      });
    }

    // Connect dots if within maxDistance
    for (let i = 0; i < numDots; i++) {
      for (let j = i + 1; j < numDots; j++) {
        const dx = generatedDots[i].x - generatedDots[j].x;
        const dy = generatedDots[i].y - generatedDots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          generatedLines.push({
            id: `${i}-${j}`,
            x1: generatedDots[i].x,
            y1: generatedDots[i].y,
            x2: generatedDots[j].x,
            y2: generatedDots[j].y,
            delay: Math.random() * 5
          });
        }
      }
    }

    return { dots: generatedDots, lines: generatedLines };
  }, []);

  // Avoid SSR hydration mismatches with random numbers by rendering null until mounted
  if (!mounted) return null;

  return (
    <svg className={styles.svgContainer} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className={styles.lines}>
        {lines.map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className={styles.line}
            style={{ animationDelay: `${line.delay}s` }}
          />
        ))}
      </g>
      <g className={styles.dots}>
        {dots.map((dot) => (
          <circle
            key={dot.id}
            cx={dot.x}
            cy={dot.y}
            r="3"
            className={styles.dot}
            style={{ animationDelay: `${dot.delay}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

export default NetworkVisual;
