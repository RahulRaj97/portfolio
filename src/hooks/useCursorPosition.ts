import { useState, useEffect, useCallback, useRef } from "react";

interface CursorPosition {
  x: number;
  y: number;
  isMoving: boolean;
}

export const useCursorPosition = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
    isMoving: false,
  });

  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
      isMoving: true,
    });

    setIsMoving(true);

    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
    }

    moveTimeoutRef.current = setTimeout(() => {
      setIsMoving(false);
    }, 100);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  return { ...cursorPosition, isMoving };
};
