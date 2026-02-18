import { useState, useEffect } from "react";
import {
  AppShowcase,
  Footer,
  Hero,
  Navigation,
  StackPreview,
} from "@/features/home";

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <Navigation />
      <Hero />
      <AppShowcase />
      <section
        style={{
          paddingTop: isMobile ? "20px" : "0px",
          paddingBottom: isMobile ? "12px" : "300px",
        }}
      >
        <StackPreview />
      </section>
      <Footer />
    </div>
  );
}
