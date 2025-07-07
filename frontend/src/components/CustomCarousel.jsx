import React, { useEffect, useState } from "react";
import "../css/customSlider.css";
import ProductCard from "./ProductCard";

function CustomCarousel({ items }) {
  const visibleCount = 4;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + items.length) % items.length
    );
  };
  
  const next = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % items.length
  );
  };

  return (
    <div className="carousel-wrapper">
      <button onClick={prev} className="nav-button">‹</button>
      <div className="carousel-window">
        <div
          className="carousel"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          {items.map((item, i) => (
            <div className="carousel-item" key={`${item.id}-${i}`}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={next} className="nav-button">›</button>
    </div>
  );
}

export default CustomCarousel;