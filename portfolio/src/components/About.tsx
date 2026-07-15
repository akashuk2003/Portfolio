import { useQuery } from "@tanstack/react-query";
import { fetchProfile, fetchStats } from "@/lib/api";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Stat } from "@/lib/types";

const About = () => {
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
  });

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5,
  });

  const headerRef = useScrollReveal();
  const leftRef = useScrollReveal({ delay: 100 });
  const rightRef = useScrollReveal({ delay: 200 });

  if (isLoading) {
    return (
      <section id="about" className="py-28 relative">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-64 bg-muted rounded animate-pulse" />
            <div className="grid lg:grid-cols-2 gap-16 mt-10">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-28 bg-muted rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section id="about" className="py-28 relative">
      <div className="absolute inset-0 section-fade pointer-events-none" />

      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div ref={headerRef} className="mb-16">
            <span className="font-mono text-primary text-xs uppercase tracking-widest mb-4 block">
              // About me
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight">
              Building the Infrastructure{" "}
              <span className="text-gradient-primary">
                Behind Great Products
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — bio + terminal */}
            <div ref={leftRef}>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                {profile?.bio_paragraph_1 && <p>{profile.bio_paragraph_1}</p>}
                {profile?.bio_paragraph_2 && <p>{profile.bio_paragraph_2}</p>}
                {profile?.bio_paragraph_3 && <p>{profile.bio_paragraph_3}</p>}
              </div>

              {/* Terminal block */}
              <div className="p-5 rounded-xl bg-slate-900 dark:bg-background border border-slate-700 dark:border-border font-mono text-sm shadow-md">
                <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-slate-700 dark:border-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-slate-400">
                    profile.sh
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-slate-500">$</span>{" "}
                    <span className="text-blue-400">whoami</span>
                  </p>
                  <p className="text-slate-300 pl-3">
                    {profile?.whoami}
                  </p>
                  <p className="mt-2">
                    <span className="text-slate-500">$</span>{" "}
                    <span className="text-blue-400">location</span>
                  </p>
                  <p className="text-slate-300 pl-3">
                    {profile?.location}
                  </p>
                  <p className="mt-2">
                    <span className="text-slate-500">$</span>{" "}
                    <span className="text-blue-400">interests</span>
                  </p>
                  <p className="text-slate-300 pl-3">
                    {profile?.interests}
                  </p>
                </div>
              </div>
            </div>

            {/* Right — stats grid */}
            <div ref={rightRef} className="grid grid-cols-2 gap-4">
              {stats?.map((stat: Stat) => (
                <div
                  key={stat.id}
                  className="card-shine p-6 rounded-2xl bg-white dark:bg-card border border-border/70 hover:border-primary/35 hover:shadow-md hover:shadow-primary/8 transition-all duration-300 text-center"
                >
                  <div className="font-heading font-extrabold text-4xl text-gradient-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
