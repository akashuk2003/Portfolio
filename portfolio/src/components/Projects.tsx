import { ExternalLink, Github, Server, Database, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Distributed Task Queue",
    description: "High-throughput task processing system handling 100K+ jobs/minute with Redis-backed queue, worker pools, and real-time monitoring dashboard.",
    tech: ["Go", "Redis", "gRPC", "Prometheus", "Grafana"],
    metrics: ["100K+ jobs/min", "99.99% uptime", "Sub-10ms latency"],
    icon: Zap,
    github: "#",
    demo: "#",
  },
  {
    title: "Real-time Analytics Pipeline",
    description: "Event streaming platform processing millions of events daily with Kafka, real-time aggregations, and data warehouse integration.",
    tech: ["Python", "Kafka", "ClickHouse", "Kubernetes", "Airflow"],
    metrics: ["5M events/day", "Real-time processing", "Data warehouse sync"],
    icon: Database,
    github: "#",
    demo: "#",
  },
  {
    title: "Microservices Auth Platform",
    description: "Enterprise-grade authentication service with OAuth 2.0, SSO, MFA, and fine-grained RBAC supporting 500K+ users.",
    tech: ["TypeScript", "PostgreSQL", "Redis", "JWT", "Docker"],
    metrics: ["500K+ users", "OAuth 2.0 + SSO", "Multi-tenant"],
    icon: Lock,
    github: "#",
    demo: "#",
  },
  {
    title: "API Gateway & Rate Limiter",
    description: "High-performance API gateway with intelligent rate limiting, request routing, circuit breakers, and detailed analytics.",
    tech: ["Rust", "Redis", "OpenAPI", "Envoy", "AWS"],
    metrics: ["1M+ req/sec", "P99 < 5ms", "Zero downtime deploys"],
    icon: Server,
    github: "#",
    demo: "#",
  },
];

const Projects = () => {
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
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group relative p-8 rounded-2xl bg-card border border-border card-hover overflow-hidden"
              >
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <project.icon className="w-6 h-6" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.metrics.map((metric) => (
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
                  {project.tech.map((tech) => (
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
                    <a href={project.github}>
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.demo}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
