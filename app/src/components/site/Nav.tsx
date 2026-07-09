import { useEffect, useState } from "react";
import { scrollToId } from "./SmoothScroll";

export function Nav() {
  const baseUrl = import.meta.env.BASE_URL;
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll(); // run once so a mid-page reload renders the correct state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
      solid ? "sx-hairline bg-sitesurface/85 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-16 w-full max-w-[1360px] items-center justify-between px-5 md:px-10">
        <a href="/" className="flex items-center gap-3" aria-label="Aurora Dental Aesthetics, home">
          <img src={baseUrl + "assets/logo.png"} alt="" width={30} height={30} className="h-[30px] w-[30px]" />
          <span className="font-display text-[16px] font-bold tracking-tight text-siteink">Aurora Dental Aesthetics</span>
        </a>
        {/* Section Navigation Links (Desktop Centered) */}
        <nav className="hidden md:flex items-center gap-8 font-display text-[13px] font-semibold tracking-wider uppercase text-sitemuted">
          <button type="button" onClick={() => scrollToId("atelier")} className="hover:text-siteaccent transition-colors bg-transparent border-none cursor-pointer">
            Atelier
          </button>
          <button type="button" onClick={() => scrollToId("offerings")} className="hover:text-siteaccent transition-colors bg-transparent border-none cursor-pointer">
            Services
          </button>
          <button type="button" onClick={() => scrollToId("artistry")} className="hover:text-siteaccent transition-colors bg-transparent border-none cursor-pointer">
            Artistry
          </button>
          <button type="button" onClick={() => scrollToId("faq")} className="hover:text-siteaccent transition-colors bg-transparent border-none cursor-pointer">
            Inquiries
          </button>
        </nav>

        <button type="button" onClick={() => scrollToId("visit")}
          className="font-display text-[13px] md:text-[14px] font-bold tracking-tight text-siteink cursor-pointer transition-colors hover:text-siteaccent bg-transparent border-none">
          Reserve Consultation <span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  );
}
