import { useState, type ReactNode, type RefObject } from "react";
import { Minus, Plus, Maximize2, X } from "lucide-react";

type Pan = { x: number; y: number };

type ZoomButtonBarProps = {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  large?: boolean;
};

function ZoomButtonBar({ zoom, onZoomIn, onZoomOut, onResetZoom, large = false }: ZoomButtonBarProps) {
  const btnSize = large ? "h-12 w-12" : "h-10 w-10";
  const iconSize = large ? "h-6 w-6" : "h-5 w-5";
  const resetClass = large ? "h-12 px-4 text-base" : "h-10 px-3 text-sm";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoom <= 1}
        aria-label="Zoom out"
        className={`flex ${btnSize} cursor-pointer items-center justify-center rounded-lg border border-white/25 bg-emerald-950/80 text-white shadow-md transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Minus className={iconSize} />
      </button>
      <span className={`min-w-[4.5rem] text-center font-mono font-bold text-emerald-200 ${large ? "text-base" : "text-sm"}`}>
        {Math.round(zoom * 100)}%
      </span>
      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoom >= 3.5}
        aria-label="Zoom in"
        className={`flex ${btnSize} cursor-pointer items-center justify-center rounded-lg border border-white/25 bg-emerald-950/80 text-white shadow-md transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Plus className={iconSize} />
      </button>
      <button
        type="button"
        onClick={onResetZoom}
        className={`flex ${resetClass} cursor-pointer items-center justify-center rounded-lg border border-white/25 bg-emerald-950/80 font-bold text-white shadow-md transition hover:bg-emerald-800`}
      >
        Reset
      </button>
    </div>
  );
}

function ViewportInner({
  imageUrl,
  imageAlt,
  zoom,
  pan,
  isDragging,
  children,
}: {
  imageUrl: string;
  imageAlt: string;
  zoom: number;
  pan: Pan;
  isDragging: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        transformOrigin: "center center",
        transition: isDragging ? "none" : "transform 0.15s ease-out",
      }}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="pointer-events-none h-full w-full select-none object-contain"
        draggable={false}
      />
      {children}
    </div>
  );
}

export type MainframeImagePanelProps = {
  title: string;
  imageUrl: string;
  imageAlt?: string;
  zoom: number;
  pan: Pan;
  isDragging: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  children?: ReactNode;
};

export function MainframeImagePanel({
  title,
  imageUrl,
  imageAlt = "Mainframe Board",
  zoom,
  pan,
  isDragging,
  containerRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  children,
}: MainframeImagePanelProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const viewportHandlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };

  const viewportClass =
    "relative min-h-[200px] w-full flex-1 cursor-grab overflow-hidden bg-black active:cursor-grabbing";

  return (
    <>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-[3]">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-emerald-800 bg-emerald-700 px-3 py-2.5 text-[#E9F8F0] sm:gap-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#25BB64]" />
            <span className="truncate text-sm font-bold font-mono tracking-wider">{title}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ZoomButtonBar
              zoom={zoom}
              onZoomIn={onZoomIn}
              onZoomOut={onZoomOut}
              onResetZoom={onResetZoom}
            />
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              aria-label="Enlarge image to full screen"
              title="Enlarge"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/25 bg-emerald-950/80 text-white shadow-md transition hover:bg-emerald-800"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div ref={containerRef} className={viewportClass} {...viewportHandlers}>
          <ViewportInner imageUrl={imageUrl} imageAlt={imageAlt} zoom={zoom} pan={pan} isDragging={isDragging}>
            {children}
          </ViewportInner>
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/70 px-3 py-1.5 text-sm font-mono text-emerald-300">
            Drag to pan · + / − to zoom
          </div>
        </div>
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-emerald-800 bg-emerald-900 px-4 py-3">
            <span className="truncate font-mono text-base font-bold text-emerald-100">{title}</span>
            <div className="flex items-center gap-2 sm:gap-3">
              <ZoomButtonBar
                zoom={zoom}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                onResetZoom={onResetZoom}
                large
              />
              <button
                type="button"
                onClick={() => setFullscreen(false)}
                aria-label="Close full screen"
                title="Close"
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-white/25 bg-red-900/80 text-white shadow-md transition hover:bg-red-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className={`min-h-0 flex-1 ${viewportClass}`} {...viewportHandlers}>
            <ViewportInner imageUrl={imageUrl} imageAlt={imageAlt} zoom={zoom} pan={pan} isDragging={isDragging}>
              {children}
            </ViewportInner>
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/70 px-4 py-2 text-base font-mono text-emerald-300">
              Drag to pan · + / − to zoom
            </div>
          </div>
        </div>
      )}
    </>
  );
}
