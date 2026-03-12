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

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }

    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isWebKit = /WebKit/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);

    if (!(isIOS && isWebKit)) return;

    let startY = 0;

    const onTouchStart = (event: TouchEvent) => {
      startY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? startY;
      const pullingDown = currentY > startY;
      const pullingUp = currentY < startY;
      const atTop = window.scrollY <= 0;
      const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScrollY <= 0) return;
      const atBottom = window.scrollY >= maxScrollY - 1;

      if ((atTop && pullingDown) || (atBottom && pullingUp)) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f6f3] overflow-x-hidden">
      <Navigation />
      <Hero />
      <AppShowcase />
      <section
        style={{
          paddingTop: isMobile ? "28px" : "40px",
          paddingBottom: isMobile ? "56px" : "620px",
        }}
      >
        <StackPreview />
      </section>
      <Footer />
    </div>
  );
}
