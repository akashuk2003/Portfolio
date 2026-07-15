import { useQuery } from "@tanstack/react-query";
import {
  ExternalLink,
  Github,
  Server,
  Database,
  Zap,
  Lock,
  Code,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { fetchProjects } from "@/lib/api";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Project } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Database,
  Lock,
  Server,
  Code,
  Globe,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useScrollReveal({ delay: index * 120 });
  const Icon = iconMap[project.icon] || Zap;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={ref}
      className="card-shine group relative flex flex-col lg:flex-row gap-0 rounded-2xl border border-border/70 bg-card overflow-hidden hover:border-primary/35 transition-colors duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Left accent stripe */}
      <div className="lg:w-1.5 h-1 lg:h-auto bg-gradient-to-b from-primary to-accent opacity-20 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />

      <div className="flex-1 p-8 md:p-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground/60 font-bold tracking-widest">
              {num}
            </span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex gap-2">
            {project.github_url && project.github_url !== "#" && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/8 transition-all duration-200"
                title="View source"
              >
                <Github className="w-4 h-4 text-muted-foreground" />
              </a>
            )}
            {project.demo_url && project.demo_url !== "#" && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/8 transition-all duration-200"
                title="Live demo"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors duration-200">
          {project.title}
          <ArrowUpRight className="inline w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>

        {/* Description acts as problem/solution statement */}
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">
          {project.description}
        </p>

        {/* Results / Metrics */}
        {project.metrics?.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-mono text-muted-foreground/70 uppercase tracking-widest mb-3">
              Results
            </p>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((metric: string) => (
                <span
                  key={metric}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent/10 text-accent border border-accent/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {metric}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div>
          <p className="text-xs font-mono text-muted-foreground/70 uppercase tracking-widest mb-3">
            Built with
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary text-secondary-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Projects = () => {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  });

  const headerRef = useScrollReveal();

  return (
    <section id="projects" className="py-28 relative">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div ref={headerRef} className="mb-16">
            <span className="font-mono text-primary text-xs uppercase tracking-widest mb-4 block">
              // Selected Work
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl mb-4 tracking-tight">
              What I've Built
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Production systems across healthcare, HR, and fintech — built for
              reliability and real-world scale.
            </p>
          </div>

          {isLoading && (
            <div className="space-y-6">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-card border border-border animate-pulse"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-16 text-muted-foreground font-mono text-sm">
              // Could not load projects. Please try again later.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="space-y-6">
              {projects?.map((project: Project, i: number) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
