/**
 * Projects section component that displays engineered AI/ML and full-stack systems.
 * Features realistic 3D car-hood / bonnet mechanical cards.
 */
import React, { useState } from 'react';
import styles from './Projects.module.css';
import projects from '../../data/projects';
import ProjectCard from './ProjectCard';
import ProjectCaseStudy from './ProjectCaseStudy';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const handleToggleProject = (id) => {
    setOpenProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className={`${styles.projectsSection} ${isVisible ? styles.visible : ''}`} ref={ref}>
      <div className="container">
        
        <div className="section-header-block">
          <div className="section-tagline">
            <span className="section-number">03 //</span>
            <span className="section-label">PROJECTS // ENGINEERED SYSTEMS</span>
            <div className="section-divider-line"></div>
          </div>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            Engineered systems applying machine learning, predictive modeling, data pipelines, and backend architectures. Click a project hood to inspect its internal technical assembly.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              isOpen={openProjectId === (project.id || index)}
              onToggleOpen={() => handleToggleProject(project.id || index)}
              onViewCaseStudy={setSelectedProject}
            />
          ))}
        </div>

      </div>

      {selectedProject && (
        <ProjectCaseStudy
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
