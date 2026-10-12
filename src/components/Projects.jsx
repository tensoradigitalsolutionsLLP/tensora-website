import React, { useEffect, useState } from 'react';
import { projectsData, projectCategories } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { Sparkles, Eye, ArrowUpRight, FolderGit2, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState(projectsData);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/projects')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setProjects(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = [
    'All',
    ...new Set([...projectCategories.filter((category) => category !== 'All'), ...projects.map((project) => project.category)])
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#0B1220] text-white overflow-hidden">
      
      {/* Ambient Lighting */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D8B070]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D294A] border border-[#D8B070]/40 mb-4">
            <FolderGit2 className="w-3.5 h-3.5 text-[#D8B070]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] font-bold text-[#FFF1D6]">
              PORTFOLIO SHOWCASE
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            OUR <span className="text-gold-gradient">WORK</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300 font-normal">
            Turning creative ideas into digital experiences.
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] text-[#071A33] font-bold shadow-[0_0_15px_rgba(216,176,112,0.4)] scale-105'
                    : 'bg-[#071A33] text-gray-300 hover:text-white border border-[#D8B070]/20 hover:border-[#D8B070]/50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#071A33]/90 border border-[#D8B070]/25 overflow-hidden hover:border-[#D8B070] shadow-lg hover:shadow-[0_15px_35px_rgba(216,176,112,0.25)] transition-all duration-300 transform hover:-translate-y-2 text-left"
            >
              {/* Card Visual Thumbnail */}
              <div
                style={{ background: project.imageTheme }}
                className="relative h-48 w-full p-5 flex flex-col justify-between overflow-hidden border-b border-[#D8B070]/20"
              >
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={`${project.title} project preview`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                )}
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                {/* Top badges */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-[#071A33]/85 text-[#FFF1D6] border border-[#D8B070]/40 text-[10px] font-mono-tech font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono-tech text-white/90 bg-black/40 px-2 py-0.5 rounded">
                    {project.year}
                  </span>
                </div>

                {/* Center project moniker */}
                <div className="relative z-10 text-center my-auto">
                  <span className="font-heading font-black text-xl text-white drop-shadow-md">
                    {project.typeBadge}
                  </span>
                </div>

                {/* Bottom Tags preview */}
                <div className="relative z-10 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-black/50 text-[10px] font-mono-tech text-gray-200 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#D8B070] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Action: View Project */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#D8B070]">
                    {project.client}
                  </span>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] to-[#D8B070] hover:shadow-md transition-all"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Portfolio Note */}
        <div className="mt-14 text-center">
          <p className="text-xs text-gray-400">
            Have a custom creative concept or confidential NDA project?{' '}
            <a href="#contact" className="text-[#D8B070] underline hover:text-white font-semibold">
              Contact our engineering studio
            </a>{' '}
            for private enterprise showcases.
          </p>
        </div>

      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </section>
  );
}
