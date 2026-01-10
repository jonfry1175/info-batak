'use client';

import { motion } from 'framer-motion';

export function BatakFigure() {
  return (
    <motion.svg
      width="240"
      height="280"
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto w-full max-w-[200px] md:max-w-[240px]"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
      }}
    >
      {/* Body - Traditional Ulos Pattern */}
      <motion.path
        d="M120 140 L80 180 L80 240 L100 260 L140 260 L160 240 L160 180 L120 140Z"
        fill="#C1272D"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />

      {/* Ulos Pattern Details */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <line x1="90" y1="190" x2="150" y2="190" stroke="white" strokeWidth="2" />
        <line x1="90" y1="200" x2="150" y2="200" stroke="white" strokeWidth="2" />
        <line x1="90" y1="210" x2="150" y2="210" stroke="white" strokeWidth="2" />
        <line x1="90" y1="220" x2="150" y2="220" stroke="white" strokeWidth="2" />
        <line x1="90" y1="230" x2="150" y2="230" stroke="white" strokeWidth="2" />
      </motion.g>

      {/* Arms */}
      <motion.g
        animate={{
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        }}
        style={{ originX: '0.5', originY: '0.3' }}
      >
        {/* Left Arm */}
        <path
          d="M80 160 L50 180 L55 190 L85 170"
          fill="#C1272D"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/20"
        />
        {/* Left Hand Waving */}
        <motion.ellipse
          cx="52"
          cy="185"
          rx="8"
          ry="10"
          className="fill-foreground/80"
          animate={{
            rotate: [-10, 10, -10],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        />
      </motion.g>

      <motion.g>
        {/* Right Arm */}
        <path
          d="M160 160 L190 180 L185 190 L155 170"
          fill="#C1272D"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/20"
        />
        {/* Right Hand */}
        <ellipse cx="188" cy="185" rx="8" ry="10" className="fill-foreground/80" />
      </motion.g>

      {/* Neck */}
      <rect x="110" y="85" width="20" height="15" className="fill-foreground/80" rx="3" />

      {/* Head */}
      <motion.circle
        cx="120"
        cy="70"
        r="25"
        className="fill-foreground/80"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      />

      {/* Traditional Headpiece (Ulos Headwrap) */}
      <motion.g
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <path
          d="M95 55 Q120 45 145 55 L145 65 Q120 60 95 65 Z"
          fill="#C1272D"
          stroke="black"
          strokeWidth="1"
        />
        <line x1="100" y1="58" x2="140" y2="58" stroke="white" strokeWidth="1.5" />
        <line x1="100" y1="62" x2="140" y2="62" stroke="white" strokeWidth="1.5" />
      </motion.g>

      {/* Face Details */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {/* Eyes */}
        <circle cx="110" cy="68" r="3" fill="black" />
        <circle cx="130" cy="68" r="3" fill="black" />

        {/* Smile */}
        <motion.path
          d="M110 78 Q120 83 130 78"
          stroke="black"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: ['M110 78 Q120 83 130 78', 'M110 78 Q120 85 130 78', 'M110 78 Q120 83 130 78'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'easeInOut',
          }}
        />
      </motion.g>

      {/* Legs */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        {/* Left Leg */}
        <rect x="95" y="260" width="15" height="15" className="fill-foreground/90" rx="3" />

        {/* Right Leg */}
        <rect x="130" y="260" width="15" height="15" className="fill-foreground/90" rx="3" />
      </motion.g>

      {/* Decorative Elements - Traditional Patterns */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.5, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        {/* Sparkles around the figure */}
        <circle cx="60" cy="120" r="2" fill="#C1272D" />
        <circle cx="180" cy="120" r="2" fill="#C1272D" />
        <circle cx="70" cy="100" r="1.5" fill="#C1272D" />
        <circle cx="170" cy="100" r="1.5" fill="#C1272D" />
      </motion.g>
    </motion.svg>
  );
}
