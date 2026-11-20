"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

const links = [["Our story", "#story"], ["Menu", "#menu"], ["The space", "#space"]];

export function Wordmark() {
  return <span className="wordmark"><span className="wordmark-icon" aria-hidden="true"><i /><i /><i /></span><span><strong>FOUNTAINHEAD</strong><small>CAFÉ &amp; CO-LIVING</small></span></span>;
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return <header className="site-header">
    <div className="nav-inner">
      <a href="#home" aria-label="Fountainhead home" onClick={() => setOpen(false)}><Wordmark /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="button nav-visit" href="#visit">Plan your visit</a>
      <button ref={toggle} type="button" className="mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>
      {open && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -12 }}>
        {[...links, ["Plan your visit", "#visit"]].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </motion.nav>}
    </AnimatePresence>
    {!reduced && <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} />}
  </header>;
}
