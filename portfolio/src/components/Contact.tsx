import { Button } from "@/components/ui/button";
import { Mail, Send, MapPin, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm mb-4 block">
              {"// Let's Connect"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Got a Project in Mind?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              I'm always interested in hearing about new opportunities, 
              challenging projects, or just chatting about tech.
            </p>
          </div>

          {/* Contact card */}
          <div className="relative p-8 md:p-12 rounded-2xl bg-card border border-border border-glow overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Contact info */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:alex@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                        alex@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        San Francisco, CA (Remote OK)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Availability</h3>
                      <p className="text-muted-foreground">
                        Open for freelance & full-time roles
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick message */}
                <div className="font-mono text-sm bg-background rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                    <div className="w-3 h-3 rounded-full bg-destructive/80" />
                    <div className="w-3 h-3 rounded-full bg-syntax-yellow" />
                    <div className="w-3 h-3 rounded-full bg-terminal-green" />
                    <span className="text-xs text-muted-foreground ml-2">new_message.sh</span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p><span className="text-primary">#!/bin/bash</span></p>
                    <p><span className="text-syntax-pink">echo</span> "Looking forward to"</p>
                    <p><span className="text-syntax-pink">echo</span> "building something"</p>
                    <p><span className="text-syntax-pink">echo</span> "great together!"</p>
                    <p className="mt-4">
                      <span className="text-primary">$</span> <span className="text-terminal-green">send_message</span>
                      <span className="inline-block w-2 h-4 bg-primary ml-1 animate-blink" />
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <a href="mailto:alex@example.com">
                    <Send className="w-4 h-4 mr-2" />
                    Send a Message
                  </a>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <a href="#" download>
                    Download Resume
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

export default Contact;
