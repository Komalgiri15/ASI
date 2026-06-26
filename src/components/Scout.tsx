import { motion } from "framer-motion";

export type ScoutMood = "idle" | "think" | "celebrate" | "error";

interface ScoutProps {
  mood?: ScoutMood;
  size?: number;
  className?: string;
}

export function Scout({ mood = "idle", size = 120, className = "" }: ScoutProps) {
  // Animation variants for the whole character body
  const bodyVariants = {
    idle: {
      y: [0, -6, 0],
      rotate: [0, 1, 0, -1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    think: {
      y: [0, -2, 0],
      rotate: [0, -3, -3, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    celebrate: {
      y: [0, -20, 0, -15, 0],
      scale: [1, 1.05, 1, 1.03, 1],
      rotate: [0, 10, -10, 5, 0],
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    error: {
      x: [0, -8, 8, -6, 6, -3, 3, 0],
      rotate: [0, -2, 2, -2, 2, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Eyes variants
  const getEyePaths = () => {
    switch (mood) {
      case "celebrate":
        return {
          left: "M 40 50 Q 50 40 60 50", // Happy arch
          right: "M 80 50 Q 90 40 100 50", // Happy arch
          strokeWidth: 4,
          fill: "none",
        };
      case "error":
        return {
          left: "M 42 46 A 4 6 0 0 1 50 52", // Slanted down
          right: "M 88 52 A 4 6 0 0 1 96 46", // Slanted down
          strokeWidth: 5,
          fill: "#1e293b",
        };
      case "think":
        return {
          left: "M 43 45 A 4 4 0 0 1 51 45", // Squinted look-up
          right: "M 87 45 A 5 5 0 1 1 97 45", // Normal look-up
          strokeWidth: 4,
          fill: "#1e293b",
        };
      case "idle":
      default:
        return {
          left: "M 45 45 A 5 5 0 1 1 55 45", // Cute round
          right: "M 85 45 A 5 5 0 1 1 95 45", // Cute round
          strokeWidth: 4,
          fill: "#1e293b",
        };
    }
  };

  // Mouth variants
  const getMouthPath = () => {
    switch (mood) {
      case "celebrate":
        return "M 55 70 Q 70 88 85 70 Z"; // Huge happy open mouth
      case "error":
        return "M 60 74 Q 70 70 80 74"; // Concerned wave line
      case "think":
        return "M 62 72 Q 70 75 78 70"; // Sideways small smirk
      case "idle":
      default:
        return "M 58 70 Q 70 82 82 70"; // Friendly smile
    }
  };

  const eyeData = getEyePaths();
  const mouthPath = getMouthPath();

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        animate={mood}
        variants={bodyVariants}
      >
        {/* Gradients */}
        <defs>
          <linearGradient id="scoutGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9F8F0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Magnifying Glass Handle (Detective Body style) */}
        <motion.path
          d="M 100 100 L 135 135 A 8 8 0 0 1 124 146 L 89 111 Z"
          fill="#334155" // Charcoal handle
          stroke="#1e293b"
          strokeWidth="3"
          animate={mood === "celebrate" ? { rotate: [0, 15, -15, 0] } : {}}
          transition={{ duration: 0.6 }}
        />
        {/* Handle wrap details */}
        <path d="M 105 105 L 122 122" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <path d="M 112 112 L 129 129" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

        {/* Outer Ring / Magnifying Glass Body */}
        <circle cx="70" cy="70" r="50" fill="#FFFFFF" stroke="#25BB64" strokeWidth="8" />
        
        {/* Glass Reflection Lens */}
        <circle cx="70" cy="70" r="46" fill="url(#scoutGlassGrad)" />
        
        {/* Glass reflection shines */}
        <path d="M 40 40 Q 60 30 75 35" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <circle cx="95" cy="95" r="5" fill="#FFFFFF" opacity="0.4" />

        {/* Headset arc */}
        <path
          d="M 28 55 A 47 47 0 0 1 112 55"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left earphone pad */}
        <rect x="18" y="48" width="10" height="20" rx="4" fill="#0f172a" stroke="#25BB64" strokeWidth="2" />
        {/* Right earphone pad */}
        <rect x="112" y="48" width="10" height="20" rx="4" fill="#0f172a" stroke="#25BB64" strokeWidth="2" />
        
        {/* Microphone boom extending to mouth */}
        <path d="M 23 68 Q 23 85 45 88" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Mic tip */}
        <circle cx="47" cy="88" r="3" fill="#25BB64" />

        {/* Eyes (Animated paths) */}
        <motion.path
          d={eyeData.left}
          stroke="#1e293b"
          strokeWidth={eyeData.strokeWidth}
          strokeLinecap="round"
          fill={eyeData.fill}
          animate={{ scaleY: mood === "idle" ? [1, 0.1, 1] : 1 }}
          transition={{ repeat: mood === "idle" ? Infinity : 0, repeatDelay: 4, duration: 0.15 }}
        />
        <motion.path
          d={eyeData.right}
          stroke="#1e293b"
          strokeWidth={eyeData.strokeWidth}
          strokeLinecap="round"
          fill={eyeData.fill}
          animate={{ scaleY: mood === "idle" ? [1, 0.1, 1] : 1 }}
          transition={{ repeat: mood === "idle" ? Infinity : 0, repeatDelay: 4, duration: 0.15 }}
        />

        {/* Blushing cheek dots (except in error/think mood) */}
        {mood !== "error" && mood !== "think" && (
          <>
            <circle cx="38" cy="58" r="4" fill="#f43f5e" opacity="0.4" />
            <circle cx="102" cy="58" r="4" fill="#f43f5e" opacity="0.4" />
          </>
        )}

        {/* Detective Magnifying Glass over right eye (Double Layer) */}
        {mood === "think" && (
          <motion.circle
            cx="85"
            cy="45"
            r="16"
            stroke="#F59E0B"
            strokeWidth="2.5"
            fill="#F59E0B"
            fillOpacity="0.15"
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}

        {/* Mouth */}
        <motion.path
          d={mouthPath}
          stroke="#1e293b"
          strokeWidth="3.5"
          fill={mood === "celebrate" ? "#f43f5e" : "none"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Thinking bubbles or exclamation mark overlays */}
        {mood === "error" && (
          <motion.g
            initial={{ opacity: 0, scale: 0.3, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="120" cy="25" r="12" fill="#EF4444" />
            <path d="M 120 18 L 120 25" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="120" cy="30" r="1.5" fill="#FFFFFF" />
          </motion.g>
        )}

        {/* Lightbulb for thinking */}
        {mood === "think" && (
          <motion.g
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Sparkle lines */}
            <line x1="120" y1="5" x2="120" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="108" y1="13" x2="112" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="132" y1="13" x2="128" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            {/* Bulb */}
            <path
              d="M 112 28 Q 112 18 120 18 Q 128 18 128 28 Q 128 32 124 35 L 124 38 L 116 38 L 116 35 Q 112 32 112 28 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="1.5"
            />
            {/* Socket */}
            <rect x="117.5" y="38" width="5" height="3" fill="#94A3B8" />
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
}
