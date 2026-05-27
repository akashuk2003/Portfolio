import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Calendar, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProfile } from "@/lib/api";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Contact = () => {
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
  });

  const headerRef = useScrollReveal();
  const cardRef = useScrollReveal({ delay: 100 });

  if (isLoading) {
    return (
      <section id="contact" className="py-28 relative">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-72 bg-muted rounded animate-pulse" />
            <div className="h-64 bg-muted rounded-2xl animate-pulse mt-10" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section id="contact" className="py-28 relative">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={headerRef} className="text-center mb-16">
            <span className="font-mono text-primary text-xs uppercase tracking-widest mb-4 block">
              // Let's build something
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl mb-4 tracking-tight">
              Got a Project in Mind?
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Open to freelance projects, full-time roles, and interesting
              problems. Usually reply within 24 hours.
            </p>
          </div>

          <div
            ref={cardRef}
            className="relative p-8 md:p-12 rounded-2xl bg-card border border-primary/20 overflow-hidden"
            style={{
              boxShadow:
                "0 0 60px -20px hsl(var(--primary) / 0.15), inset 0 0 40px -20px hsl(var(--primary) / 0.05)",
            }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-10 mb-10">
                {/* Contact info */}
                <div className="space-y-6">
                  {profile?.email && (
                    <ContactRow
                      icon={<Mail className="w-4 h-4" />}
                      label="Email"
                    >
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {profile.email}
                      </a>
                    </ContactRow>
                  )}

                  {profile?.location && (
                    <ContactRow
                      icon={<MapPin className="w-4 h-4" />}
                      label="Location"
                    >
                      <p className="text-muted-foreground">{profile.location}</p>
                    </ContactRow>
                  )}

                  {profile?.availability_message && (
                    <ContactRow
                      icon={<Calendar className="w-4 h-4" />}
                      label="Availability"
                    >
                      <p className="text-muted-foreground">
                        {profile.availability_message}
                      </p>
                    </ContactRow>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs text-muted-foreground font-mono">
                      Typically replies within 24h
                    </span>
                  </div>
                </div>

                {/* Terminal message */}
                <div className="font-mono text-sm bg-background rounded-xl p-5 border border-border">
                  <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-border">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                    <span className="ml-2 text-xs text-muted-foreground">
                      message.sh
                    </span>
                  </div>
                  <div className="space-y-1.5 text-muted-foreground">
                    <p>
                      <span className="text-primary">#!/bin/bash</span>
                    </p>
                    <p>
                      <span className="text-accent">echo</span> "I'm open to"
                    </p>
                    <p>
                      <span className="text-accent">echo</span> "backend roles,"
                    </p>
                    <p>
                      <span className="text-accent">echo</span> "freelance work,"
                    </p>
                    <p>
                      <span className="text-accent">echo</span> "and hard problems."
                    </p>
                    <p className="mt-3">
                      <span className="text-primary">$</span>{" "}
                      <span className="text-foreground">send_message</span>
                      <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-blink align-middle" />
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                {profile?.email && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold group"
                  >
                    <a href={`mailto:${profile.email}`}>
                      <Send className="w-4 h-4 mr-2" />
                      Send a Message
                    </a>
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border hover:border-primary/50 font-semibold group"
                >
                  <a href="#projects">
                    View My Work
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-1">{label}</h3>
        {children}
      </div>
    </div>
  );
}

export default Contact;
