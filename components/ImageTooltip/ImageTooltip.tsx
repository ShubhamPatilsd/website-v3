import { memo } from "react";

interface ImageTooltipProps {
  imageSrc: string;
  imageAlt: string;
  isVisible: boolean;
  position: { x: number; y: number };
}

function ImageTooltip({
  imageSrc,
  imageAlt,
  isVisible,
  position,
}: ImageTooltipProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-50 w-[max(17vw,200px)]  rounded-2xl shadow-2xl pointer-events-none transition-all duration-300 ${
        isVisible ? "pop-animation" : "opacity-0 scale-95 origin-bottom-left"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y + 50}px`,
        transformOrigin: "top left",
        transition:
          "left 0.1s ease-out, top 0.1s ease-out, opacity 0.2s ease, transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
      }}
    >
      <div
        className="relative h-[max(11vw,132px)] w-full overflow-hidden rounded-2xl"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        role="img"
        aria-label={imageAlt}
      />
    </div>
  );
}

export default memo(ImageTooltip);
