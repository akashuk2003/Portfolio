import { useQuery } from "@tanstack/react-query";
import { fetchProfile, fetchStats } from "@/lib/api";
import type { Stat } from "@/lib/types";

const About = () => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  if (profileLoading || statsLoading) {
    return (
      <section id="about" className="py-24 relative">
        <div className="container relative z-10 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Terminal style about */}
            <div>
              <span className="font-mono text-primary text-sm mb-4 block">
                {"$ cat about.md"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building the Infrastructure <br />
                <span className="text-gradient-primary">Behind Great Products</span>
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {profile?.bio_paragraph_1 && <p>{profile.bio_paragraph_1}</p>}
                {profile?.bio_paragraph_2 && <p>{profile.bio_paragraph_2}</p>}
                {profile?.bio_paragraph_3 && <p>{profile.bio_paragraph_3}</p>}
              </div>

              {/* Terminal-style code block */}
              <div className="mt-8 p-4 rounded-xl bg-background border border-border font-mono text-sm">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-syntax-yellow" />
                  <div className="w-3 h-3 rounded-full bg-terminal-green" />
                </div>
                <div className="space-y-1">
                  <p><span className="text-muted-foreground">$</span> <span className="text-primary">whoami</span></p>
                  <p className="text-muted-foreground pl-2">{profile?.whoami}</p>
                  <p><span className="text-muted-foreground">$</span> <span className="text-primary">location</span></p>
                  <p className="text-muted-foreground pl-2">{profile?.location}</p>
                  <p><span className="text-muted-foreground">$</span> <span className="text-primary">interests</span></p>
                  <p className="text-muted-foreground pl-2">{profile?.interests}</p>
                </div>
              </div>
            </div>

            {/* Right column - Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats?.map((stat: Stat) => (
                <div
                  key={stat.id}
                  className="p-6 rounded-2xl bg-card border border-border card-hover text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
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
