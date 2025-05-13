import MagnetLines from "@/components/MagnetLines/MagnetLines";
import { useEffect, useState, MouseEvent, useCallback, useRef } from "react";
import ImageTooltip from "@/components/ImageTooltip/ImageTooltip";
import Image from "next/image";

// Simple throttle function to limit the rate of function calls
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default function Home() {
  const [columns, setColumns] = useState(12);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipImage, setTooltipImage] = useState({
    src: "/sf-bay-area-map.png",
    alt: "Map of San Francisco Bay Area",
  });

  // Ref to store last position to avoid unnecessary updates
  const lastPositionRef = useRef({ x: 0, y: 0 });

  // Preload images
  useEffect(() => {
    const imagesToPreload = ["/sf-bay-area-map.png", "/me.png"];
    imagesToPreload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    // Calculate columns based on window width, but keep it reasonable
    setColumns(Math.min(Math.max(Math.floor(window.innerWidth / 80), 10), 15));

    // Update on resize
    const handleResize = () => {
      setColumns(
        Math.min(Math.max(Math.floor(window.innerWidth / 80), 10), 15)
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showTooltip) {
      // Set a small delay before showing the tooltip to prepare for animation
      timeout = setTimeout(() => {
        setTooltipVisible(true);
      }, 10);
    } else {
      setTooltipVisible(false);
    }
    return () => clearTimeout(timeout);
  }, [showTooltip]);

  const handleMouseEnter = useCallback(
    (e: MouseEvent, imageSrc: string, imageAlt: string) => {
      // Set initial position where cursor is before showing the tooltip
      const position = {
        x: e.clientX + 20,
        y: e.clientY - 50,
      };

      lastPositionRef.current = position;
      setTooltipPosition(position);
      setTooltipImage({ src: imageSrc, alt: imageAlt });
      setShowTooltip(true);
    },
    []
  );

  // Throttled mouse move handler to reduce state updates
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (showTooltip) {
        // Only update if position changed significantly (by at least 5px)
        const newX = e.clientX + 20;
        const newY = e.clientY - 50;

        if (
          Math.abs(newX - lastPositionRef.current.x) > 5 ||
          Math.abs(newY - lastPositionRef.current.y) > 5
        ) {
          const position = { x: newX, y: newY };
          lastPositionRef.current = position;
          setTooltipPosition(position);
        }
      }
    }, 16), // ~60fps (1000ms / 60 ≈ 16ms)
    [showTooltip]
  );

  return (
    <div className="min-h-screen bg-white cursor-default">
      <div className="w-full relative">
        <div className="fade-in-animation bg-[url('/sky.jpg')] bg-cover w-full h-[35vh]"></div>

        <div className="px-16 pt-18 fade-in-animation">
          <h1 className="text-6xl from-gray-800 to-gray-700  bg-clip-text text-transparent bg-gradient-to-t z-10 relative font-medium">
            <span
              onMouseEnter={(e) =>
                handleMouseEnter(e, "/me.png", "Map of San Francisco Bay Area")
              }
              onMouseLeave={() => setShowTooltip(false)}
              onMouseMove={handleMouseMove}
            >
              Shubham Patil
            </span>
          </h1>
          <p className=" from-slate-400 to-slate-400 bg-clip-text text-transparent bg-gradient-to-b mt-[7px] font-medium text-2xl z-10 relative">
            I'm an innovator, changemaker, and developer at heart.
          </p>

          <div className="grid grid-cols-3 w-full mt-18">
            <div className=" text-slate-600 space-y-2 max-w-xs">
              <p className="z-10 relative">
                I currently call{" "}
                <span
                  className="underline cursor-default relative"
                  onMouseEnter={(e) =>
                    handleMouseEnter(
                      e,
                      "/sf-bay-area-map.png",
                      "Map of San Francisco Bay Area"
                    )
                  }
                  onMouseLeave={() => setShowTooltip(false)}
                  onMouseMove={handleMouseMove}
                >
                  San Francisco
                </span>{" "}
                home.
              </p>
            </div>
            <div>
              <h2 className="font-medium text-slate-600 text-lg">Socials</h2>
              <ul className="mt-2">
                <li className="text-slate-500">
                  <a
                    onMouseEnter={(e) =>
                      handleMouseEnter(
                        e,
                        "/x.png",
                        "Map of San Francisco Bay Area"
                      )
                    }
                    onMouseLeave={() => setShowTooltip(false)}
                    onMouseMove={handleMouseMove}
                    href="https://x.com/shubhampatilsd"
                  >
                    X
                  </a>
                </li>
                <li className="text-slate-500">
                  <a href="">LinkedIn</a>
                </li>
                <li className="text-slate-500">
                  <a href="">GitHub</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-medium text-slate-600 text-lg">Else</h2>
              <ul className="mt-2">
                <li className="text-slate-500">
                  <a href="https://x.com/shubhampatilsd">X</a>
                </li>
                <li className="text-slate-500">
                  <a href="">LinkedIn</a>
                </li>
                <li className="text-slate-500">
                  <a href="">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <ImageTooltip
          imageSrc={tooltipImage.src}
          imageAlt={tooltipImage.alt}
          isVisible={tooltipVisible}
          position={tooltipPosition}
        />
      </div>
    </div>
  );
}
