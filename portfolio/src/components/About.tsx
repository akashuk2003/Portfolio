const About = () => {
  const stats = [
    { value: "7+", label: "Years Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "99.9%", label: "Uptime Achieved" },
    { value: "10M+", label: "Requests/Day Handled" },
  ];

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
                <p>
                  I'm a backend engineer who loves the challenge of building systems 
                  that work flawlessly at scale. From designing database schemas to 
                  architecting microservices, I focus on creating infrastructure 
                  that's reliable, maintainable, and performant.
                </p>
                <p>
                  My journey started with a fascination for how things work under 
                  the hood. That curiosity led me through distributed systems, 
                  real-time data processing, and security engineering — always 
                  seeking to understand the fundamentals.
                </p>
                <p>
                  When I'm not optimizing queries or debugging race conditions, 
                  you'll find me contributing to open source, writing technical 
                  blogs, or exploring new programming paradigms.
                </p>
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
                  <p className="text-muted-foreground pl-2">backend_developer | system_architect</p>
                  <p><span className="text-muted-foreground">$</span> <span className="text-primary">location</span></p>
                  <p className="text-muted-foreground pl-2">San Francisco, CA (Remote OK)</p>
                  <p><span className="text-muted-foreground">$</span> <span className="text-primary">interests</span></p>
                  <p className="text-muted-foreground pl-2">distributed_systems, performance, open_source</p>
                </div>
              </div>
            </div>

            {/* Right column - Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
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
