import { useQuery } from "@tanstack/react-query";
import { Database, Server, Cloud, Terminal, Cog, Shield } from "lucide-react";
import { fetchTechStack } from "@/lib/api";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { TechCategory } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  Server,
  Database,
  Cloud,
  Cog,
  Shield,
};

const TechStack = () => {
  const { data: techCategories, isLoading, isError } = useQuery({
    queryKey: ["techStack"],
    queryFn: fetchTechStack,
    staleTime: 1000 * 60 * 5,
  });

  const headerRef = useScrollReveal();

  return (
    <section id="tech" className="py-28 relative">
      <div className="absolute inset-0 section-fade pointer-events-none" />

      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div ref={headerRef} className="text-center mb-16">
            <span className="font-mono text-primary text-xs uppercase tracking-widest mb-4 block">
              // Tools of the trade
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl mb-4 tracking-tight">
              Technologies I Work With
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Battle-tested tools chosen for reliability, performance, and
              long-term maintainability.
            </p>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-40 rounded-xl bg-card border border-border animate-pulse"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-12 text-muted-foreground font-mono text-sm">
              // Could not load tech stack.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techCategories?.map((category: TechCategory, index: number) => {
                const Icon = iconMap[category.icon] || Terminal;
                return (
                  <TechCard
                    key={category.id}
                    category={category}
                    Icon={Icon}
                    delay={index * 80}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

function TechCard({
  category,
  Icon,
  delay,
}: {
  category: TechCategory;
  Icon: React.ComponentType<{ className?: string }>;
  delay: number;
}) {
  const ref = useScrollReveal({ delay });
  return (
    <div
      ref={ref}
      className="card-glass card-shine group p-6 rounded-xl border border-border/60 hover:border-primary/35 transition-all duration-300"
      style={{ boxShadow: undefined }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-heading font-semibold text-base">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.items.map((item: string) => (
          <span
            key={item}
            className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary/80 text-secondary-foreground border border-border/60 hover:border-primary/40 hover:text-primary transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TechStack;
