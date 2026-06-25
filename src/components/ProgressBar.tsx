import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ProgressBar({
  value,
  max,
  className,
  showLabel,
}: {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
}) {
  const [w, setW] = useState(0);
  const pct = Math.max(0, Math.min(1, value / Math.max(1, max)));
  useEffect(() => {
    const id = requestAnimationFrame(() => setW(pct * 100));
    return () => cancelAnimationFrame(id);
  }, [pct]);
  return (
    <div className={className}>
      <div className="relative h-2 w-full rounded-full bg-border overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "var(--gradient-brand)" }}
          initial={{ width: 0 }}
          animate={{ width: `${w}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-[11px] text-muted-foreground tabular-nums">
          {value} / {max}
        </div>
      )}
    </div>
  );
}
