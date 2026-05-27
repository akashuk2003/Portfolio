import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProfile, fetchSocialLinks } from "@/lib/api";
import { useTextScramble } from "@/hooks/useTextScramble";
import type { SocialLink } from "@/lib/types";

const ROLES = [
  "Backend Engineer.",
  "API Architect.",
  "Systems Builder.",
  "Django Developer.",
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
  });

  const { data: socialLinks } = useQuery({
    queryKey: ["socialLinks"],
    queryFn: fetchSocialLinks,
    staleTime: 1000 * 60 * 5,
  });

  const scrambledRole = useTextScramble(ROLES[roleIndex], 400);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center">
        <div className="container px-4">
          <div className="max-w-4xl space-y-5">
            <div className="h-3 w-28 bg-muted rounded-full animate-pulse" />
            <div className="h-14 w-72 bg-muted rounded-lg animate-pulse" />
            <div className="h-10 w-56 bg-muted rounded-lg animate-pulse" />
            <div className="h-5 w-full max-w-lg bg-muted rounded animate-pulse" />
            <div className="h-5 w-full max-w-md bg-muted rounded animate-pulse" />
            <div className="flex gap-3 pt-4">
              <div className="h-11 w-36 bg-muted rounded-lg animate-pulse" />
              <div className="h-11 w-36 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 hero-mesh-bg" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black_40%,transparent_100%)]" />

      <div className="container relative z-10 px-4 pt-24 pb-16">
        <div className="max-w-4xl">

          {/* Status badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border mb-10 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground tracking-wider">
              {profile?.availability_status}
            </span>
          </div>

          {/* Name */}
          <h1
            className={`font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-4 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {profile?.name}
          </h1>

          {/* Cycling role with scramble */}
          <div
            className={`flex items-baseline gap-2 mb-6 transition-all duration-700 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="font-mono text-2xl md:text-3xl text-gradient-primary font-bold">
              {scrambledRole}
            </span>
            <span className="inline-block w-0.5 h-7 bg-primary animate-blink" />
          </div>

          {/* Tagline + description */}
          {profile?.description && (
            <p
              className={`text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-3 transition-all duration-700 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {profile.description}
            </p>
          )}

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center gap-3 mt-10 mb-14 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold group"
            >
              <a href="#projects">
                View My Work
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-primary/50 hover:bg-primary/5 font-semibold"
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          {/* Social links */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 delay-[400ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {socialLinks
              ?.filter((l: SocialLink) =>
                ["github", "linkedin", "email"].includes(l.platform)
              )
              .map((link: SocialLink) => {
                const Icon = iconMap[link.platform];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.platform !== "email" ? "_blank" : undefined}
                    rel={
                      link.platform !== "email"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/8 transition-all duration-200"
                    title={link.platform}
                  >
                    {Icon && (
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    )}
                  </a>
                );
              })}
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              — {profile?.location}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50">
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
