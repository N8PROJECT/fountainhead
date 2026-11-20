import Image from "next/image";
import { Camera, Clock3, MapPin, Phone } from "lucide-react";
import { Hero, MagneticLink, Reveal } from "../components/motion";
import { Navigation, Wordmark } from "../components/navigation";
import { Gallery, MenuShowcase } from "../components/showcases";
import { instagram, maps, phone } from "../lib/brand";

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Navigation />
    <main id="main">
      <Hero image={<Image src="/images/hero.webp" alt="" fill sizes="100vw" preload />} />

      <section id="story" className="story shell">
        <div className="story-copy">
          <p className="eyebrow section-label"><span /> THE FOUNTAINHEAD STORY</p>
          <Reveal><h2>A place to<br /><em>stay awhile.</em></h2></Reveal>
          <p>On a quiet street in Meruya Utara, white arches open onto a café for slow coffee, long lunches, and conversations that run a little longer than planned.</p>
          <p>Fountainhead has been part of the neighborhood since 2021. The ground-floor café welcomes everyone, and the floors above were designed as a home for co-living residents.</p>
          <a className="text-link" href="#space">Get to know the space</a>
        </div>
        <figure className="story-photo">
          <div><Image src="/images/interior.webp" alt="Illustration of the café interior with arched windows and timber furniture" fill sizes="(max-width: 760px) 88vw, 44vw" /></div>
          <figcaption>Modern-classic lines, warm light, and room to settle in.</figcaption>
        </figure>
      </section>

      <section id="menu" className="menu-section">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow section-label"><span /> THE MENU</p><Reveal><h2>From <em>our table.</em></h2></Reveal></div>
            <p>Brunch favorites, comforting plates, and coffee worth making time for.</p>
          </div>
          <MenuShowcase />
        </div>
      </section>

      <section id="space" className="space shell">
        <div className="space-copy">
          <p className="eyebrow section-label"><span /> THE SPACE</p>
          <Reveal><h2>Under<br />the <em>arches.</em></h2></Reveal>
          <p>Bring a book, open your laptop, or pull up a chair with friends. There’s indoor seating, a terrace, and a private room for small gatherings.</p>
          <a className="text-link" href={phone}>Ask about the private room</a>
        </div>
        <Gallery />
      </section>

      <section id="visit" className="visit">
        <div className="shell visit-grid">
          <div>
            <p className="eyebrow section-label"><span /> COME BY</p>
            <Reveal><h2>See you<br /><em>in Meruya.</em></h2></Reveal>
            <MagneticLink className="button button-accent" href={maps}>Get directions</MagneticLink>
          </div>
          <address>
            <div><MapPin /><div><h3>Find us</h3><p>Jl. Masjid Al Ihsan No. 6 Blok 38, RT 02/RW 10<br />Meruya Utara, Kembangan, Jakarta Barat 11620</p></div></div>
            <div><Clock3 /><div><h3>Opening hours</h3><p>Every day · 09.00–21.00 WIB</p></div></div>
            <div><Phone /><div><h3>Get in touch</h3><a href={phone}>0856-7892-823</a></div></div>
          </address>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="shell footer-inner">
        <a href="#home" aria-label="Fountainhead home"><Wordmark /></a>
        <p>Illustrative imagery inspired by Fountainhead.</p>
        <a href={instagram} className="social"><Camera size={18} aria-hidden="true" /> @fountainhead.co</a>
      </div>
    </footer>
  </>;
}
