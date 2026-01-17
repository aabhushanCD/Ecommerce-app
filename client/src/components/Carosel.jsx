import React, { useEffect, useState } from "react";
import messi from "/images/pexels-nurseryart.jpg";
import photo2 from "/images/pexels-olly-3769747.jpg";
import photo3 from "/images/pexels-vlada-karpovich.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { img: messi, title: "Beauty Essentials", subtitle: "Up to 30% OFF" },
  { img: photo2, title: "Skin Care Products", subtitle: "Glow Naturally" },
  { img: photo3, title: "Daily Care Items", subtitle: "Trusted Quality" },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === current
              ? "opacity-100 scale-100 z-20"
              : "opacity-0 scale-105 z-10"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />

          {/* Text */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              {slide.subtitle}
            </p>
            <button className="w-fit bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition">
              Shop Now
            </button>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 
                   bg-black/40 hover:bg-black/60 p-3 rounded-full text-white"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 
                   bg-black/40 hover:bg-black/60 p-3 rounded-full text-white"
      >
        <ChevronRight size={26} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === i ? "w-8 bg-emerald-400" : "w-2.5 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
