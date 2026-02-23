"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type FlowNodeMotionProps = {
  isInView: boolean;
  delay: number;
};

type DesktopInputNodeProps = FlowNodeMotionProps & {
  x: number;
  y: number;
  label: string;
  icon: LucideIcon;
};

export function DesktopInputNode({
  x,
  y,
  label,
  icon: Icon,
  isInView,
  delay,
}: DesktopInputNodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <rect
        x={x}
        y={y}
        width={150}
        height={44}
        rx={8}
        ry={8}
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />

      <g transform={`translate(${x + 16} ${y + 12})`}>
        <Icon size={20} color="#999999" strokeWidth={1.7} />
      </g>

      <text
        x={x + 44}
        y={y + 27}
        fontFamily="var(--font-inter)"
        fontSize={13}
        fill="#0A0A0A"
        dominantBaseline="middle"
      >
        {label}
      </text>

      <circle cx={x + 153} cy={y + 22} r={3} fill="#D4D4D4" />
    </motion.g>
  );
}

type DesktopOutputNodeProps = FlowNodeMotionProps & {
  x: number;
  y: number;
  order: string;
  label: string;
};

export function DesktopOutputNode({
  x,
  y,
  order,
  label,
  isInView,
  delay,
}: DesktopOutputNodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, x: 10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <path
        d={`M ${x} ${y} L ${x + 160} ${y} L ${x + 180} ${y + 20} L ${x + 160} ${y + 40} L ${x} ${y + 40} Z`}
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />

      <text
        x={x + 20}
        y={y + 25}
        fontFamily="var(--font-inter)"
        fontSize={13}
        fill="#0A0A0A"
        fontWeight={500}
        dominantBaseline="middle"
      >
        {order}.  {label}
      </text>

      <circle cx={x + 180} cy={y + 20} r={3} fill="#D4D4D4" />
    </motion.g>
  );
}

export function DesktopCentralNode({ isInView, delay }: FlowNodeMotionProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={{ transformOrigin: "495px 192px" }}
    >
      <rect
        x={410}
        y={112}
        width={170}
        height={160}
        rx={10}
        ry={10}
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />

      <text
        x={495}
        y={185}
        fontFamily="var(--font-playfair)"
        fontSize={48}
        fill="#0A0A0A"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        ◆
      </text>

      <circle cx={410} cy={192} r={3} fill="#D4D4D4" />
      <circle cx={580} cy={192} r={3} fill="#D4D4D4" />
    </motion.g>
  );
}

export function DesktopResultNode({ isInView, delay }: FlowNodeMotionProps) {
  return (
    <motion.g
      initial={{ opacity: 0, x: 10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <text
        x={1035}
        y={140}
        fontFamily="var(--font-inter)"
        fontSize={11}
        fill="#999999"
        textAnchor="middle"
      >
        Entrega final
      </text>

      <rect
        x={990}
        y={155}
        width={90}
        height={74}
        rx={8}
        ry={8}
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth={1.5}
      />

      <text
        x={1035}
        y={188}
        fontFamily="var(--font-inter)"
        fontSize={12}
        fill="#0A0A0A"
        textAnchor="middle"
        fontWeight={500}
      >
        Tu Página
      </text>
      <text
        x={1035}
        y={206}
        fontFamily="var(--font-inter)"
        fontSize={12}
        fill="#0A0A0A"
        textAnchor="middle"
        fontWeight={500}
      >
        en 48h
      </text>
    </motion.g>
  );
}

type MobileInputNodeProps = FlowNodeMotionProps & {
  x: number;
  y: number;
  label: string;
  icon: LucideIcon;
};

export function MobileInputNode({
  x,
  y,
  label,
  icon: Icon,
  isInView,
  delay,
}: MobileInputNodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, x: -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
    >
      <rect
        x={x}
        y={y}
        width={260}
        height={40}
        rx={8}
        ry={8}
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />

      <g transform={`translate(${x + 14} ${y + 10})`}>
        <Icon size={18} color="#999999" strokeWidth={1.7} />
      </g>

      <text
        x={x + 42}
        y={y + 24}
        fontFamily="var(--font-inter)"
        fontSize={12}
        fill="#0A0A0A"
        dominantBaseline="middle"
      >
        {label}
      </text>
    </motion.g>
  );
}

export function MobileCentralNode({ isInView, delay }: FlowNodeMotionProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      style={{ transformOrigin: "160px 377px" }}
    >
      <rect
        x={85}
        y={322}
        width={150}
        height={110}
        rx={10}
        ry={10}
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />

      <text
        x={160}
        y={377}
        fontFamily="var(--font-playfair)"
        fontSize={42}
        fill="#0A0A0A"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        ◆
      </text>
    </motion.g>
  );
}

type MobileOutputNodeProps = FlowNodeMotionProps & {
  x: number;
  y: number;
  order: string;
  label: string;
};

export function MobileOutputNode({
  x,
  y,
  order,
  label,
  isInView,
  delay,
}: MobileOutputNodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, x: 8 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
    >
      <path
        d={`M ${x} ${y} L ${x + 200} ${y} L ${x + 220} ${y + 18} L ${x + 200} ${y + 36} L ${x} ${y + 36} Z`}
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />

      <text
        x={x + 18}
        y={y + 22}
        fontFamily="var(--font-inter)"
        fontSize={12}
        fill="#0A0A0A"
        fontWeight={500}
        dominantBaseline="middle"
      >
        {order}.  {label}
      </text>
    </motion.g>
  );
}

export function MobileResultNode({ isInView, delay }: FlowNodeMotionProps) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <text
        x={160}
        y={636}
        fontFamily="var(--font-inter)"
        fontSize={11}
        fill="#999999"
        textAnchor="middle"
      >
        Entrega final
      </text>

      <rect
        x={95}
        y={648}
        width={130}
        height={42}
        rx={8}
        ry={8}
        fill="#FAFAFA"
        stroke="#D4D4D4"
        strokeWidth={1.5}
      />

      <text
        x={160}
        y={666}
        fontFamily="var(--font-inter)"
        fontSize={12}
        fill="#0A0A0A"
        textAnchor="middle"
        fontWeight={500}
      >
        Tu Página
      </text>
      <text
        x={160}
        y={682}
        fontFamily="var(--font-inter)"
        fontSize={12}
        fill="#0A0A0A"
        textAnchor="middle"
        fontWeight={500}
      >
        en 48h
      </text>
    </motion.g>
  );
}
