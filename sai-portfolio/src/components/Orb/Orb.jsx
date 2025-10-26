import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Orb({ speaking }) {
  const controls = useAnimation();
  const ringControls = useAnimation();
  const orbRef = useRef(null);

  useEffect(() => {
    // Constant rotation animation for the outer ring
    ringControls.start({
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    });

    if (speaking) {
      // More dynamic pulsing when speaking
      controls.start({
        scale: [1, 1.2, 1],
        filter: [
          "brightness(1) saturate(1)",
          "brightness(1.5) saturate(1.2)",
          "brightness(1) saturate(1)"
        ],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
    } else {
      // Subtle breathing animation when idle
      controls.start({
        scale: [1, 1.05, 1],
        filter: [
          "brightness(1) saturate(1)",
          "brightness(1.2) saturate(1.1)",
          "brightness(1) saturate(1)"
        ],
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
    }
  }, [speaking, controls, ringControls]);

  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48">
      {/* Outer rotating ring */}
      <motion.div
        animate={ringControls}
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.1) 45deg, rgba(6, 182, 212, 0.4) 90deg, rgba(6, 182, 212, 0.1) 135deg, transparent 180deg)",
          border: "1px solid rgba(6, 182, 212, 0.3)",
        }}
      />

      {/* Main orb container */}
      <motion.div
        ref={orbRef}
        animate={controls}
        className="absolute inset-4 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)",
          boxShadow: "inset 0 0 30px rgba(6, 182, 212, 0.3)",
          border: "1px solid rgba(6, 182, 212, 0.5)"
        }}
      >
        {/* Inner core */}
        <motion.div
          className="w-24 h-24 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)",
            filter: "blur(5px)",
          }}
        />

        {/* Horizontal scan line */}
        <motion.div
          animate={{
            y: [-50, 50, -50],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-full h-1 bg-cyan-400/50 blur-sm"
          style={{
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
          }}
        />
      </motion.div>

      {/* Tech lines */}
      {[0, 60, 120, 180, 240, 300].map((rotation) => (
        <div
          key={rotation}
          className="absolute inset-0"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <div className="absolute top-0 left-1/2 w-[1px] h-4 bg-gradient-to-b from-cyan-400/80 to-transparent" />
        </div>
      ))}

      {/* Edge highlights */}
      <div className="absolute inset-4 rounded-full border border-cyan-400/20" 
           style={{ filter: "blur(1px)" }} />
    </div>
  );
}
