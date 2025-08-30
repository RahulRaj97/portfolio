import { useCallback, useEffect, useState, useRef } from "react";

interface ScrollPosition {
  x: number;
  y: number;
  direction: "up" | "down" | null;
  isScrolled: boolean;
}

export const useScrollPosition = (threshold: number = 50): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isScrolled: false,
  });

  const rafId = useRef<number | undefined>(undefined);
  const lastScrollY = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      return;
    }

    rafId.current = requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const currentX = window.scrollX;

      setScrollPosition(() => ({
        x: currentX,
        y: currentY,
        direction: currentY > lastScrollY.current ? "down" : "up",
        isScrolled: currentY > threshold,
      }));

      lastScrollY.current = currentY;
      rafId.current = undefined as undefined;
    });
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return scrollPosition;
};
