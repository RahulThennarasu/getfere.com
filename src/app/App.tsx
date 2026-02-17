import {
  AppShowcase,
  Footer,
  Hero,
  Navigation,
  StackPreview,
} from "@/features/home";

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
