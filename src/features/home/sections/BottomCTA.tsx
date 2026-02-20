import { useState } from "react";
import { InstallModal } from "../components/InstallModal";
import appleLogo from "@/assets/apple.png";

export function BottomCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="text-black/40 mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
        >
          ready to try fere?
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-black text-white rounded-lg flex items-center gap-3 mx-auto hover:bg-black/90 transition-colors"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          <img src={appleLogo} alt="Apple" className="h-4 w-auto" />
          Get for Mac
        </button>
      </div>

      <InstallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
