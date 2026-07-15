import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { fetchProfile } from "@/lib/api";
import { ModeToggle } from "./ModeToggle";

const navLinks = [
  { href: "#tech", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  // Extract name for logo display (first name or full name)
  const displayName = profile?.name?.split(' ')[0]?.toLowerCase() ?? null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "py-4 bg-background/80 backdrop-blur-lg border-b border-border"
          : "py-6 bg-transparent"
        }`}
    >
      <div className="container px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            {displayName !== null ? (
              <span className="font-mono font-bold text-base tracking-tight">
                <span className="text-primary">{`{`}</span>
                <span className="text-foreground">
                  {profile?.name
                    ?.split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .toLowerCase() ?? displayName}
                </span>
                <span className="text-primary">{`}`}</span>
              </span>
            ) : (
              <span className="w-10 h-5 rounded bg-muted animate-pulse inline-block" />
            )}
          </a>

          {/* Desktop Nav */}
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button variant="hero" size="sm" asChild>
                <a href="#contact">Let's Talk</a>
              </Button>
            </nav>

            <ModeToggle />

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="hero" size="sm" asChild className="w-full mt-2">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Let's Talk
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
