/** App shell — layout with PrecisionCursor, ScrollGauge, Navbar, routing, and Footer. */
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PrecisionCursor from './components/UI/PrecisionCursor';
import ScrollGauge from './components/UI/ScrollGauge';
import Home from './pages/Home';
import { useActiveSection } from './hooks/useIntersectionObserver';

const NAV_SECTION_IDS = ['home', 'about', 'skills', 'projects', 'expertise', 'education', 'contact'];

export default function App() {
  const [activeSection, setManualActive] = useActiveSection(NAV_SECTION_IDS);

  return (
    <>
      <PrecisionCursor />
      <ScrollGauge activeSection={activeSection} onNavigate={setManualActive} />
      <Navbar activeSection={activeSection} onNavClick={setManualActive} />
      <Home />
      <Footer />
    </>
  );
}
