import { motion, useReducedMotion } from "framer-motion";
import StarryBackground from "@/components/StarryBackground";

interface CountdownBackgroundProps {
  type?: string;
  imageUrl?: string;
  isDark?: boolean;
}

export default function CountdownBackground({ imageUrl }: CountdownBackgroundProps) {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      {imageUrl ? (
        <motion.div
          initial={reduce ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : null}

      <div className={imageUrl ? "absolute inset-0 opacity-45" : "absolute inset-0"}>
        <StarryBackground />
      </div>

      <div className="vignette-rise absolute inset-0" />
      <div className="vignette-radial absolute inset-0" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
