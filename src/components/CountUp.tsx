import { useEffect, useState } from "react";

export function CountUp({
  to,
  duration = 900,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return (
    <span>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
