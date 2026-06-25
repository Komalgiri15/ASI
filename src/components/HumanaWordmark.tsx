import { cn } from "@/lib/utils";

export function HumanaWordmark({ className, glow }: { className?: string; glow?: boolean }) {
  return (
    <span
      className={cn(
        "font-display font-bold tracking-tight",
        glow && "drop-shadow-[0_0_24px_color-mix(in_oklab,var(--brand)_60%,transparent)]",
        className
      )}
      style={{ color: "var(--brand)" }}
    >
      Humana<span className="text-white/90">.</span>
    </span>
  );
}
