/** Home page — assembles all portfolio sections in requested sequence. */
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import TechStack from '../components/TechStack/TechStack';
import Projects from '../components/Projects/Projects';
import Expertise from '../components/Expertise/Expertise';
import Education from '../components/Education/Education';
import Contact from '../components/Contact/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Expertise />
      <Education />
      <Contact />
    </main>
  );
}
