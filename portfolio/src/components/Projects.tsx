import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Server, Database, Zap, Lock, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProjects } from "@/lib/api";
import type { Project } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Database,
  Lock,
  Server,
  Code,
  Globe,
};

const Projects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-24 relative">
        <div className="container relative z-10 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse text-muted-foreground">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative">
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm mb-4 block">
              {"// Featured Projects"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What I've Built
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Production systems that scale, perform, and just work
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects?.map((project: Project) => {
              const Icon = iconMap[project.icon] || Zap;
              return (
                <div
                  key={project.id}
                  className="group relative p-8 rounded-2xl bg-card border border-border card-hover overflow-hidden"
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.metrics.map((metric: string) => (
                      <span
                        key={metric}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-sm font-mono bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github_url}>
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.demo_url}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
