import { useRef } from "react";
import { useMobile } from "@/hooks/useMobile";
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

// Positions from design, compressed toward center for a tight overlapping pile
// Images are pre-rotated so rotate is 0
const logos = [
  // Back layer (rendered first, behind others)
  {
    src: openai,
    label: "OpenAI",
    x: 41,
    y: 10,
    rotate: -23,
    scatterX: -80,
    scatterY: -320,
  },
  {
    src: vercel,
    label: "Vercel",
    x: 69,
    y: 14,
    rotate: -22,
    scatterX: 260,
    scatterY: -300,
  },
  {
    src: docker,
    label: "Docker",
    x: 24,
    y: 18,
    rotate: 0,
    scatterX: -350,
    scatterY: -280,
  },
  // Middle layer
  {
    src: k8,
    label: "Kubernetes",
    x: 56,
    y: 21,
    rotate: -60,
    scatterX: 100,
    scatterY: -180,
  },
  {
    src: rabbitmq,
    label: "RabbitMQ",
    x: 37,
    y: 28,
    rotate: -50,
    scatterX: -200,
    scatterY: 80,
  },
  {
    src: github,
    label: "GitHub",
    x: 77,
    y: 27,
    rotate: -6.6,
    scatterX: 340,
    scatterY: -40,
  },
  // Front layer (rendered last, on top)
  {
    src: cloudfare,
    label: "Cloudflare",
    x: 70,
    y: 39,
    rotate: -52.5,
    scatterX: 380,
    scatterY: 200,
  },
  {
    src: mongoDB,
    label: "MongoDB",
    x: 55,
    y: 38,
    rotate: -18.4,
    scatterX: 140,
    scatterY: 260,
  },
  {
    src: redis,
    label: "Redis",
    x: 26,
    y: 41,
    rotate: 2.14,
    scatterX: -340,
    scatterY: 240,
  },
  {
    src: firebase,
    label: "Firebase",
    x: 40,
    y: 45,
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
  scale,
}: {
  src: string;
  label: string;
  x: number;
  y: number;
  rotate: number;
  scatterX: number;
  scatterY: number;
  progress: MotionValue<number>;
  scale: number;
}) {
  const size = 160 * scale;
  const finalY = (y / 100) * CONTAINER_H;

  // All icons animate together across the full scroll range
  const translateX = useTransform(progress, [0, 1], [scatterX * 1.5 * scale, 0]);
  const translateY = useTransform(
    progress,
    [0, 1],
    [scatterY * 1.5 * scale + finalY, finalY],
  );
  // Start with a wild rotation, settle into the final rotation
  const scatterRotate = rotate + (scatterX > 0 ? 45 : -45);
  const rotateVal = useTransform(progress, [0, 1], [scatterRotate, rotate]);
  const opacity = 1;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: 0,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
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
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const logoScale = isMobile ? 0.55 : 1;

  return (
    <div className="pt-20 pb-20 px-6" ref={containerRef}>
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="text-black/40 mb-8 relative z-10"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: isMobile ? "20px" : "28px",
            fontWeight: 400,
          }}
        >
          your stack, scattered across a dozen tools
        </p>

        <div className="relative h-[500px] md:h-[580px] max-w-2xl mx-auto mt-8">
          {logos.map((logo) => (
            <LogoItem key={logo.label} {...logo} progress={scrollYProgress} scale={logoScale} />
          ))}
        </div>
      </div>
    </div>
  );
}
