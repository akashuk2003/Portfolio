import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { fetchProfile, fetchSocialLinks } from "@/lib/api";
import type { SocialLink } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

const Hero = () => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const { data: socialLinks } = useQuery({
    queryKey: ['socialLinks'],
    queryFn: fetchSocialLinks,
  });

  if (profileLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-glow" />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal-style intro */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">
              {profile?.availability_status}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient-primary">{profile?.name}</span>
          </h1>

          {/* Terminal command style subtitle */}
          <div className="font-mono text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-primary">$</span> {profile?.title}
            <span className="text-syntax-yellow">.</span>
            <span className="text-syntax-pink">build</span>
            <span className="text-muted-foreground">(</span>
            <span className="text-terminal-green">"{profile?.tagline}"</span>
            <span className="text-muted-foreground">)</span>
            <span className="inline-block w-2 h-5 bg-primary ml-1 animate-blink" />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in text-balance" style={{ animationDelay: "0.3s" }}>
            {profile?.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {socialLinks?.filter((link: SocialLink) => ['github', 'linkedin', 'email'].includes(link.platform)).map((link: SocialLink) => {
              const Icon = iconMap[link.platform];
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.platform !== 'email' ? "_blank" : undefined}
                  rel={link.platform !== 'email' ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:glow-primary transition-all duration-300"
                >
                  {Icon && <Icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <a href="#tech" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-sm font-mono">scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
