import { cn } from "@/lib/utils"
import BlurImage from "../ui/BlurImage";

export  function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    src: string
    alt: string
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal"
  pauseOnHover?: boolean
  className?: string
}) {
  const containerStyles = {
    "--animation-duration": speed === "fast" ? "20s" : "30s",
    "--animation-direction": direction === "left" ? "normal" : "reverse",
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        className
      )}
      style={containerStyles}
    >
      <ul
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {[...items, ...items].map((item, idx) => (
          <li
            className="w-[100px] max-w-full relative flex-shrink-0 px-2"
            key={idx}
          >
            <BlurImage
              src={item?.src}
              alt={item?.alt}
              width={100}
              height={100}
              className="object-contain h-14 w-14"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}