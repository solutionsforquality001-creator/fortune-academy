import { useRevealObserver } from "@/hooks/useMotion";
import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import { About, StatsBand } from "@/components/About";
import Programmes from "@/components/Programmes";
import Path from "@/components/Path";
import Markets from "@/components/Markets";
import Testimonials from "@/components/Testimonials";
import Desk from "@/components/Desk";
import JoinFlow from "@/components/JoinFlow";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";

export default function App() {
  useRevealObserver();

  return (
    <div className="relative min-h-screen bg-ink-900 font-body antialiased">
      <Nav />

      <main>
        <div className="pt-[66px] lg:pt-[100px]">
          <Ticker />
        </div>

        <Hero />
        <StatsBand />
        <About />
        <Programmes />
        <Path />
        <Markets />
        <Testimonials />
        <Desk />
        <JoinFlow />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <FloatingDock />
    </div>
  );
}
