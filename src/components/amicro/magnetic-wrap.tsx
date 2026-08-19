"use client";

import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticWrapProps {
  children: React.ReactNode;
  range?: number;
  strength?: number;
  className?: string;
}

export function MagneticWrap({
  children,
  range = 60,
  strength = 0.3,
  className = '',
}: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.6 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < range) {
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
