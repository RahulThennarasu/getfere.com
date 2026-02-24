import { useState } from "react";
import { motion } from "motion/react";
import { InstallModal } from "../components/InstallModal";
import appleLogo from "@/assets/apple.png";
import { triggerMacDownload } from "@/config/download";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDownload = () => {
    triggerMacDownload();
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-black/80"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "72px",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: "1.1",
          }}
        >
          <span className="inline-flex items-center justify-center">
            <motion.span
              className="inline-block whitespace-pre"
              initial={{
                opacity: 0,
                x: -140,
                y: -24,
                scale: 0.6,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: [0.6, 1.12, 1],
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              see{" "}
            </motion.span>
            <motion.span
              className="inline-block whitespace-pre"
              initial={{
                opacity: 0,
                x: 140,
                y: -24,
                scale: 0.6,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: [0.6, 1.12, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.75,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              everything,
            </motion.span>
          </span>
          <br />
          <span className="inline-flex items-center justify-center">
            <motion.span
              className="inline-block whitespace-pre"
              initial={{
                opacity: 0,
                x: -100,
                y: 48,
                scale: 0.7,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: [0.7, 1.1, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.72,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              not{" "}
            </motion.span>
            <motion.span
              className="inline-block whitespace-pre"
              initial={{ opacity: 0, y: 68, scale: 0.72, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [0.72, 1.1, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.72,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              just{" "}
            </motion.span>
            <motion.span
              className="inline-block whitespace-pre"
              initial={{
                opacity: 0,
                x: 110,
                y: 48,
                scale: 0.72,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: [0.72, 1.1, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.72,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              your{" "}
            </motion.span>
            <motion.span
              className="inline-block whitespace-pre"
              initial={{
                opacity: 0,
                x: 150,
                y: 48,
                scale: 0.72,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: [0.72, 1.1, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.72,
                delay: 0.34,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              code
            </motion.span>
          </span>
        </motion.h1>

        <motion.button
          onClick={handleDownload}
          className="mt-8 px-5 py-2.5 bg-black text-white rounded-lg flex items-center gap-3 mx-auto hover:bg-black/90 transition-colors"
          initial={{ opacity: 0, y: 20, scale: 0.72 }}
          animate={{ opacity: 1, y: 0, scale: [0.72, 1.08, 1] }}
          transition={{ duration: 0.72, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          <img src={appleLogo} alt="Apple" className="h-4 w-auto" />
          Get for Mac
        </motion.button>
      </div>

      <InstallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
