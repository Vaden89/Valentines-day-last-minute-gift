import { useState, useEffect } from "react";
import { Smartphone, Heart } from "lucide-react";
import { motion } from "motion/react";

export const MobileOnlyGate = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      // Check both user agent and screen width for better detection
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/;
      const isMobileUserAgent = mobileKeywords.test(userAgent);

      // Check screen width (max-width: 768px is typical mobile breakpoint)
      const isMobileWidth = window.innerWidth <= 768;

      // Consider it mobile if either condition is true
      setIsMobile(isMobileUserAgent || isMobileWidth);
      setIsChecking(false);
    };

    checkIfMobile();

    // Re-check on resize in case user rotates device or resizes browser
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Show nothing while checking (prevents flash)
  if (isChecking) {
    return (
      <div className="w-full h-dvh bg-[#c8102e] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 text-white" fill="white" />
        </motion.div>
      </div>
    );
  }

  // Show blocking screen if not mobile
  if (!isMobile) {
    return (
      <div className="w-full h-dvh bg-linear-to-br from-[#c8102e] via-[#a50d22] to-[#8b0a1d] flex items-center justify-center p-6 overflow-hidden relative">
        {/* Animated background hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: "100%",
                x: `${Math.random() * 100}%`,
                rotate: Math.random() * 360,
                opacity: 0.1,
              }}
              animate={{
                y: "-20%",
                rotate: Math.random() * 360 + 360,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
              className="absolute"
            >
              <Heart
                className="text-white/10"
                fill="white"
                size={80 + Math.random() * 100}
              />
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="max-w-md text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6,
            }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Smartphone className="w-32 h-32 text-white drop-shadow-2xl" />
              </motion.div>

              {/* Heart decoration on phone */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0.9] }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -top-4 -right-4"
              >
                <Heart className="w-12 h-12 text-pink-200" fill="white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontFamily: "Love" }}
            className="text-6xl text-white mb-6 drop-shadow-lg"
          >
            Mobile Only
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ fontFamily: "Oswald" }}
            className="text-xl text-white/90 mb-4 tracking-wide leading-relaxed"
          >
            This special Valentine's experience is designed exclusively for
            mobile devices
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ fontFamily: "Oswald" }}
            className="text-lg text-white/80 tracking-wide"
          >
            Please visit this site on your phone to continue
          </motion.p>

          {/* Pulsing hearts at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center gap-3 mt-6"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-6 h-6 text-pink-200" fill="white" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  // Show children if mobile
  return <>{children}</>;
};
