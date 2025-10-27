import React, { useRef, useState, useEffect, createContext, useContext } from "react";

export function CardContainer({ children, className = "" }) {
  return (
    <div
      className={className}
      style={{
        perspective: "1200px",
        WebkitPerspective: "1200px",
      }}
    >
      {children}
    </div>
  );
}

export const CardHoverContext = createContext(false);

export function CardBody({ children, className = "" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!isHover) {
      setStyle((s) => ({ ...s, transition: "transform 500ms cubic-bezier(.03,.98,.52,.99)" }));
    } else {
      setStyle((s) => ({ ...s, transition: "transform 120ms ease-out" }));
    }
  }, [isHover]);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;

    const rotateY = px * 10;
    const rotateX = -py * 10;
    const scale = 1.02;

    setStyle({
      transformStyle: "preserve-3d",
      WebkitTransformStyle: "preserve-3d",
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: "transform 120ms ease-out",
      willChange: "transform",
    });
  };

  const handleLeave = () => {
    setIsHover(false);
    setStyle({
      transformStyle: "preserve-3d",
      WebkitTransformStyle: "preserve-3d",
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 500ms cubic-bezier(.03,.98,.52,.99)",
    });
  };

  const handleEnter = () => {
    setIsHover(true);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={style}
    >
      <CardHoverContext.Provider value={isHover}>{children}</CardHoverContext.Provider>
    </div>
  );
}

export function CardItem({
  children,
  translateZ = 0,
  as: Component = "div",
  className = "",
  ...rest
}) {
  const isHover = useContext(CardHoverContext);

  const baseStyle = {
    transform: `translateZ(${translateZ}px)`,
    WebkitTransform: `translateZ(${translateZ}px)`,
    transition: "transform 0.35s ease, box-shadow 200ms ease",
  };

  const hoverExtra = isHover ? { boxShadow: "0 20px 40px rgba(2,6,23,0.4)" } : {};
  const mergedStyle = { ...baseStyle, ...hoverExtra };

  return (
    <Component className={className} style={mergedStyle} {...rest}>
      {children}
    </Component>
  );
}