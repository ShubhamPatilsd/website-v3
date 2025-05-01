import MagnetLines from "@/components/MagnetLines/MagnetLines";
import { useEffect, useState, MouseEvent } from "react";
import Image from "next/image";

export default function Home() {
  const [columns, setColumns] = useState(12);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

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

  const handleMouseEnter = (e: MouseEvent) => {
    // Set initial position where cursor is before showing the tooltip
    setTooltipPosition({
      x: e.clientX + 20,
      y: e.clientY - 50,
    });
    setShowTooltip(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (showTooltip) {
      // Position the tooltip to the top right of the cursor
      setTooltipPosition({
        x: e.clientX + 20,
        y: e.clientY - 50,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full relative">
        <MagnetLines
          lineColor="#1D283D"
          containerSize="20vh"
          rows={10}
          columns={40}
          baseAngle={15}
          lineHeight="3vh"
          lineWidth="0.25vh"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <div className="px-18 pt-12">
          <h1 className="text-7xl font-semibold text-slate-800 z-10 relative">
            Shubham Patil
          </h1>

          <div className="pt-8 space-y-4">
            <p className="text-lg font-medium text-slate-800 z-10 relative">
              I'm an innovator, changemaker, and developer at heart.
            </p>
            <p className="text-lg font-medium text-slate-800 z-10 relative">
              I currently call{" "}
              <span
                className="bg-amber-50 text-amber-800 font-bold border-b border-amber-500 pt-1 cursor-pointer relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setShowTooltip(false)}
                onMouseMove={handleMouseMove}
              >
                🌉 San Francisco
              </span>{" "}
              home.
            </p>
          </div>
        </div>

        {/* Cursor-following tooltip */}
        {showTooltip && (
          <div
            className={`fixed z-50 w-64 rounded-xl border border-gray-50 shadow bg-white p-2 pointer-events-none transition-all duration-300 ${
              tooltipVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 origin-bottom-left"
            }`}
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transformOrigin: "bottom left",
              transition:
                "left 0.1s ease-out, top 0.1s ease-out, opacity 0.2s ease, transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
            }}
          >
            <div className="relative h-60 w-full rounded-md overflow-hidden">
              <Image
                src="/sf-bay-area-map.png"
                alt="Map of San Francisco Bay Area"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
