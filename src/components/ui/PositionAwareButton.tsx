import React, { useRef, useState } from "react";
import Link from "next/link";
import styles from "./PositionAwareButton.module.css";

interface PositionAwareButtonProps {
  text: string;
  icon?: boolean;
  textColor?: string;
  iconColor?: string;
  bgColor?: string;
  hoveredTextColor?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  borderColor?: string;
  borderWidth?: string;
  boxShadow?: string;
  hoverBoxShadow?: string;
  transitionDuration?: string;

  // Icon-specific props
  iconSize?: string;
  iconMargin?: string;
  iconPadding?: string;
  iconBorderRadius?: string;
  iconBoxShadow?: string;
  iconHoverBoxShadow?: string;
}

const PositionAwareButton: React.FC<PositionAwareButtonProps> = ({
  text,
  textColor = "#000",
  bgColor = "transparent",
  hoveredTextColor = "#fff",
  width = "170px",
  height = "40px",
  padding = "0px 0px",
  margin = "0px",
  borderRadius = "100px",
  fontSize = "16px",
  fontWeight = "bold",
  borderColor = "#483d78",
  borderWidth = "1px",
  boxShadow = "none",
  hoverBoxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)",
  transitionDuration = "0.3s",
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (buttonRef.current) {
      const span = buttonRef.current.querySelector("span");
      if (span) {
        const { left, top } = buttonRef.current.getBoundingClientRect();
        const relX = e.clientX - left;
        const relY = e.clientY - top;
        requestAnimationFrame(() => {
          span.style.setProperty("--x", `${relX}px`);
          span.style.setProperty("--y", `${relY}px`);
        });
      }
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link
      ref={buttonRef}
      className={styles.btnPosnawr}
      href="#"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        color: isHovered ? hoveredTextColor : textColor,
        backgroundColor: isHovered ? "white" : bgColor,
        width,
        height,
        padding,
        margin,
        borderRadius,
        fontSize,
        fontWeight,
        borderColor,
        borderWidth,
        boxShadow: isHovered ? hoverBoxShadow : boxShadow,
        transition: `all ${transitionDuration} ease-in-out`,
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        borderStyle: "solid",
      }}
    >
      {text}
      
      <span></span>
    </Link>
  );
};

export default PositionAwareButton;
