import { useQuery } from "@tanstack/react-query";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { fetchSocialLinks, fetchProfile } from "@/lib/api";
import type { SocialLink } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

const Footer = () => {
  const { data: socialLinks } = useQuery({
    queryKey: ['socialLinks'],
    queryFn: fetchSocialLinks,
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  // Extract name for logo display (first name or full name)
  const displayName = profile?.name?.split(' ')[0]?.toLowerCase() ?? null;

  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <a href="#" className="font-mono font-bold text-base tracking-tight">
              {displayName !== null ? (
                <>
                  <span className="text-primary">{`{`}</span>
                  <span className="text-foreground">
                    {profile?.name
                      ?.split(" ")
                      .map((w: string) => w[0])
                      .join("")
                      .toLowerCase() ?? displayName}
                  </span>
                  <span className="text-primary">{`}`}</span>
                </>
              ) : null}
            </a>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks?.map((link: SocialLink) => {
                const Icon = iconMap[link.platform];
                if (!Icon) return null;

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.platform !== 'email' ? "_blank" : undefined}
                    rel={link.platform !== 'email' ? "noopener noreferrer" : undefined}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground font-mono">
              © {new Date().getFullYear()} <span className="text-primary">{displayName}.dev</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
