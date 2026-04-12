import { useState, useEffect, useRef } from 'react';

export const useSlider = (items, itemsPerView = 4) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null);

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      setScrollPosition(scrollLeft);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => slider.removeEventListener('scroll', checkScrollPosition);
    }
  }, [items]);

  return {
    sliderRef,
    canScrollLeft,
    canScrollRight,
    scrollPosition,
    scrollLeft,
    scrollRight
  };
};