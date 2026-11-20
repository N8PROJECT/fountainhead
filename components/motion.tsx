"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <div className={className} style={{ overflow: "clip" }}>
    <motion.div className="section-reveal" initial={reduced ? false : { y: 30 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }}>{children}</motion.div>
  </div>;
}

export function Hero({ image }: { image: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return <section ref={ref} id="home" className="hero" aria-labelledby="hero-title">
    <motion.div className="hero-image" style={{ y: reduced ? 0 : y }} initial={reduced ? false : { scale: 1.07 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease }}>{image}</motion.div>
    <div className="hero-shade" />
    <div className="hero-content">
      <motion.div initial={reduced ? false : "hidden"} animate="show" variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.13 } } }}>
        <HeroLine><p className="eyebrow"><span /> MERUYA · WEST JAKARTA</p></HeroLine>
        <h1 id="hero-title"><motion.span className="hero-line"><motion.span className="block" variants={heroLine}>Make yourself</motion.span></motion.span><motion.span className="hero-line"><motion.span className="block" variants={heroLine}><em>at home.</em></motion.span></motion.span></h1>
        <HeroLine><p className="hero-description">Coffee, brunch and good company.<br />Under the arches in Meruya.</p></HeroLine>
        <HeroLine><MagneticLink href="#menu" className="button button-accent">Explore the menu</MagneticLink></HeroLine>
      </motion.div>
    </div>
    <a className="hero-scroll eyebrow" href="#story"><i /> Scroll to explore</a>
    <span className="hero-note">Illustrative imagery</span>
  </section>;
}

const heroLine = { hidden: { y: "105%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } } };

function HeroLine({ children }: { children: React.ReactNode }) {
  return <div className="hero-line"><motion.div variants={heroLine}>{children}</motion.div></div>;
}

export function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 23 });
  const springY = useSpring(y, { stiffness: 220, damping: 23 });
  return <motion.a href={href} className={className} style={{ x: springX, y: springY }}
    whileTap={reduced ? undefined : { scale: 0.97 }}
    onPointerMove={(event) => {
      if (reduced || event.pointerType !== "mouse") return;
      const box = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - box.left - box.width / 2) * 0.13);
      y.set((event.clientY - box.top - box.height / 2) * 0.2);
    }}
    onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.a>;
}
