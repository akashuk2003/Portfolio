import { Database, Server, Cloud, Terminal, Cog, Shield } from "lucide-react";

const techCategories = [
  {
    title: "Languages",
    icon: Terminal,
    items: ["Python", "Go", "TypeScript", "Rust", "Java"],
  },
  {
    title: "Frameworks",
    icon: Server,
    items: ["FastAPI", "Django", "Express", "Gin", "Spring Boot"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    title: "Architecture",
    icon: Cog,
    items: ["Microservices", "REST APIs", "GraphQL", "gRPC", "Event-Driven"],
  },
  {
    title: "Security",
    icon: Shield,
    items: ["OAuth 2.0", "JWT", "RBAC", "Encryption", "Penetration Testing"],
  },
];

const TechStack = () => {
  return (
    <section id="tech" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />

      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm mb-4 block">
              {"<tech-stack>"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Technologies I Work With
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Building reliable, scalable systems with battle-tested technologies
            </p>
          </div>

          {/* Tech grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((category, index) => (
              <div
                key={category.title}
                className="group p-6 rounded-xl bg-card border border-border card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-sm font-mono bg-secondary text-secondary-foreground border border-border hover:border-primary/50 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <span className="font-mono text-primary text-sm">
              {"</tech-stack>"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
