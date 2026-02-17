import { type MouseEvent, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import containerVideo from "../../container.mp4";
import databasesVideo from "../../databases.mp4";
import queryVideo from "../../query.mp4";
import requestsVideo from "../../requests.mp4";
import serviceMapVideo from "../../service_map.mp4";

type ShowcaseMedia = {
  src: string;
  label: string;
  type: "image" | "video";
};

const showcaseMedia: ShowcaseMedia[] = [
  { src: serviceMapVideo, label: "service map", type: "video" },
  { src: containerVideo, label: "container overview", type: "video" },
  { src: requestsVideo, label: "api requests", type: "video" },
  { src: queryVideo, label: "query editor", type: "video" },
  { src: databasesVideo, label: "databases", type: "video" },
];

export function AppShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const getIndexFromClientX = (clientX: number) => {
    const rail = railRef.current;
    if (!rail) return currentIndex;

    const rect = rail.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const ratio = rect.width === 0 ? 0 : x / rect.width;
    const nextIndex = Math.round(ratio * (showcaseMedia.length - 1));
    return Math.min(Math.max(nextIndex, 0), showcaseMedia.length - 1);
  };

  return (
    <div className="pt-20 pb-48 md:pb-56">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative mx-auto max-w-6xl w-full flex flex-col">
          {/* Tab navigation */}
          <motion.div
            className="w-full relative mb-0"
            initial={{ opacity: 0, y: 20, scale: 0.72 }}
            animate={{ opacity: 1, y: 0, scale: [0.72, 1.08, 1] }}
            transition={{ duration: 0.72, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginBottom: "-100px",
              zIndex: 2,
            }}
          >
            <div className="mx-auto max-w-5xl overflow-x-auto">
              <div className="flex justify-center">
                <div
                  ref={railRef}
                  className={`inline-flex min-w-max gap-2 rounded-full border border-black/10 bg-white/45 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm ${
                    isScrubbing ? "cursor-ew-resize" : "cursor-default"
                  }`}
                  onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
                    setIsScrubbing(true);
                    setCurrentIndex(getIndexFromClientX(event.clientX));
                  }}
                  onMouseMove={(event: MouseEvent<HTMLDivElement>) => {
                    if (!isScrubbing) return;
                    setCurrentIndex(getIndexFromClientX(event.clientX));
                  }}
                  onMouseUp={() => setIsScrubbing(false)}
                  onMouseLeave={() => setIsScrubbing(false)}
                >
                  {showcaseMedia.map((media, index) => {
                    const isActive = currentIndex === index;
                    return (
                      <button
                        key={media.label}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative h-12 px-6 rounded-full whitespace-nowrap transition-all duration-300 ${
                          isActive
                            ? "text-black"
                            : "text-black/65 hover:text-black hover:-translate-y-0.5"
                        }`}
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                        aria-pressed={isActive}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-showcase-pill"
                            className="absolute inset-0 rounded-full border border-white/45 shadow-[0_10px_24px_rgba(0,0,0,0.1)]"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 100%)",
                              backdropFilter: "blur(16px) saturate(1.2)",
                              WebkitBackdropFilter: "blur(16px) saturate(1.2)",
                              boxShadow:
                                "inset 0 1px 0 rgba(255,255,255,0.72), inset 0 -1px 0 rgba(255,255,255,0.18), 0 10px 24px rgba(0,0,0,0.1)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 28,
                              mass: 0.9,
                            }}
                          />
                        )}
                        {isActive && (
                          <motion.span
                            layoutId="active-showcase-shine"
                            className="absolute left-3 right-3 top-1 h-4 rounded-full pointer-events-none"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 28,
                              mass: 0.9,
                            }}
                          />
                        )}
                        {isActive && (
                          <motion.span
                            className="absolute inset-y-1.5 w-7 rounded-full pointer-events-none"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 52%, rgba(255,255,255,0) 100%)",
                              filter: "blur(1px)",
                            }}
                            initial={{ x: -18, opacity: 0 }}
                            animate={{ x: 82, opacity: [0, 0.9, 0] }}
                            transition={{ duration: 0.9, ease: "easeInOut" }}
                          />
                        )}
                        <span
                          className={`relative z-10 inline-flex items-center gap-2 ${isActive ? "text-black" : ""}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-black/45" : "bg-black/30"}`}
                          />
                          {media.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Screenshot container - wrapped in a z-index:1 container to stay below tabs */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              className="w-full relative mx-auto max-w-5xl rounded-3xl bg-[#f7f6f3] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.07)] overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.72 }}
              animate={{ opacity: 1, y: 0, scale: [0.72, 1.08, 1] }}
              transition={{
                duration: 0.72,
                delay: 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ minHeight: "600px" }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-2"
                >
                  {showcaseMedia[currentIndex].type === "video" ? (
                    <video
                      src={showcaseMedia[currentIndex].src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={showcaseMedia[currentIndex].label}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <img
                      src={showcaseMedia[currentIndex].src}
                      alt={showcaseMedia[currentIndex].label}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
