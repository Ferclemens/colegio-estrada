import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HERO_URL } from "../data/content";
import "./Hero.css";

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const section = sectionRef.current;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0) return;
      section.style.setProperty(
        "--parallax",
        `${(-rect.top * 0.25).toFixed(1)}px`,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (reduced.matches) return;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef} aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Ingreso 2027 · U.E.G.P. N° 16</p>
          <h1 id="hero-title">
            Una educación integral <br />
            <span>para cada etapa de la vida</span>
          </h1>
          <p className="hero-text">
            En José Manuel Estrada acompañamos cada recorrido con compromiso
            pedagógico, excelencia académica y la contención humana que las
            familias necesitan.
          </p>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <img src={HERO_URL} alt="" fetchpriority="high" />
      </div>
    </section>
  );
}
