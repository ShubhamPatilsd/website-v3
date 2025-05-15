import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  color: string;
}

export default function HeartAnimation({
  isActive,
  position,
}: {
  isActive: boolean;
  position: { x: number; y: number };
}) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const colors = ["#ff5e5e", "#ff7eb3", "#ff5757", "#ff8fa3", "#fa6e6e"];

  useEffect(() => {
    if (!isActive) {
      setHearts([]);
      return;
    }

    let heartCount = 0;
    const maxHearts = 10;
    const interval = setInterval(() => {
      if (heartCount >= maxHearts) {
        clearInterval(interval);
        return;
      }

      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now() + Math.random(),
          x: position.x + Math.random() * 40 - 20,
          y: position.y,
          size: 12 + Math.random() * 15,
          opacity: 1,
          rotation: Math.random() * 60 - 30,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);

      heartCount++;
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, position]);

  useEffect(() => {
    if (hearts.length === 0) return;

    const animationFrame = requestAnimationFrame(() => {
      setHearts((prevHearts) =>
        prevHearts
          .map((heart) => ({
            ...heart,
            y: heart.y - 2 - Math.random() * 2,
            opacity: heart.opacity - 0.02,
            rotation: heart.rotation + (Math.random() > 0.5 ? 1 : -1),
          }))
          .filter((heart) => heart.opacity > 0)
      );
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [hearts]);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed pointer-events-none z-20">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            opacity: heart.opacity,
            transform: `rotate(${heart.rotation}deg)`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.5,5.5 C11,3 9,3 7.5,3.5 C4.5,4.5 3.5,9 4.5,11.5 C5.5,14 11,19.5 12.5,20.5 C14,19.5 19.5,14 20.5,11.5 C21.5,9 20.5,4.5 17.5,3.5 C16,3 14,3 12.5,5.5 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
