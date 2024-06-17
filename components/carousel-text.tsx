"use client"

import React, { useState, useEffect } from 'react';

const CarouselText = () => {
  const texts = [
    'Free shipping on orders over $100',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === texts.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 w-full py-3 text-sm px-6 uppercase font-semibold text-white hidden md:block top-16 relative z-10 overflow-hidden">
      <div className="flex flex-row gap-10 justify-center animate-marquee w-full">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`transition-transform duration-1000 transform ${index === currentIndex ? '-translate-x-full' : 'translate-x-full'
              }`}
          >
            <label>{text}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselText;