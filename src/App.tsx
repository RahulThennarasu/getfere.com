import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { AppShowcase } from "./components/AppShowcase";
import { StackPreview } from "./components/StackPreview";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <Navigation />
      <Hero />
      <AppShowcase />
      <section style={{ paddingTop: "100px", paddingBottom: "300px" }}>
        <StackPreview />
      </section>
      <Footer />
    </div>
  );
}
