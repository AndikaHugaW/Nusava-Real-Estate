"use client";

import { motion, Variants } from "framer-motion";

import { ReactNode } from "react";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
  once = true,
}: RevealTextProps) {
  const words = children.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotate: 2,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {words.map((word, index) => (
        <span
          key={index}
          style={{ overflow: "hidden", display: "inline-block", marginRight: "0.25em" }}
        >
          <motion.span
            variants={child}
            style={{ display: "inline-block" }}
          >
            {word === "" ? "\u00A0" : word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
