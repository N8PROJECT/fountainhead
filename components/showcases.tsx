"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { gallery, menu } from "../lib/brand";
import { ease } from "./motion";
import { useReducedMotion } from "./use-reduced-motion";

const categories = ["Kitchen", "Coffee", "Sweet"] as const;
const menuImages = { Kitchen: "/images/katsu.webp", Coffee: "/images/coffee.webp", Sweet: "/images/pastry.webp" };

export function MenuShowcase() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Kitchen");
  const reduced = useReducedMotion();
  return <div className="menu-grid">
    <figure className="menu-photo">
      <AnimatePresence initial={false}>
        <motion.div key={category} className="media-fill" initial={reduced ? false : { opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.5, ease }}>
          <Image src={menuImages[category]} alt="" fill sizes="(max-width: 760px) 90vw, 44vw" />
        </motion.div>
      </AnimatePresence>
    </figure>
    <div className="menu-content">
      <LayoutGroup id="menu-category">
        <div className="menu-filters" role="group" aria-label="Menu categories">
          {categories.map((item) => <motion.button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} whileTap={reduced ? undefined : { scale: 0.96 }}>
            {category === item && <motion.span className="filter-active" layoutId={reduced ? undefined : "active"} transition={{ type: "spring", stiffness: 340, damping: 31 }} />}
            <span>{item}</span>
          </motion.button>)}
        </div>
      </LayoutGroup>
      <div className="menu-items" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <motion.ul key={category} initial={reduced ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
            {menu[category].map(({ name, detail }) => <li key={name}><span>{name}</span><small>{detail}</small></li>)}
          </motion.ul>
        </AnimatePresence>
      </div>
      <p className="small-note">Menu highlights. Availability may vary.</p>
    </div>
  </div>;
}

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const change = (step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + gallery.length) % gallery.length);
  };
  const current = gallery[index];
  return <div className="gallery" role="region" aria-label="Café gallery" onKeyDown={(event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      change(event.key === "ArrowLeft" ? -1 : 1);
    }
  }}>
    <div className="gallery-image">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div key={current.src} className="media-fill" custom={direction}
          variants={{ in: (step: number) => ({ x: reduced ? 0 : step * 34, opacity: 0 }), show: { x: 0, opacity: 1 }, out: (step: number) => ({ x: reduced ? 0 : -step * 34, opacity: 0 }) }}
          initial={reduced ? false : "in"} animate="show" exit="out" transition={{ duration: reduced ? 0 : 0.55, ease }}
          drag={reduced ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12}
          onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 50) change(info.offset.x < 0 ? 1 : -1); }}>
          <Image src={current.src} alt={current.alt} fill sizes="(max-width: 760px) 90vw, 65vw" draggable={false} />
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="gallery-controls">
      <p aria-live="polite">{current.label}</p>
      <div>
        <motion.button type="button" aria-label="Previous photo" onClick={() => change(-1)} whileTap={reduced ? undefined : { scale: 0.92 }}><ChevronLeft size={20} /></motion.button>
        <motion.button type="button" aria-label="Next photo" onClick={() => change(1)} whileTap={reduced ? undefined : { scale: 0.92 }}><ChevronRight size={20} /></motion.button>
      </div>
    </div>
  </div>;
}
