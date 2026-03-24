import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bannerFF from "@/assets/banner-freefire.jpg";
import bannerBGMI from "@/assets/banner-bgmi.jpg";
import bannerCS from "@/assets/banner-coming-soon.jpg";

const banners = [
  { src: bannerFF, alt: "Free Fire Tournament" },
  { src: bannerBGMI, alt: "BGMI Tournament" },
  { src: bannerCS, alt: "Coming Soon" },
  { src: bannerFF, alt: "Free Fire Championship" },
  { src: bannerCS, alt: "New Game Coming Soon" },
];

const BannerSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const advance = useCallback(() => {
    setIndex((prev) => {
      const next = prev + direction;
      if (next >= banners.length - 1) {
        setDirection(-1);
        return banners.length - 1;
      }
      if (next <= 0) {
        setDirection(1);
        return 0;
      }
      return next;
    });
  }, [direction]);

  useEffect(() => {
    const timer = setInterval(advance, 3500);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <div className="relative w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={banners[index].src}
          alt={banners[index].alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-primary box-glow scale-125" : "bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
