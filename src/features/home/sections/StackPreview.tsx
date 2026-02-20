import { useRef, useState, useEffect } from "react";
import mobileIcons from "@/assets/mobile_icons.png";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import cloudfare from "@/assets/stack/cloudfare.png";
import docker from "@/assets/stack/docker.png";
import firebase from "@/assets/stack/firebase.png";
import github from "@/assets/stack/github.png";
import k8 from "@/assets/stack/k8.png";
import mongoDB from "@/assets/stack/mongoDB.png";
import openai from "@/assets/stack/openai.png";
import rabbitmq from "@/assets/stack/rabbitmq.png";
import redis from "@/assets/stack/redis.png";
import vercel from "@/assets/stack/vercel.png";
import fereLogo from "@/assets/fere.png";

// Positions from design, compressed toward center for a tight overlapping pile
// Images are pre-rotated so rotate is 0
const logos = [
  // Back layer (rendered first, behind others)
  {
    src: openai,
    label: "OpenAI",
    x: 41,
    y: 15,
    rotate: -23,
    scatterX: -80,
    scatterY: -320,
  },
  {
    src: vercel,
    label: "Vercel",
    x: 69,
    y: 19,
    rotate: -22,
    scatterX: 260,
    scatterY: -300,
  },
  {
    src: docker,
    label: "Docker",
    x: 24,
    y: 23,
    rotate: 0,
    scatterX: -300,
    scatterY: -280,
  },
  // Middle layer
  {
    src: k8,
    label: "Kubernetes",
    x: 56,
    y: 26,
    rotate: -60,
    scatterX: 100,
    scatterY: -180,
  },
  {
    src: rabbitmq,
    label: "RabbitMQ",
    x: 37,
    y: 33,
    rotate: -50,
    scatterX: -200,
    scatterY: 80,
  },
  {
    src: github,
    label: "GitHub",
    x: 77,
    y: 32,
    rotate: -6.6,
    scatterX: 280,
    scatterY: -40,
  },
  // Front layer (rendered last, on top)
  {
    src: cloudfare,
    label: "Cloudflare",
    x: 70,
    y: 44,
    rotate: -52.5,
    scatterX: 250,
    scatterY: 200,
  },
  {
    src: mongoDB,
    label: "MongoDB",
    x: 55,
    y: 43,
    rotate: -18.4,
    scatterX: 140,
    scatterY: 260,
  },
  {
    src: redis,
    label: "Redis",
    x: 26,
    y: 46,
    rotate: 2.14,
    scatterX: -340,
    scatterY: 240,
  },
  {
    src: firebase,
    label: "Firebase",
    x: 40,
    y: 50,
    rotate: -60,
    scatterX: -120,
    scatterY: 300,
  },
];

const CONTAINER_H = 580;

function LogoItem({
  src,
  label,
  x,
  y,
  rotate,
  scatterX,
  scatterY,
  progress,
}: {
  src: string;
  label: string;
  x: number;
  y: number;
  rotate: number;
  scatterX: number;
  scatterY: number;
  progress: MotionValue<number>;
}) {
  // Convert y% to a pixel offset so positioning doesn't depend on container height resolving
  const finalY = (y / 100) * CONTAINER_H;

  // All icons animate together across the full scroll range
  const translateX = useTransform(progress, [0, 1], [scatterX * 1.5, 0]);
  const translateY = useTransform(
    progress,
    [0, 1],
    [scatterY * 1.5 + finalY, finalY],
  );
  // Start with a wild rotation, settle into the final rotation
  const scatterRotate = rotate + (scatterX > 0 ? 45 : -45);
  const rotateVal = useTransform(progress, [0, 1], [scatterRotate, rotate]);
  const opacity = useTransform(progress, [0, 0.72, 0.92, 1], [1, 1, 0, 0]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: 0,
        width: 160,
        height: 160,
        marginLeft: -80,
        marginTop: -80,
        x: translateX,
        y: translateY,
        rotate: rotateVal,
        opacity,
      }}
    >
      <img
        src={src}
        alt={label}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
  );
}

export function StackPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });
  const desktopTextStartOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.9, 1],
    [1, 1, 0, 0],
  );
  const desktopTextEndOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.9, 1],
    [0, 0, 1, 1],
  );
  const desktopFereOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.92, 1],
    [0, 0, 1, 1],
  );
  const mobileStackOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.92, 1],
    [1, 1, 0, 0],
  );
  const mobileFereOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.92, 1],
    [0, 0, 1, 1],
  );

  return (
    <div
      className={isMobile ? "pb-6 px-6" : "pb-20 px-6"}
      style={{ paddingTop: isMobile ? "12px" : "0px" }}
      ref={containerRef}
    >
      <div className="max-w-4xl mx-auto text-center">
        {isMobile ? (
          <div className="mb-3 -mt-6 relative z-10 h-16">
            <motion.p
              className="text-black/40 absolute inset-0"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "28px",
                fontWeight: 400,
                opacity: desktopTextStartOpacity,
                y: -70,
              }}
            >
              your stack, scattered across a dozen tools
            </motion.p>
            <motion.p
              className="text-black/40 absolute inset-0"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "28px",
                fontWeight: 400,
                opacity: desktopTextEndOpacity,
                y: -24,
              }}
            >
              observed by one app
            </motion.p>
          </div>
        ) : (
          <div className="mb-8 relative z-10 h-16">
            <motion.p
              className="text-black/40 absolute inset-0"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "28px",
                fontWeight: 400,
                opacity: desktopTextStartOpacity,
              }}
            >
              your stack, scattered across a dozen tools
            </motion.p>
            <motion.p
              className="text-black/40 absolute inset-0"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "28px",
                fontWeight: 400,
                opacity: desktopTextEndOpacity,
              }}
            >
              observed by one app
            </motion.p>
          </div>
        )}

        {isMobile ? (
          <div className="relative w-full max-w-sm mx-auto mt-2 h-[300px] overflow-hidden">
            <motion.img
              src={mobileIcons}
              alt="Stack icons"
              className="w-full h-full object-cover object-top"
              style={{ opacity: mobileStackOpacity, y: 20 }}
              draggable={false}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: mobileFereOpacity }}
            >
              <img
                src={fereLogo}
                alt="fere logo"
                className="object-contain"
                style={{ width: 88, height: 88 }}
                draggable={false}
              />
            </motion.div>
          </div>
        ) : (
          <div className="relative h-[500px] md:h-[580px] max-w-2xl mx-auto mt-8">
            {logos.map((logo) => (
              <LogoItem key={logo.label} {...logo} progress={scrollYProgress} />
            ))}
            <motion.div
              className="absolute z-20 pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: 200,
                height: 200,
                marginLeft: -100,
                marginTop: 100,
                opacity: desktopFereOpacity,
              }}
            >
              <img
                src={fereLogo}
                alt="fere logo"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
