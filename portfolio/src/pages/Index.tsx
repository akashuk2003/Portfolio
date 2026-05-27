import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SignalBar from "@/components/SignalBar";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SignalBar />
        <Projects />
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
