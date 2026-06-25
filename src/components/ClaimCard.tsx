import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { ClaimCardData } from "@/data/levels";
import { cn } from "@/lib/utils";

type Props = {
  data: ClaimCardData;
  imageUrl?: string;
  compact?: boolean;
  className?: string;
};

function FieldIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!Cmp) return <Icons.Circle className={className} />;
  return <Cmp className={className} />;
}

export function ClaimCard({ data, imageUrl, compact, className }: Props) {
  if (imageUrl) {
    return (
      <div className={cn("overflow-hidden rounded-2xl shadow-card", className)}>
        <img src={imageUrl} alt={data.title} className="w-full h-full object-contain" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "bg-card rounded-2xl shadow-card overflow-hidden border border-border/60 flex flex-col",
        className
      )}
    >
      {/* Header strip */}
      <div
        className="px-5 py-4 text-white"
        style={{ backgroundColor: "var(--claim-header)" }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">
              {data.title}
            </div>
            <div className="font-display text-lg sm:text-xl font-semibold truncate">
              {data.patientName}
            </div>
          </div>
          <div className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-wider">
            {data.claimType}
          </div>
        </div>
        <div className="mt-1 text-xs opacity-70">{data.subtitle}</div>
      </div>

      <div className="h-px bg-border" />

      {/* Field grid */}
      <div
        className={cn(
          "grid gap-3 p-4 sm:p-5",
          compact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"
        )}
      >
        {data.fields.map((f, i) => (
          <motion.button
            key={f.key}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 0 2px color-mix(in oklab, var(--brand) 35%, transparent)",
            }}
            className="group text-left rounded-xl bg-brand-soft/60 hover:bg-brand-soft p-3 transition-colors"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <FieldIcon name={f.icon} className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] uppercase tracking-[0.14em] font-medium">
                {f.label}
              </span>
            </div>
            <div className="text-mono mt-1.5 text-sm sm:text-[15px] font-semibold text-foreground break-words">
              {f.value}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
