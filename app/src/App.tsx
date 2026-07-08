import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll, scrollToId } from "./components/site/SmoothScroll";
import { Nav } from "./components/site/Nav";
import { FilmVideo } from "./components/site/FilmVideo";

// Custom CTA Garment 1: Corner Brackets Reveal
function BookingButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden px-8 py-4 font-display text-[15px] font-bold tracking-wider text-siteink uppercase transition-all duration-300"
    >
      {/* Corner brackets */}
      <span className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-siteaccent transition-all duration-300 group-hover:h-4 group-hover:w-4" />
      <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-siteaccent transition-all duration-300 group-hover:h-4 group-hover:w-4" />
      <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-siteaccent transition-all duration-300 group-hover:h-4 group-hover:w-4" />
      <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-siteaccent transition-all duration-300 group-hover:h-4 group-hover:w-4" />
      
      <span className="relative z-10 block transition-transform duration-300 group-hover:scale-105 group-hover:text-siteaccent">
        {label}
      </span>
    </button>
  );
}

// Custom CTA Garment 2: Magnetic Glass Capsule (for WhatsApp deep links)
function WhatsAppCapsule({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-siteink/10 bg-sitesurface/40 px-6 py-3 font-display text-[14px] font-semibold text-siteink backdrop-blur-sm transition-all duration-300 hover:border-siteaccent/40 hover:bg-sitesurface/80 hover:text-siteaccent hover:shadow-lg hover:shadow-siteaccent/5"
    >
      <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
      {label}
    </a>
  );
}

// Custom CTA Garment 3: Block Fill From Left (for phone numbers)
function PhoneFillButton({ label, tel }: { label: string; tel: string }) {
  return (
    <a
      href={`tel:${tel}`}
      className="group relative inline-block cursor-pointer overflow-hidden border border-siteink/20 px-7 py-3.5 font-display text-[15px] font-bold tracking-tight text-siteink transition-colors duration-300 hover:text-siteground"
    >
      {/* Slide overlay */}
      <span className="absolute inset-y-0 left-0 -z-10 w-0 bg-siteaccent transition-all duration-300 ease-out group-hover:w-full" />
      <span className="relative z-10 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        {label}
      </span>
    </a>
  );
}

export default function App() {
  const [reduced, setReduced] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Hero canvas scrub refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroWrapRef = useRef<HTMLDivElement | null>(null);

  // Space chapter scale scrub ref
  const chapterWrapRef = useRef<HTMLDivElement | null>(null);
  const chapterVideoRef = useRef<HTMLDivElement | null>(null);

  // Master Artistry scale scrub ref
  const artistryWrapRef = useRef<HTMLDivElement | null>(null);
  const artistryVideoRef = useRef<HTMLDivElement | null>(null);

  // Custom Gem Image Ref
  const gemImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Detect reduced motion settings
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Canvas Frame Scrub Effect (Hero B)
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const wrap = heroWrapRef.current;
    if (!canvas || !wrap) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    gsap.registerPlugin(ScrollTrigger);
    const FRAME_COUNT = 120;
    const src = (i: number) => `/frames/hero/f_${String(i + 1).padStart(3, "0")}.jpg`;
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let current = 0;
    let disposed = false;

    const draw = (index: number) => {
      let img: HTMLImageElement | null = null;
      for (let i = index; i >= 0; i--) {
        const c = images[i];
        if (c && c.complete && c.naturalWidth > 0) {
          img = c;
          break;
        }
      }
      if (!img) {
        for (let i = index + 1; i < FRAME_COUNT; i++) {
          const c = images[i];
          if (c && c.complete && c.naturalWidth > 0) {
            img = c;
            break;
          }
        }
      }
      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.round(canvas.clientWidth * dpr);
      const ch = Math.round(canvas.clientHeight * dpr);
      if (!cw || !ch) return;

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }

      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      ctx2d.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const load = (i: number, done?: () => void) => {
      if (images[i]) return;
      const img = new Image();
      const fin = () => {
        if (!disposed && done) done();
      };
      img.onload = fin;
      img.onerror = fin;
      img.src = src(i);
      images[i] = img;
    };

    const order: number[] = [];
    const seen = new Set<number>();
    for (const stride of [8, 4, 2, 1]) {
      for (let i = 0; i < FRAME_COUNT; i += stride) {
        if (!seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      }
    }

    let cursor = 0;
    let inFlight = 0;
    const pump = () => {
      if (disposed) return;
      while (cursor < order.length && inFlight < 6) {
        const idx = order[cursor++];
        if (images[idx]) continue;
        inFlight++;
        load(idx, () => {
          inFlight--;
          if (Math.abs(idx - current) < 4) draw(current);
          pump();
        });
      }
    };

    load(0, () => draw(0));
    pump();

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(self.progress * (FRAME_COUNT - 1))));
        if (idx !== current) {
          current = idx;
          draw(idx);
        }
      },
    });

    const onResize = () => draw(current);
    window.addEventListener("resize", onResize);
    draw(0);

    return () => {
      disposed = true;
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  // Space Chapter Video scale and parallax effect
  useEffect(() => {
    if (reduced) return;
    const wrap = chapterWrapRef.current;
    const target = chapterVideoRef.current;
    if (!wrap || !target) return;

    gsap.registerPlugin(ScrollTrigger);

    const scaleTween = gsap.fromTo(target, 
      { scale: 1.16, yPercent: -8 },
      {
        scale: 1.03,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      }
    );

    return () => {
      scaleTween.scrollTrigger?.kill();
      scaleTween.kill();
    };
  }, [reduced]);

  // Master Artistry Video scale effect
  useEffect(() => {
    if (reduced) return;
    const wrap = artistryWrapRef.current;
    const target = artistryVideoRef.current;
    if (!wrap || !target) return;

    gsap.registerPlugin(ScrollTrigger);

    const scaleTween = gsap.fromTo(target, 
      { scale: 1.15 },
      {
        scale: 1.0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      }
    );

    return () => {
      scaleTween.scrollTrigger?.kill();
      scaleTween.kill();
    };
  }, [reduced]);

  // Custom Gem Image scale effect
  useEffect(() => {
    if (reduced) return;
    const target = gemImageRef.current;
    if (!target) return;

    gsap.registerPlugin(ScrollTrigger);

    const scaleTween = gsap.fromTo(target, 
      { scale: 1.12, y: 20 },
      {
        scale: 1.0,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      }
    );

    return () => {
      scaleTween.scrollTrigger?.kill();
      scaleTween.kill();
    };
  }, [reduced]);

  // Global scroll entry animations for headings
  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.toArray("section");
    const triggers: any[] = [];

    elements.forEach((sec: any) => {
      const header = sec.querySelector("h2");
      const sub = sec.querySelector("span");
      const desc = sec.querySelector("p");

      if (!header) return;

      const trigger = gsap.fromTo([sub, header, desc].filter(Boolean),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(t => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [reduced]);

  const accordionItems = [
    {
      title: "Bespoke Aesthetic Blueprint",
      text: "A comprehensive digital planning workflow. We map your facial lines and design unique architectural templates, ensuring each veneer shell aligns with your features before ceramic layers are fired.",
      steps: ["3D Facial Scan Mapping", "Aesthetic Proportion Analysis", "Diagnostic Wax-Up Trial"],
      longevity: "N/A (Diagnostic)",
      link: "https://wa.me/15559876543?text=I%20want%20to%20know%20more%20about%20Bespoke%20Aesthetic%20Blueprint",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-siteaccent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1" />
          <path d="M7 9c2.5 4 7.5 4 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12h2M16 12h2M12 6v2M12 16v2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: "Jewelry-Grade Ceramic Layering",
      text: "Crafted like custom gems. Our master ceramists build veneers shell-by-shell with custom feldspathic ceramic, creating the depth, warmth, and natural transparency of high-end diamonds.",
      steps: ["Feldspathic Micro-Layering", "Custom Luster Hand-Polishing", "Light Reflection Tuning"],
      longevity: "15 to 20 Years",
      link: "https://wa.me/15559876543?text=I%20want%20to%20know%20more%20about%20Jewelry-Grade%20Ceramic%20Layering",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-siteaccent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 3h12l4 6-10 12L2 9z" strokeLinejoin="round" />
          <path d="M11 9L6 3M13 9l5-6M12 21L6 9M12 21l6-12M2 9h20" />
          <path d="M19 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      title: "Micro-Precision Dental Restorations",
      text: "Applying fine watchmaking tolerance. We refine veneer margins under microscopic magnification, ensuring perfect gum health, structural durability, and seamless interfaces.",
      steps: ["Microscope Margin Refinement", "Sub-Gingival Sealing", "High-Bond Adhesive Cure"],
      longevity: "15+ Years",
      link: "https://wa.me/15559876543?text=I%20want%20to%20know%20more%20about%20Micro-Precision%20Dental%20Restorations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-siteaccent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v20M2 12h20" strokeLinecap="round" />
          <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  const faqItems = [
    {
      q: "How long does the veneer process take?",
      a: "Typically, the process requires two to three visits over a three-week period. This allows time for digital smile design, temporary trial veneers, and master ceramic fabrication."
    },
    {
      q: "Do porcelain veneers look natural?",
      a: "Yes. Our master ceramists hand-layer porcelain with varying degrees of opacity and surface texture to mimic the light-reflecting properties of natural enamel."
    },
    {
      q: "Are veneers permanent?",
      a: "Porcelain veneers are a long-term restoration. With proper home care and regular cleanings, they typically last between 10 to 20 years before needing replacement."
    },
    {
      q: "Is the veneer procedure painful?",
      a: "No. We use advanced local anesthesia and offer sedation options. Most patients report minimal discomfort during the preparation and bonding phases."
    },
    {
      q: "How should I care for my new veneers?",
      a: "Brush and floss normally with non-abrasive toothpaste, and avoid biting directly into hard objects like ice or nuts. A protective nightguard is recommended."
    }
  ];

  const headlineText = "Sculpting Smiles like Custom Gems";
  const words = headlineText.split(" ");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation values (max 8 degrees)
    const rotateX = -(y / (rect.height / 2)) * 8;
    const rotateY = (x / (rect.width / 2)) * 8;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5,
      overwrite: "auto"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5,
      overwrite: "auto"
    });
  };

  return (
    <SmoothScroll>
      <div className="bg-siteground font-body text-siteink antialiased">
        <Nav />

        <main>
          {/* SECTION 1: HERO (B: Canvas Frame Scrub / Reduced Motion Fallback) */}
          {reduced ? (
            <section className="relative h-dvh overflow-hidden bg-siteground">
              <img
                src="/assets/hero-final.jpg"
                alt="Awakened veneer on onyx marble plinth with champagne gold highlights"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-siteground via-siteground/70 to-transparent" />
              
              <div className="relative z-10 mx-auto flex h-full max-w-[1360px] items-center px-5 md:px-10">
                <div className="max-w-2xl text-left">
                  <h1 className="font-display text-[42px] font-extrabold leading-[1.1] tracking-tight md:text-[68px]">
                    Sculpting Smiles like Custom Gems
                  </h1>
                  <p className="mt-6 font-body text-[16px] leading-relaxed text-sitemuted md:text-[18px]">
                    An exclusive atelier where master ceramics and elite dentistry merge. We craft porcelain veneers that capture light and release confidence.
                  </p>
                  <div className="mt-10">
                    <BookingButton label="Reserve Consultation" onClick={() => scrollToId("visit")} />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section ref={heroWrapRef} className="relative h-[210vh] md:h-[240vh]">
              <div className="sticky top-0 h-dvh overflow-hidden bg-siteground">
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-siteground/90 via-siteground/45 to-transparent" />
                
                {/* Hero Content Overlay */}
                <div className="absolute inset-0 z-10 flex items-end pb-14 md:items-center md:pb-0">
                  <div className="mx-auto w-full max-w-[1360px] px-5 md:px-10">
                    <div className="max-w-2xl text-left">
                      <h1 className="font-display text-[40px] font-extrabold leading-[1.15] tracking-tight md:text-[66px] uppercase">
                        {words.map((word, wIdx) => {
                          const chars = Array.from(word);
                          return (
                            <span key={wIdx} className="inline-block mr-[0.3em]">
                              <span className="inline-block whitespace-nowrap">
                                {chars.map((char, cIdx) => {
                                  const globalIndex = words.slice(0, wIdx).join(" ").length + (wIdx > 0 ? 1 : 0) + cIdx;
                                  return (
                                    <span
                                      key={cIdx}
                                      className="sx-rise inline-block"
                                      style={{ animationDelay: `${globalIndex * 15}ms` }}
                                    >
                                      {char}
                                    </span>
                                  );
                                })}
                              </span>
                            </span>
                          );
                        })}
                      </h1>
                      <p className="mt-6 font-body text-[16px] leading-relaxed text-sitemuted md:text-[18px]">
                        An exclusive atelier where master ceramics and elite dentistry merge. We craft porcelain veneers that capture light and release confidence.
                      </p>
                      <div className="mt-10">
                        <BookingButton label="Reserve Consultation" onClick={() => scrollToId("visit")} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* BRAND SHOWCASE BANNER SECTION */}
          <section className="relative w-full overflow-hidden bg-siteground pt-16 pb-8">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10">
              <div className="overflow-hidden rounded-2xl border border-siteink/10 bg-sitesurface shadow-xl relative group">
                <img
                  src="/assets/aurora-banner.png"
                  alt="Aurora Dental Aesthetics - Redefining Smiles, Elevating Confidence"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02] origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-siteground/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </section>

          {/* PROOF STRIP SECTION */}
          <section className="relative bg-siteground py-12 border-y border-siteink/10">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-siteink/10">
                <div className="text-center px-4">
                  <span className="font-display text-[32px] md:text-[44px] font-bold text-siteaccent">99.8%</span>
                  <p className="mt-1 font-body text-[12px] md:text-[13px] text-sitemuted uppercase tracking-wider">Client Satisfaction</p>
                </div>
                <div className="text-center px-4">
                  <span className="font-display text-[32px] md:text-[44px] font-bold text-siteaccent">12k+</span>
                  <p className="mt-1 font-body text-[12px] md:text-[13px] text-sitemuted uppercase tracking-wider">Veneers Completed</p>
                </div>
                <div className="text-center px-4">
                  <span className="font-display text-[32px] md:text-[44px] font-bold text-siteaccent">15Yr+</span>
                  <p className="mt-1 font-body text-[12px] md:text-[13px] text-sitemuted uppercase tracking-wider">Avg Restoration Life</p>
                </div>
                <div className="text-center px-4">
                  <span className="font-display text-[32px] md:text-[44px] font-bold text-siteaccent">03</span>
                  <p className="mt-1 font-body text-[12px] md:text-[13px] text-sitemuted uppercase tracking-wider">Beverly Hills Accreditations</p>
                </div>
              </div>
            </div>
          </section>

          {/* PROTOCOL BAND SECTION */}
          <section className="relative bg-sitesurface/30 py-16 border-b border-siteink/5">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10 text-center">
              <span className="font-display text-[11px] font-bold tracking-[0.25em] text-siteaccent uppercase block mb-4">
                ATELIER STANDARDS
              </span>
              <p className="max-w-2xl mx-auto font-display text-[16px] md:text-[18px] text-siteink leading-relaxed">
                We operate under strict micro-clinical guidelines to guarantee long-term restoration health and natural smile beauty.
              </p>
              <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[12px] md:text-[13px] font-body text-sitemuted">
                <span>01 Complete Medical Confidentiality</span>
                <span className="text-siteaccent/40">&bull;</span>
                <span>02 Feldspathic Ceramic Layering</span>
                <span className="text-siteaccent/40">&bull;</span>
                <span>03 Sub-Gingival Margin Sealing</span>
                <span className="text-siteaccent/40">&bull;</span>
                <span>04 Post-Procedure Nightguard Fit</span>
              </div>
            </div>
          </section>

          {/* SECTION 2: SPACE CHAPTER (Sticky Film Chapter) */}
          <section id="atelier" ref={chapterWrapRef} className="relative h-[160vh]">
            <div className="sticky top-0 h-dvh overflow-hidden bg-siteground">
              <div ref={chapterVideoRef} className="absolute inset-0 h-full w-full origin-center">
                <FilmVideo
                  src="/assets/film-atelier.mp4"
                  poster="/assets/poster-atelier.jpg"
                  className="h-full w-full object-cover"
                  label="Private black marble dental corridor swept by champagne light"
                />
              </div>
              
              {/* Floating Golden Dust Particles (Animations Behind Card) */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 15 }).map((_, idx) => {
                  const left = `${(idx * 7) % 100}%`;
                  const delay = `${(idx * 1.5) % 15}s`;
                  const size = `${((idx * 3) % 4) + 2}px`;
                  const duration = `${15 + ((idx * 6) % 12)}s`;
                  return (
                    <div
                      key={idx}
                      className="absolute sx-dust bg-siteaccent/40 rounded-full blur-[1px]"
                      style={{
                        left,
                        width: size,
                        height: size,
                        animationDelay: delay,
                        animationDuration: duration,
                        bottom: "-5%",
                      }}
                    />
                  );
                })}
              </div>

              {/* Card Container Overlay (Axis 4: rounded-2xl glass) */}
              <div className="absolute inset-0 flex items-center justify-end px-5 md:px-10">
                <div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="max-w-md rounded-2xl border border-siteink/10 bg-sitesurface/75 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 ease-out"
                >
                  <span className="font-display text-[11px] font-bold tracking-[0.25em] text-siteaccent uppercase">
                    THE SPACE
                  </span>
                  <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-siteink uppercase">
                    A Sanctuary of Hushed Precision
                  </h2>
                  <p className="mt-4 font-body text-[15px] leading-relaxed text-sitemuted">
                    Step into a private world of book-matched black marble and warm golden illumination. We have designed every detail of the treatment environment to soothe sensory input and guarantee absolute calm.
                  </p>
                  
                  {/* Technical credentials grid for professional credibility */}
                  <div className="mt-6 space-y-3.5 border-t border-siteink/10 pt-6">
                    <div className="flex items-center justify-between text-[13px] font-display">
                      <span className="text-sitemuted">Acoustic Shielding</span>
                      <span className="font-bold text-siteink uppercase">Absorptive 35dB Walls</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px] font-display">
                      <span className="text-sitemuted">Sensory Air Filtration</span>
                      <span className="font-bold text-siteink uppercase">Cleanroom HEPA H14</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px] font-display">
                      <span className="text-sitemuted">Scheduling Buffer</span>
                      <span className="font-bold text-siteink uppercase">90-Min Private Slots</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: OFFERINGS (Icon Rows + Click-to-Expand) */}
          <section id="offerings" className="relative bg-siteground py-24 md:py-32 bg-[radial-gradient(circle_at_top,rgba(200,169,106,0.06),transparent_50%)]">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10">
              <div className="max-w-xl">
                <span className="font-display text-[12px] font-bold tracking-[0.2em] text-siteaccent uppercase">
                  THE SERVICE
                </span>
                <h2 className="mt-3 font-display text-[32px] font-bold tracking-tight text-siteink md:text-[44px]">
                  Bespoke Restorations
                </h2>
              </div>

              {/* Accordion Rows (Axis 4: rounded-2xl glass container) */}
              <div className="mt-12 space-y-4">
                {accordionItems.map((item, i) => {
                  const isOpen = openAccordion === i;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-siteink/10 bg-sitesurface/30 transition-all duration-300 hover:border-siteaccent/20"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`accordion-panel-${i}`}
                        onClick={() => setOpenAccordion(isOpen ? null : i)}
                        className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
                      >
                        <div className="flex items-center gap-6">
                          {item.icon}
                          <span className="font-display text-[18px] font-bold text-siteink md:text-[20px]">
                            {item.title}
                          </span>
                        </div>
                        <span className={`text-[24px] text-siteaccent transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                          +
                        </span>
                      </button>

                      <div
                        id={`accordion-panel-${i}`}
                        className="grid transition-[grid-template-rows] duration-500 ease-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-siteink/5 px-6 pb-6 pt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                              <div>
                                <p className="font-body text-[15px] leading-relaxed text-sitemuted">
                                  {item.text}
                                </p>
                                <div className="mt-6">
                                  <WhatsAppCapsule label="Inquire via WhatsApp" href={item.link} />
                                </div>
                              </div>
                              
                              {/* Extended professional details */}
                              <div className="border-t border-siteink/10 pt-6 md:border-t-0 md:border-l md:border-siteink/10 md:pt-0 md:pl-6">
                                <span className="font-display text-[11px] font-bold tracking-[0.15em] text-siteaccent uppercase block mb-3">
                                  TECHNICAL PROTOCOL
                                </span>
                                <ul className="space-y-2 text-[13px] font-body text-sitemuted">
                                  {item.steps?.map((step: string, sIdx: number) => (
                                    <li key={sIdx} className="flex items-center gap-2">
                                      <span className="h-1.5 w-1.5 rounded-full bg-siteaccent" />
                                      {step}
                                    </li>
                                  ))}
                                </ul>
                                
                                <div className="mt-4 flex items-center justify-between border-t border-siteink/10 pt-4 text-[13px] font-display">
                                  <span className="text-sitemuted">Target Longevity:</span>
                                  <span className="font-bold text-siteink">{item.longevity}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: TECHNOLOGY (Split Copy/Film) */}
          <section id="technology" className="relative border-y border-siteink/5 bg-gradient-to-b from-siteground via-sitesurface/30 to-siteground py-24 md:py-32">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                {/* Left side: Text */}
                <div className="max-w-lg">
                  <h2 className="font-display text-[32px] font-bold leading-tight tracking-tight text-siteink md:text-[44px] uppercase">
                    Refined Like a Custom Gem
                  </h2>
                  <p className="mt-6 font-body text-[15px] leading-relaxed text-sitemuted">
                    Our master ceramists use diamond-tipped instruments to refine each veneer facet under microscopic guidance. Ceramic dust floats in the light like gold dust: a watchmaker's level of craft applied to your smile.
                  </p>
                </div>

                {/* Right side: Image frame (Axis 4: rounded-2xl glass container) */}
                <div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="overflow-hidden rounded-2xl border border-siteink/10 bg-sitesurface shadow-xl relative group transition-all duration-300 ease-out"
                >
                  <img
                    ref={gemImageRef}
                    src="/assets/custom-gem.jpg"
                    alt="Master ceramist hands refining a porcelain veneer clamped in a jewel vise under precise light"
                    className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105 origin-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-siteground/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: TEAM (Film Band + divide-y rows) */}
          <section id="artistry" ref={artistryWrapRef} className="relative py-24 md:py-32 bg-[radial-gradient(circle_at_bottom,rgba(200,169,106,0.06),transparent_60%)]">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10">
              <div className="max-w-xl">
                <span className="font-display text-[12px] font-bold tracking-[0.2em] text-siteaccent uppercase">
                  THE MAISON
                </span>
                <h2 className="mt-3 font-display text-[32px] font-bold tracking-tight text-siteink md:text-[44px]">
                  Master Artistry
                </h2>
              </div>
            </div>

            {/* Video Strip (Full-bleed with scale scrub animation, taller viewport, overlay borders and typography) */}
            <div className="mt-12 w-full overflow-hidden border-y border-siteink/10 bg-sitesurface shadow-xl relative h-[50vh] md:h-[70vh]">
              {/* Gradient Scrims */}
              <div className="absolute inset-0 bg-gradient-to-b from-siteground/80 via-transparent to-siteground/80 z-10 pointer-events-none" />
              
              {/* Corner/Overlay Borders */}
              <div className="absolute inset-6 md:inset-10 border border-siteaccent/20 pointer-events-none z-10" />
              
              {/* Floating Typography Tag */}
              <div className="absolute bottom-10 left-10 md:left-16 z-20 pointer-events-none font-display text-[10px] md:text-[12px] font-bold tracking-[0.25em] text-siteaccent uppercase animate-pulse">
                04 / ARTISTRY SPECIMEN
              </div>

              <div ref={artistryVideoRef} className="absolute inset-0 h-full w-full origin-center">
                <FilmVideo
                  src="/assets/teeth.mp4"
                  poster="/assets/teeth-poster.jpg"
                  className="h-full w-full object-cover"
                  label="Advanced dental artistry veneers demonstration"
                />
              </div>
            </div>

            <div className="mx-auto max-w-[1360px] px-5 md:px-10 mt-12">
              {/* Specialty Rows */}
              <div className="mt-12 divide-y divide-siteink/10 border-t border-b border-siteink/10">
                <div className="flex flex-col justify-between py-6 md:flex-row md:items-center">
                  <span className="font-display text-[16px] font-bold tracking-wider text-siteink uppercase">
                    Founder & Clinical Director
                  </span>
                  <span className="mt-1 font-body text-[14px] text-sitemuted md:mt-0 uppercase">
                    Smile Architecture & Placement
                  </span>
                </div>
                <div className="flex flex-col justify-between py-6 md:flex-row md:items-center">
                  <span className="font-display text-[16px] font-bold tracking-wider text-siteink uppercase">
                    Master Ceramist
                  </span>
                  <span className="mt-1 font-body text-[14px] text-sitemuted md:mt-0 uppercase">
                    Veneer Design & Hand-Layering
                  </span>
                </div>
                <div className="flex flex-col justify-between py-6 md:flex-row md:items-center">
                  <span className="font-display text-[16px] font-bold tracking-wider text-siteink uppercase">
                    Aesthetic Dental Surgeon
                  </span>
                  <span className="mt-1 font-body text-[14px] text-sitemuted md:mt-0 uppercase">
                    Implantology & Reconstruction
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: QUOTE (Oversized Philosophy Statement) */}
          <section className="relative bg-sitesurface/30 py-24 md:py-32">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10 text-center">
              <div className="mx-auto max-w-4xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12 text-siteaccent/40">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h3c0 4-2 6-5 7v1zm11 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h3c0 4-2 6-5 7v1z"/>
                </svg>
                <blockquote className="mt-8 font-display text-[26px] font-medium leading-relaxed tracking-tight text-siteink md:text-[40px]">
                  "Luxury is in the details. A smile is not just teeth: it is a canvas of light, character, and human connection."
                </blockquote>
                <cite className="mt-6 block font-display text-[13px] font-bold tracking-[0.2em] text-siteaccent uppercase not-italic">
                  Atelier Philosophy
                </cite>
              </div>
            </div>
          </section>

          {/* SECTION 7: LEGACY STATEMENT (Centered Manifesto) */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10 text-center">
              <div className="sx-wash mx-auto inline-block rounded-2xl border border-siteaccent/10 px-8 py-12 shadow-inner">
                <p className="font-display text-[28px] font-bold tracking-tight text-siteink md:text-[46px] uppercase">
                  We do not place teeth. <span className="text-siteaccent">We restore character.</span>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 8: FAQ (Plain Accordion) */}
          <section id="faq" className="relative border-t border-siteink/5 py-24 md:py-32">
            <div className="mx-auto max-w-[1360px] px-5 md:px-10">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-center font-display text-[32px] font-bold tracking-tight text-siteink md:text-[44px] uppercase">
                  Frequent Inquiries
                </h2>

                <div className="mt-12 space-y-4">
                  {faqItems.map((item, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={i}
                        className="border-b border-siteink/10 pb-4"
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${i}`}
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-display text-[16px] font-bold text-siteink md:text-[18px] transition-colors hover:text-siteaccent"
                        >
                          <span>{item.q}</span>
                          <span className={`text-[20px] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                            +
                          </span>
                        </button>

                        <div
                          id={`faq-panel-${i}`}
                          className="grid transition-[grid-template-rows] duration-500 ease-out"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <p className="pb-4 pt-2 font-body text-[14px] leading-relaxed text-sitemuted">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: VISIT FINALE (Full-bleed film + info card, id="visit") */}
          <section id="visit" className="relative min-h-dvh overflow-hidden bg-siteground">
            {/* Full-bleed background video */}
            <div className="absolute inset-0 h-full w-full">
              <FilmVideo
                src="/assets/film-nocturne.mp4"
                poster="/assets/poster-nocturne.jpg"
                className="h-full w-full object-cover"
                label="Open veneer presentation case glowing under brass lamp in dim atelier room"
              />
            </div>
            
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-siteground/85 via-siteground/40 to-transparent" />

            {/* Content wrapper */}
            <div className="relative flex min-h-dvh flex-col justify-between pt-32 pb-10">
              <div className="mx-auto w-full max-w-[1360px] px-5 md:px-10 grid gap-12 md:grid-cols-2 md:items-start">
                {/* Left Column: Concierge Info Card */}
                <div className="rounded-2xl border border-siteink/10 bg-sitesurface/75 p-8 shadow-2xl backdrop-blur-md">
                  <span className="font-display text-[11px] font-bold tracking-[0.25em] text-siteaccent uppercase">
                    CONCIERGE DESK
                  </span>
                  <h2 className="mt-3 font-display text-[26px] font-bold leading-tight text-siteink uppercase">
                    Beverly Hills Atelier
                  </h2>
                  <p className="mt-3 font-body text-[14px] text-sitemuted leading-relaxed">
                    Visits are strictly by prior arrangement to guarantee absolute privacy and unhurried clinical attention.
                  </p>
                  
                  {/* Clinic details */}
                  <div className="mt-6 space-y-4 border-t border-siteink/10 pt-6 font-display text-[14px]">
                    <div className="flex justify-between border-b border-siteink/5 pb-3">
                      <span className="text-sitemuted">LOCATION</span>
                      <span className="font-bold text-siteink">Beverly Hills, CA</span>
                    </div>
                    <div className="flex justify-between border-b border-siteink/5 pb-3">
                      <span className="text-sitemuted">ADDRESS</span>
                      <span className="font-bold text-siteink text-right">450 N Bedford Dr, Suite 300</span>
                    </div>
                    <div className="flex justify-between border-b border-siteink/5 pb-3">
                      <span className="text-sitemuted">VALET PARKING</span>
                      <span className="font-bold text-siteink text-right">Bedford Underground Entrance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sitemuted">HOURS</span>
                      <span className="font-bold text-siteink">By Appointment Only</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <PhoneFillButton label="Call Concierge" tel="+15559876543" />
                    <WhatsAppCapsule label="Chat via WhatsApp" href="https://wa.me/15559876543?text=I%20want%20to%20reserve%20a%20consultation" />
                  </div>
                </div>

                {/* Right Column: Premium Interactive Booking Card */}
                <div className="rounded-2xl border border-siteink/10 bg-sitesurface/75 p-8 shadow-2xl backdrop-blur-md">
                  <span className="font-display text-[11px] font-bold tracking-[0.25em] text-siteaccent uppercase">
                    REQUEST RESERVATION
                  </span>
                  <h2 className="mt-3 font-display text-[26px] font-bold leading-tight text-siteink uppercase">
                    Consultation Request
                  </h2>
                  
                  <form onSubmit={(e) => { e.preventDefault(); alert('Reservation inquiry received. Our concierge will contact you within 2 hours.'); }} className="mt-6 space-y-4 font-body text-[14px]">
                    <div>
                      <label htmlFor="booking-name" className="block text-[11px] font-bold tracking-wider text-sitemuted uppercase mb-1.5">Full Name</label>
                      <input
                        type="text"
                        id="booking-name"
                        required
                        placeholder="Elizabeth Vance"
                        className="w-full bg-siteground border border-siteink/10 px-4 py-3 text-siteink placeholder-sitemuted/50 focus:outline-none focus:border-siteaccent/50 transition-colors rounded-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-service" className="block text-[11px] font-bold tracking-wider text-sitemuted uppercase mb-1.5">Preferred Service</label>
                      <select
                        id="booking-service"
                        className="w-full bg-siteground border border-siteink/10 px-4 py-3 text-siteink focus:outline-none focus:border-siteaccent/50 transition-colors rounded-lg"
                      >
                        <option className="bg-sitesurface text-siteink">Porcelain Veneers Commission</option>
                        <option className="bg-sitesurface text-siteink">3D Smile Design & Blueprint</option>
                        <option className="bg-sitesurface text-siteink">Aesthetic Dental Consultation</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="booking-contact" className="block text-[11px] font-bold tracking-wider text-sitemuted uppercase mb-1.5">Phone or WhatsApp</label>
                      <input
                        type="tel"
                        id="booking-contact"
                        required
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-siteground border border-siteink/10 px-4 py-3 text-siteink placeholder-sitemuted/50 focus:outline-none focus:border-siteaccent/50 transition-colors rounded-lg"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-siteaccent text-siteground font-display text-[14px] font-bold tracking-wider uppercase py-4 transition-all duration-300 hover:bg-[#D9C08D] hover:shadow-lg hover:shadow-siteaccent/20 cursor-pointer rounded-lg"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Translucent Footer */}
              <div className="mx-auto w-full max-w-[1360px] px-5 md:px-10">
                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-center font-display text-[12px] text-sitemuted md:flex-row md:justify-between md:text-left">
                  <span>&copy; {new Date().getFullYear()} Aurora Dental Aesthetics. All rights reserved.</span>
                  <div className="flex justify-center gap-6 md:justify-start">
                    <a href="#visit" className="hover:text-siteaccent">PRIVACY</a>
                    <a href="#visit" className="hover:text-siteaccent">TERMS</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </SmoothScroll>
  );
}
