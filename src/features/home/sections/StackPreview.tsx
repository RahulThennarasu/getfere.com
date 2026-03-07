import { useRef, useState, useEffect } from "react";
import mobileIcons from "@/assets/mobile_icons.png";
import {
  motion,
  useSpring,
  useMotionTemplate,
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
    x: -70,
    y: -45,
    rotate: -23,
    scatterX: -80,
    scatterY: -320,
  },
  {
    src: vercel,
    label: "Vercel",
    x: 130,
    y: 19,
    rotate: -22,
    scatterX: 150,
    scatterY: -300,
  },
  {
    src: docker,
    label: "Docker",
    x: 0,
    y: 23,
    rotate: 0,
    scatterX: -300,
    scatterY: -280,
  },
  // Middle layer
  {
    src: k8,
    label: "Kubernetes",
    x: 62,
    y: -45,
    rotate: -60,
    scatterX: 500,
    scatterY: -400,
  },
  {
    src: rabbitmq,
    label: "RabbitMQ",
    x: -130,
    y: 33,
    rotate: -50,
    scatterX: -200,
    scatterY: 20,
  },
  {
    src: github,
    label: "GitHub",
    x: 200,
    y: -90,
    rotate: -6.6,
    scatterX: 100,
    scatterY: -100,
  },
  // Front layer (rendered last, on top)
  {
    src: cloudfare,
    label: "Cloudflare",
    x: 225,
    y: 200,
    rotate: -52.5,
    scatterX: 160,
    scatterY: 200,
  },
  {
    src: mongoDB,
    label: "MongoDB",
    x: 250,
    y: 50,
    rotate: -18.4,
    scatterX: 150,
    scatterY: 260,
  },
  {
    src: redis,
    label: "Redis",
    x: 150,
    y: 200,
    rotate: 2.14,
    scatterX: -340,
    scatterY: 240,
  },
  {
    src: firebase,
    label: "Firebase",
    x: -40,
    y: 50,
    rotate: -60,
    scatterX: -120,
    scatterY: 400,
  },
];

const CONTAINER_H = 580;
const FERE_SIZE = 170;
const FERE_TOP_OFFSET = 72;

function LogoItem({
  src,
  label,
  x,
  y,
  rotate,
  scatterX,
  scatterY,
  containerWidth,
  progress,
}: {
  src: string;
  label: string;
  x: number;
  y: number;
  rotate: number;
  scatterX: number;
  scatterY: number;
  containerWidth: number;
  progress: MotionValue<number>;
}) {
  // Convert y% to a pixel offset so positioning doesn't depend on container height resolving
  const finalY = (y / 100) * CONTAINER_H;
  const centerXShift =
    containerWidth > 0 ? ((50 - x) / 100) * containerWidth : 0;
  const centerY = FERE_TOP_OFFSET + FERE_SIZE / 2;

  // One direct path into the center target.
  const translateX = useTransform(
    progress,
    [0, 1],
    [scatterX * 1.5, centerXShift],
  );
  const translateY = useTransform(
    progress,
    [0, 1],
    [scatterY * 1.5 + finalY, centerY],
  );
  // Rotate while moving, then settle to the same final angle.
  const scatterRotate = rotate + (scatterX > 0 ? 45 : -45);
  const rotateVal = useTransform(
    progress,
    [0, 0.72, 1],
    [scatterRotate, rotate, -33],
  );
  // Keep full visibility longer, then do a cleaner end fade.
  const opacity = useTransform(progress, [0, 0.88, 0.97, 1], [1, 1, 0.2, 0]);
  const scale = useTransform(progress, [0, 0.9, 1], [1, 1, 0.84]);
  const blurPx = useTransform(progress, [0, 0.92, 1], [0, 0, 8]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
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
        scale,
        opacity,
        filter,
      }}
    >
      <img
        src={src}
        alt={label}
        className="w-full h-full object-contain"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}

export function StackPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopStackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [desktopStackWidth, setDesktopStackWidth] = useState(0);

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
    if (isMobile) return;

    const updateWidth = () => {
      const rect = desktopStackRef.current?.getBoundingClientRect();
      if (!rect) return;
      setDesktopStackWidth(rect.width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isMobile]);

  // Force Framer Motion to recalculate scroll measurements after fonts load.
  // Google Fonts loads async and shifts layout, making useScroll cache wrong positions.
  useEffect(() => {
    document.fonts.ready.then(() => {
      window.dispatchEvent(new Event("resize"));
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    mass: 0.7,
  });
  const desktopTextStartOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.74, 0.94, 1],
    [1, 1, 0, 0],
  );
  const desktopTextEndOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.74, 0.94, 1],
    [0, 0, 1, 1],
  );
  const desktopFereOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.76, 0.95, 1],
    [0, 0, 1, 1],
  );
  const mobileStackOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.76, 0.95, 1],
    [1, 1, 0, 0],
  );
  const mobileFereOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.76, 0.95, 1],
    [0, 0, 1, 1],
  );

  return (
    <div
      className={isMobile ? "pb-14 px-6" : "pb-28 px-6"}
      style={{ paddingTop: isMobile ? "28px" : "36px" }}
      ref={containerRef}
    >
      <div className="max-w-4xl mx-auto text-center">
        {isMobile ? (
          <div className="mb-10 mt-2 relative z-10 h-16">
            <motion.p
              className="text-black absolute inset-0"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "28px",
                fontWeight: 400,
                opacity: desktopTextStartOpacity,
                y: -48,
              }}
            >
              your stack, scattered across a dozen tools
            </motion.p>
            <motion.p
              className="text-black absolute inset-0"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "28px",
                fontWeight: 400,
                opacity: desktopTextEndOpacity,
                y: -48,
              }}
            >
              observed by one app
            </motion.p>
          </div>
        ) : (
          <div className="mb-24 mt-6 relative z-10 h-16">
            <motion.p
              className="text-black absolute inset-0"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "28px",
                fontWeight: 400,
                opacity: desktopTextStartOpacity,
                y: -120,
              }}
            >
              your stack, scattered across a dozen tools
            </motion.p>
            <motion.p
              className="text-black absolute inset-0"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "28px",
                fontWeight: 400,
                opacity: desktopTextEndOpacity,
                y: -120,
              }}
            >
              observed by one app
            </motion.p>
          </div>
        )}

        {isMobile ? (
          <div className="relative w-full max-w-sm mx-auto mt-6 h-[300px] overflow-hidden">
            <motion.img
              src={mobileIcons}
              alt="Stack icons"
              className="w-full h-full object-cover object-top"
              style={{ opacity: mobileStackOpacity, y: 20 }}
              draggable={false}
              loading="lazy"
              decoding="async"
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
          <div
            ref={desktopStackRef}
            className="relative h-[500px] md:h-[580px] max-w-4xl mx-auto mt-6"
          >
            {logos.map((logo, index) => (
              <LogoItem
                key={logo.label}
                {...logo}
                containerWidth={desktopStackWidth}
                progress={smoothScrollProgress}
              />
            ))}
            <motion.div
              className="absolute z-20 pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: 170,
                height: 170,
                marginLeft: -85,
                marginTop: 72,
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
