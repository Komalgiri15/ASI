import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Flame,
  Sparkles,
  HelpCircle,
  Check,
  X,
  Plus,
  Minus,
  Maximize2,
  Lock,
  Unlock,
  MapPin,
  ListRestart,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ImageIcon,
} from "lucide-react";
import { useGame } from "@/state/gameContext";
import { CASES } from "@/data/levels";
import { Scout } from "@/components/Scout";
import scoutImg from "@/assets/ava.png";
import { MainframeTerminal } from "@/components/MainframeTerminal";


// ---------------------------------------------------------------------------
// Reference Image Panel — collapsible image shown beside each case step
// ---------------------------------------------------------------------------
function ReferenceImagePanel({ imageUrl, qNum }: { imageUrl: string; qNum: string }) {
  const [open, setOpen] = useState(true);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold text-slate-600 hover:bg-emerald-50/60 transition"
      >
        <span className="flex items-center gap-2">
          <ImageIcon className="h-3.5 w-3.5 text-emerald-500" />
          Reference Image — {qNum}
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>

      {/* Image body */}
      {open && (
        <div className="relative border-t border-emerald-50">
          <img
            src={imageUrl}
            alt={`Reference for ${qNum}`}
            onClick={() => setZoom(true)}
            className="w-full object-contain max-h-64 cursor-zoom-in"
          />

          {/* Full-screen zoom overlay */}
          {zoom && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setZoom(false)}
            >
              <img
                src={imageUrl}
                alt={`Reference for ${qNum} (zoomed)`}
                className="max-w-full max-h-full rounded-xl shadow-2xl cursor-zoom-out"
              />
              <button
                onClick={() => setZoom(false)}
                className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Framer Motion Tinder-style SwipeCard component
function SwipeCard({ card, onSwipe }: { card: any; onSwipe: (approve: boolean) => void }) {
  const [swipeX, setSwipeX] = useState(0);
  const thresh = 100;

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -180, right: 180 }}
      onDrag={(e, info) => setSwipeX(info.offset.x)}
      onDragEnd={(e, info) => {
        if (info.offset.x > thresh) {
          onSwipe(true);
        } else if (info.offset.x < -thresh) {
          onSwipe(false);
        }
        setSwipeX(0);
      }}
      initial={{ scale: 0.95, opacity: 0, y: 5 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        x: swipeX > 0 ? 200 : -200,
        transition: { duration: 0.2 }
      }}
      className="absolute inset-0 bg-[#0d4a2e] border-2 border-emerald-500 rounded-2xl p-4 shadow-xl flex flex-col justify-between text-left cursor-grab active:cursor-grabbing text-emerald-100 z-10"
    >
      <div>
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2 text-sm">
          <span className="text-sm font-bold text-emerald-450 uppercase tracking-wider">
            {card.title}
          </span>
          <span className="h-2 w-2 rounded-full bg-[#25BB64] animate-pulse" />
        </div>
        <h4 className="font-mono text-base font-extrabold text-white mt-2 truncate">
          {card.name}
        </h4>
        <div className="mt-2 space-y-1 font-mono text-sm text-emerald-200">
          <div>DOB: <strong className="text-white font-bold">{card.dob}</strong></div>
          <div>UMID: <strong className="text-white font-bold">{card.umid}</strong></div>
          <div className="truncate">ADDR: <strong className="text-white font-bold">{card.address}</strong></div>
        </div>
      </div>

      <div className="flex gap-2 mt-2 border-t border-emerald-500/20 pt-2 shrink-0">
        <button
          onClick={() => onSwipe(false)}
          className="flex-1 rounded-xl bg-red-950/40 border border-red-500/35 hover:bg-red-900/40 text-red-400 py-2.5 text-sm font-bold uppercase tracking-wider transition cursor-pointer min-h-[44px]"
        >
          Reject (Left)
        </button>
        <button
          onClick={() => onSwipe(true)}
          className="flex-1 rounded-xl bg-emerald-500 border border-emerald-600 text-white py-2.5 text-sm font-bold uppercase tracking-wider transition hover:bg-emerald-600 shadow-md cursor-pointer min-h-[44px]"
        >
          Approve (Right)
        </button>
      </div>
    </motion.div>
  );
}

interface Case1InteractiveBoardProps {
  step: any;
  state: any;
  dispatch: any;
  commandBuilderSlots: string[];
  setCommandBuilderSlots: React.Dispatch<React.SetStateAction<string[]>>;
  spotTagTapped: boolean;
  setSpotTagTapped: React.Dispatch<React.SetStateAction<boolean>>;
  spotTagPages: number;
  setSpotTagPages: React.Dispatch<React.SetStateAction<number>>;
  zoomValPlaced: string | null;
  setZoomValPlaced: React.Dispatch<React.SetStateAction<string | null>>;
  codeChipMatched: boolean;
  setCodeChipMatched: React.Dispatch<React.SetStateAction<boolean>>;
  swipeIndex: number;
  setSwipeIndex: React.Dispatch<React.SetStateAction<number>>;
  handleCommandBuilderTileClick: (tile: string) => void;
  handleCommandBuilderSubmit: () => void;
  handleSpotTagSubmit: () => void;
  handleFieldDetectivePlaceTile: (tile: string) => void;
  handleMatchCodeRowClick: (idx: number) => void;
  handleSwipeChoice: (cardId: string, approve: boolean) => void;
}

function Case1InteractiveBoard({
  step,
  state,
  dispatch,
  commandBuilderSlots,
  setCommandBuilderSlots,
  spotTagTapped,
  setSpotTagTapped,
  spotTagPages,
  setSpotTagPages,
  zoomValPlaced,
  setZoomValPlaced,
  codeChipMatched,
  setCodeChipMatched,
  swipeIndex,
  setSwipeIndex,
  handleCommandBuilderTileClick,
  handleCommandBuilderSubmit,
  handleSpotTagSubmit,
  handleFieldDetectivePlaceTile,
  handleMatchCodeRowClick,
  handleSwipeChoice,
}: Case1InteractiveBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [rowZoomed, setRowZoomed] = useState<number | null>(null);
  const [activeChipSelected, setActiveChipSelected] = useState<boolean>(false);

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRowZoomed(null);
  };

  const zoomIn = () => {
    setZoom((z) => Math.min(3.5, z + 0.25));
  };

  const zoomOut = () => {
    setZoom((z) => Math.max(1, z - 0.25));
  };

  const autoZoomTo = (cx: number, cy: number, level = 2.2) => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    setZoom(level);
    setPan({
      x: width * (0.5 - cx * level),
      y: height * (0.5 - cy * level),
    });
  };

  // Adjust zoom automatically on step change
  useEffect(() => {
    resetZoom();
    setActiveChipSelected(false);
  }, [step.id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, input, select")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 450;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    const limitX = width * (zoom - 0.5);
    const limitY = height * (zoom - 0.5);
    
    setPan({
      x: Math.max(-limitX, Math.min(limitX, newX)),
      y: Math.max(-limitY, Math.min(limitY, newY)),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
  };

  // Tapping Row 1 (Q5 or Q3 target)
  const handleRow1Tap = () => {
    if (step.id === "c1-s5") {
      setRowZoomed(1);
      autoZoomTo(0.5, 0.35, 2.2);
    } else if (step.id === "c1-s3") {
      dispatch({ type: "RECORD_SUCCESS" });
    }
  };

  // Tapping Row 2 (Q4 or Q3 target)
  const handleRow2Tap = () => {
    if (step.id === "c1-s4") {
      setRowZoomed(2);
      autoZoomTo(0.5, 0.48, 2.2);
    } else if (step.id === "c1-s3") {
      dispatch({ type: "RECORD_ERROR" });
    }
  };

  // Tapping target zones on the image
  const handleSlotTap = (slotType: "mgrp" | "dob" | "rel") => {
    if (slotType === "rel" && step.id === "c1-s6") {
      if (activeChipSelected) {
        handleMatchCodeRowClick(0);
      }
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Side-by-side: Image LEFT, Controls RIGHT */}
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row bg-[#1a1a2e] border-2 border-emerald-600/30 rounded-2xl overflow-hidden shadow-lg select-none">

        {/* ── LEFT: Mainframe image viewport ── */}
        <div className="flex flex-1 min-h-0 flex-col lg:flex-[3] min-w-0">
          {/* Title bar */}
          <div className="flex items-center justify-between bg-emerald-700 text-[#E9F8F0] px-4 py-2 font-sans border-b border-emerald-800 shrink-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#25BB64] animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-wider">ASI MAINBOARD — TEXAS PORTAL</span>
            </div>
            <span className="text-sm font-mono text-emerald-300">ZOOM: {Math.round(zoom * 100)}%</span>
          </div>

          {/* Viewport */}
          <div
            ref={containerRef}
            className="relative flex-1 min-h-[200px] w-full bg-black overflow-hidden cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
          {/* Zoomable wrapper */}
          <div
            className="w-full h-full relative"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.15s ease-out",
            }}
          >
            {/* Real Mainframe Image */}
            <img
              src={step.imageUrl}
              alt="Mainframe Board"
              className="w-full h-full object-contain pointer-events-none select-none"
            />

            {/* Overlays */}

            {/* Q1: Highlight query line */}
            {step.id === "c1-s1" && (
              <div
                className="absolute border-2 border-dashed border-yellow-450 bg-yellow-450/5 animate-pulse rounded"
                style={{ top: "10.5%", left: "23.2%", width: "17%", height: "4%" }}
              />
            )}

            {/* Q2: Hotspot over END OF DATA */}
            {step.id === "c1-s2" && (
              <button
                onClick={() => setSpotTagTapped(true)}
                className={`absolute rounded border-2 transition-all duration-300 cursor-pointer ${
                  spotTagTapped
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-dashed border-yellow-450 bg-yellow-450/5 animate-pulse"
                }`}
                style={{ top: "14.2%", left: "23.1%", width: "12%", height: "4%" }}
              />
            )}

            {/* Q3: Hotspots for spotting Client 56 row */}
            {step.id === "c1-s3" && (
              <>
                {/* Row 1 (Correct) */}
                <button
                  onClick={handleRow1Tap}
                  className="absolute border-2 border-dashed border-emerald-500/40 hover:border-emerald-500 hover:bg-emerald-500/10 transition rounded cursor-pointer min-h-[44px]"
                  style={{ top: "30.5%", left: "21%", width: "57%", height: "8.5%" }}
                  aria-label="Row 1 — tap if D-GRP equals 56"
                />
                {/* Row 2 (Incorrect) */}
                <button
                  onClick={handleRow2Tap}
                  className="absolute border-2 border-dashed border-white/10 hover:border-red-400/40 hover:bg-red-400/5 transition rounded cursor-pointer min-h-[44px]"
                  style={{ top: "42.5%", left: "21%", width: "57%", height: "12%" }}
                  aria-label="Row 2"
                />
              </>
            )}

            {/* Q4: Client 58 row (Row 2) zoom & M-GRP tile drop */}
            {step.id === "c1-s4" && (
              <>
                {rowZoomed !== 2 ? (
                  <button
                    onClick={handleRow2Tap}
                    className="absolute border-2 border-dashed border-yellow-400/60 hover:border-yellow-400 bg-yellow-400/5 hover:bg-yellow-400/10 animate-pulse transition rounded flex items-center justify-center cursor-pointer min-h-[44px]"
                    style={{ top: "42.5%", left: "21%", width: "57%", height: "12%" }}
                    aria-label="Tap to zoom Row 2, Client 58"
                  />
                ) : (
                  <div
                    onClick={() => handleSlotTap("mgrp")}
                    className={`absolute rounded border-2 flex items-center justify-center text-sm font-bold font-mono transition-all duration-300 ${
                      zoomValPlaced
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                        : "border-dashed border-yellow-400 bg-yellow-400/10 text-yellow-300 animate-pulse cursor-pointer"
                    }`}
                    style={{ top: "43.5%", left: "61.5%", width: "7.2%", height: "3.8%" }}
                  >
                    {zoomValPlaced || "M-GRP ?"}
                  </div>
                )}
              </>
            )}

            {/* Q5: Client 56 row (Row 1) zoom & DOB tile drop */}
            {step.id === "c1-s5" && (
              <>
                {rowZoomed !== 1 ? (
                  <button
                    onClick={handleRow1Tap}
                    className="absolute border-2 border-dashed border-yellow-400/60 hover:border-yellow-400 bg-yellow-400/5 hover:bg-yellow-400/10 animate-pulse transition rounded flex items-center justify-center cursor-pointer min-h-[44px]"
                    style={{ top: "30.5%", left: "21%", width: "57%", height: "8.5%" }}
                    aria-label="Tap to zoom Row 1, Client 56"
                  />
                ) : (
                  <div
                    onClick={() => handleSlotTap("dob")}
                    className={`absolute rounded border-2 flex items-center justify-center text-sm font-bold font-mono transition-all duration-300 ${
                      zoomValPlaced
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                        : "border-dashed border-yellow-400 bg-yellow-400/10 text-yellow-300 animate-pulse cursor-pointer"
                    }`}
                    style={{ top: "31%", left: "70.2%", width: "8%", height: "3.8%" }}
                  >
                    {zoomValPlaced || "DOB ?"}
                  </div>
                )}
              </>
            )}

            {/* Q6: Drag/Tap EE chip to Row 1 RL column */}
            {step.id === "c1-s6" && (
              <>
                {/* Highlight RL Target cell */}
                <button
                  onClick={() => handleSlotTap("rel")}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer flex items-center justify-center text-sm font-bold ${
                    codeChipMatched
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                      : activeChipSelected
                        ? "border-emerald-400 bg-emerald-400/10 text-emerald-200 animate-pulse"
                        : "border-dashed border-yellow-400 bg-yellow-400/5 text-yellow-300"
                  }`}
                  style={{ top: "31%", left: "58.2%", width: "4.5%", height: "3.8%" }}
                >
                  {codeChipMatched ? "EE" : activeChipSelected ? "TAP SLOT" : "RL"}
                </button>

                {/* Show address reveal box */}
                {codeChipMatched && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute border-2 border-emerald-500 bg-[#14213d]/95 text-emerald-300 rounded p-1.5 font-mono text-sm shadow-lg flex items-center gap-1.5 z-10"
                    style={{ top: "37.5%", left: "27%", width: "38%", height: "16%" }}
                  >
                    <Unlock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400 uppercase font-bold tracking-wider">Address Decrypted:</div>
                      <div className="font-bold text-white text-sm">{step.data.unlockedAddress}</div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Zoom controls */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <button onClick={zoomOut} disabled={zoom <= 1} className="bg-black/70 disabled:opacity-30 border border-white/10 text-white rounded p-1.5 transition cursor-pointer flex items-center justify-center w-8 h-8"><Minus className="w-4 h-4" /></button>
            <button onClick={zoomIn} disabled={zoom >= 3.5} className="bg-black/70 disabled:opacity-30 border border-white/10 text-white rounded p-1.5 transition cursor-pointer flex items-center justify-center w-8 h-8"><Plus className="w-4 h-4" /></button>
            <button onClick={resetZoom} className="bg-black/70 border border-white/10 text-white rounded px-3 text-sm font-bold transition cursor-pointer h-8 flex items-center">Reset</button>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-sm font-mono text-emerald-300 border border-white/10">Drag · +/− zoom</div>
        </div>{/* end viewport */}
        </div>{/* end LEFT col */}

        {/* ── RIGHT: Answer panel ── */}
        <div className="lg:w-80 xl:w-96 shrink-0 min-w-0 w-full min-h-0 flex flex-col border-t lg:border-t-0 lg:border-l border-emerald-600/20 bg-[#111827]">
          <div className="px-4 py-3 border-b border-emerald-600/20 bg-emerald-800/20 shrink-0 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold shrink-0">{step.qNum}</span>
            <span className="text-base font-bold text-emerald-200 uppercase tracking-wide">Your Answer</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {/* Q1 */}
            {step.id === "c1-s1" && (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-emerald-300 leading-relaxed">Select tiles in order to build the search command:</p>
                <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-3 font-mono text-center">
                  <span className="text-emerald-400 text-xs block mb-1 uppercase tracking-wider">Preview</span>
                  <span className="text-white font-bold text-sm">{commandBuilderSlots.join(", ") || "_ _ _ _"}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {step.data.tiles.map((tile: string) => {
                    const selected = commandBuilderSlots.includes(tile);
                    return (
                      <button key={tile} onClick={() => handleCommandBuilderTileClick(tile)}
                        className={`px-3 py-2.5 rounded-xl font-mono text-sm font-bold border transition cursor-pointer ${selected ? "bg-emerald-600/30 text-emerald-400 border-emerald-500/40 line-through opacity-60" : "bg-white/10 hover:bg-white/20 border-white/20 text-white hover:border-emerald-400"}`}>
                        {tile}
                      </button>
                    );
                  })}
                </div>
                <button disabled={commandBuilderSlots.length < 4} onClick={handleCommandBuilderSubmit}
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition">
                  Execute Search
                </button>
              </div>
            )}

            {/* Q2 — rendered terminal lines, click END OF DATA */}
            {step.id === "c1-s2" && (
              <div className="flex flex-col gap-3">
                <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Click the END OF DATA line below:</p>
                <div className="bg-black/60 border border-emerald-500/20 rounded-xl p-3 font-mono text-xs flex flex-col gap-1">
                  {step.data.mainframeLines.map((line: string, i: number) => {
                    const isTarget = line.includes("END OF DATA");
                    return (
                      <button
                        key={i}
                        onClick={() => isTarget && setSpotTagTapped(true)}
                        className={`text-left px-2 py-1.5 rounded transition w-full ${
                          isTarget
                            ? spotTagTapped
                              ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                              : "text-yellow-300 hover:bg-yellow-400/10 border border-dashed border-yellow-400/40 cursor-pointer animate-pulse"
                            : "text-emerald-400/60 cursor-default"
                        }`}
                      >
                        {line}
                      </button>
                    );
                  })}
                </div>
                {spotTagTapped && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-sm font-bold text-emerald-200">END OF DATA tagged!</span>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-xs text-white/50 uppercase tracking-wider">Total Pages</span>
                      <span className="text-2xl font-black text-white font-mono">1</span>
                    </div>
                    <button onClick={handleSpotTagSubmit} className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-sm cursor-pointer transition">
                      Confirm Page Count
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Q3 — interactive scannable table, click the correct row */}
            {step.id === "c1-s3" && (
              <div className="flex flex-col gap-3">
                <div className="bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-emerald-300 space-y-1">
                  <p><strong className="text-emerald-200">Row 1</strong> — tap on the board where D-GRP = 56</p>
                  <p className="text-white/50">Row 2 — incorrect row (do not select)</p>
                </div>
                <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Click the row where D-GRP = 56:</p>
                <div className="rounded-xl overflow-hidden border border-white/10 overflow-x-auto -mx-1 px-1">
                  <div className="min-w-[520px]">
                  {/* Header */}
                  <div className="grid grid-cols-5 bg-emerald-900/60 text-sm font-bold uppercase tracking-wider text-emerald-400 px-3 py-2">
                    {["ROW", "CLIENT", "NAME", "D-GRP", "M-GRP"].map(h => <span key={h}>{h}</span>)}
                  </div>
                  {/* Row 1 — correct */}
                  <button onClick={() => dispatch({ type: "RECORD_SUCCESS" })}
                    className="w-full grid grid-cols-5 items-center px-3 py-3 bg-white/5 hover:bg-emerald-500/15 border-t border-white/5 text-left transition cursor-pointer group">
                    <span className="text-white/50 font-mono text-xs">01</span>
                    <span className="text-white font-mono text-xs font-bold">56</span>
                    <span className="text-emerald-200 font-mono text-xs truncate">JONES, M</span>
                    <span className="text-yellow-300 font-mono text-sm font-black">56</span>
                    <span className="text-white/40 font-mono text-xs">0E2045</span>
                  </button>
                  {/* Row 2 — wrong */}
                  <button onClick={() => dispatch({ type: "RECORD_ERROR" })}
                    className="w-full grid grid-cols-5 items-center px-3 py-3 bg-white/5 hover:bg-red-500/10 border-t border-white/5 text-left transition cursor-pointer">
                    <span className="text-white/50 font-mono text-xs">02</span>
                    <span className="text-white font-mono text-xs font-bold">58</span>
                    <span className="text-emerald-200 font-mono text-xs truncate">JONES, M</span>
                    <span className="text-white/40 font-mono text-sm font-black">58</span>
                    <span className="text-white/40 font-mono text-sm">0N2312</span>
                  </button>
                </div>
                </div>
                <p className="text-base text-white/40 text-center">Select the row matching the claim</p>
              </div>
            )}

            {/* Q4 — record card direct pick, no zoom gate */}
            {step.id === "c1-s4" && (
              <div className="flex flex-col gap-3">
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3 text-sm text-yellow-200">
                  Tap the highlighted <strong>Row 2 (Client 58)</strong> on the mainframe board to zoom in.
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-base space-y-1">
                  <div className="text-emerald-400/60 text-sm uppercase tracking-wider mb-2">Client 58 — Row 02</div>
                  <div className="flex justify-between"><span className="text-white/50">CLIENT</span><span className="text-white font-bold">58</span></div>
                  <div className="flex justify-between"><span className="text-white/50">NAME</span><span className="text-white font-bold">JONES, MARKUS</span></div>
                  <div className="flex justify-between"><span className="text-white/50">D-GRP</span><span className="text-white font-bold">58</span></div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-2">
                    <span className="text-yellow-300 font-bold">M-GRP</span>
                    <span className="text-white/30 italic text-sm">← select below</span>
                  </div>
                </div>
                <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Select the correct M-GRP:</p>
                <div className="grid grid-cols-2 gap-2">
                  {step.data.tiles.map((tile: string) => (
                    <button key={tile} onClick={() => handleFieldDetectivePlaceTile(tile)}
                      className="bg-white/10 hover:bg-emerald-600/40 border border-white/20 hover:border-emerald-400 text-white rounded-xl py-3 text-sm font-bold font-mono transition cursor-pointer">
                      {tile}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q5 — record card direct pick, no zoom gate */}
            {step.id === "c1-s5" && (
              <div className="flex flex-col gap-3">
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3 text-sm text-yellow-200">
                  Tap the highlighted <strong>Row 1 (Client 56)</strong> on the mainframe board to zoom in.
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-base space-y-1">
                  <div className="text-emerald-400/60 text-sm uppercase tracking-wider mb-2">Client 56 — Row 01</div>
                  <div className="flex justify-between"><span className="text-white/50">CLIENT</span><span className="text-white font-bold">56</span></div>
                  <div className="flex justify-between"><span className="text-white/50">NAME</span><span className="text-white font-bold">JONES, MARKUS L</span></div>
                  <div className="flex justify-between"><span className="text-white/50">M-GRP</span><span className="text-white font-bold">0E2045</span></div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-2">
                    <span className="text-yellow-300 font-bold">DOB</span>
                    <span className="text-white/30 italic text-sm">← select below</span>
                  </div>
                </div>
                <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Select the correct DOB:</p>
                <div className="grid grid-cols-2 gap-2">
                  {step.data.tiles.map((tile: string) => (
                    <button key={tile} onClick={() => handleFieldDetectivePlaceTile(tile)}
                      className="bg-white/10 hover:bg-emerald-600/40 border border-white/20 hover:border-emerald-400 text-white rounded-xl py-3 text-sm font-bold font-mono transition cursor-pointer">
                      {tile}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q6 — row card with blank RL field + relationship code buttons */}
            {step.id === "c1-s6" && (
              <div className="flex flex-col gap-3">
                {codeChipMatched ? (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-sm font-bold text-emerald-200">Relationship matched!</span>
                    </div>
                    <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-3 font-mono text-xs space-y-1">
                      <div className="flex justify-between"><span className="text-white/50">RL CODE</span><span className="text-emerald-300 font-bold">EE — Employee</span></div>
                      <div className="flex justify-between"><span className="text-white/50">ADDRESS</span><span className="text-emerald-200 font-bold text-sm">{step.data.unlockedAddress}</span></div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Record card with blank RL slot */}
                    <div className="bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-xs space-y-1">
                      <div className="text-emerald-400/60 text-sm uppercase tracking-wider mb-2">Client 56 — Row 01</div>
                      <div className="flex justify-between"><span className="text-white/50">NAME</span><span className="text-white font-bold">JONES, MARKUS L</span></div>
                      <div className="flex justify-between"><span className="text-white/50">D-GRP</span><span className="text-white font-bold">56</span></div>
                      <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-2">
                        <span className="text-yellow-300 font-bold">RL (Relationship)</span>
                        <span className="border border-dashed border-yellow-400/60 text-yellow-300 px-2 py-0.5 rounded text-sm animate-pulse">?</span>
                      </div>
                    </div>
                    <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Select the relationship code:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["EE", "SP", "CH", "DP"].map(code => (
                        <button key={code} onClick={() => code === "EE" ? handleMatchCodeRowClick(0) : dispatch({ type: "RECORD_ERROR" })}
                          className="bg-white/10 hover:bg-emerald-600/30 border border-white/20 hover:border-emerald-400 text-white rounded-xl py-3 text-sm font-bold font-mono transition cursor-pointer flex flex-col items-center gap-0.5">
                          <span className="text-base">{code}</span>
                          <span className="text-sm text-white/40 uppercase tracking-wider">
                            {code === "EE" ? "Employee" : code === "SP" ? "Spouse" : code === "CH" ? "Child" : "Domestic"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Q7 */}
            {step.id === "c1-s7" && (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-emerald-200 font-medium text-center">
                  <strong className="text-white">Swipe RIGHT</strong> to approve DOB <strong className="text-yellow-300">12/30/96</strong>. Swipe LEFT to reject.
                </p>
                <div className="relative h-52 w-full">
                  <AnimatePresence>
                    {step.data.cards.map((card: any, idx: number) => {
                      if (idx !== swipeIndex) return null;
                      return <SwipeCard key={card.id} card={card} onSwipe={(approve) => handleSwipeChoice(card.id, approve)} />;
                    })}
                  </AnimatePresence>
                </div>
              </div>
            )}

          </div>{/* end controls body */}
        </div>{/* end RIGHT panel */}
      </div>{/* end side-by-side */}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Case 2 Interactive Image Board
// ---------------------------------------------------------------------------

interface Case2InteractiveBoardProps {
  step: any;
  dispatch: any;
  // Q8 tally
  tallyTapCount: string[];
  setTallyTapCount: React.Dispatch<React.SetStateAction<string[]>>;
  spotTagTapped: boolean;
  setSpotTagTapped: React.Dispatch<React.SetStateAction<boolean>>;
  // Q9 hotspot tap
  hotspotTapMatches: string[];
  handleHotspotFieldTap: (id: string) => void;
  // Q11 multi-select
  multiSelectSelected: string[];
  setMultiSelectSelected: React.Dispatch<React.SetStateAction<string[]>>;
  handleMultiSelectSubmit: () => void;
  // Q12 map pin
  pinDroppedCardId: string | null;
  handleMapPinDrop: (cardId: string) => void;
}

function Case2InteractiveBoard({
  step,
  dispatch,
  tallyTapCount,
  setTallyTapCount,
  spotTagTapped,
  setSpotTagTapped,
  hotspotTapMatches,
  handleHotspotFieldTap,
  multiSelectSelected,
  setMultiSelectSelected,
  handleMultiSelectSubmit,
  pinDroppedCardId,
  handleMapPinDrop,
}: Case2InteractiveBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [pinSelected, setPinSelected] = useState(false);

  const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const zoomIn = () => setZoom(z => Math.min(3.5, z + 0.25));
  const zoomOut = () => setZoom(z => Math.max(1, z - 0.25));

  const autoZoomTo = (cx: number, cy: number, level = 2.2) => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    setZoom(level);
    setPan({ x: w * (0.5 - cx * level), y: h * (0.5 - cy * level) });
  };

  useEffect(() => {
    resetZoom();
    setPinSelected(false);
  }, [step.id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, input")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const w = containerRef.current?.clientWidth || 800;
    const h = containerRef.current?.clientHeight || 450;
    const lx = w * (zoom - 0.5), ly = h * (zoom - 0.5);
    setPan({
      x: Math.max(-lx, Math.min(lx, e.clientX - dragStart.x)),
      y: Math.max(-ly, Math.min(ly, e.clientY - dragStart.y)),
    });
  };
  const handlePointerUp = () => setIsDragging(false);

  // Q8 — tap a row to tally it
  const handleRowTally = (rowId: string) => {
    if (!tallyTapCount.includes(rowId)) {
      const updated = [...tallyTapCount, rowId];
      setTallyTapCount(updated);
    }
  };

  // Q8 — tap END OF DATA to confirm
  const handleEndOfDataTap = () => {
    if (tallyTapCount.length === 3) {
      setSpotTagTapped(true);
      setTimeout(() => dispatch({ type: "RECORD_SUCCESS" }), 700);
    }
  };

  const allRowsTallied = tallyTapCount.length >= 3;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row bg-[#1a1a2e] border-2 border-emerald-600/30 rounded-2xl overflow-hidden shadow-lg select-none">

        {/* ── LEFT: image viewport ── */}
        <div className="flex flex-1 min-h-0 flex-col lg:flex-[3] min-w-0">
          <div className="flex items-center justify-between bg-emerald-700 text-[#E9F8F0] px-4 py-2 font-sans border-b border-emerald-800 shrink-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#25BB64] animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-wider">ASI MAINBOARD — KENTUCKY PORTAL</span>
            </div>
            <span className="text-sm font-mono text-emerald-300">ZOOM: {Math.round(zoom * 100)}%</span>
          </div>
           <div
            ref={containerRef}
            className="relative flex-1 min-h-[200px] w-full bg-black overflow-hidden cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
          {/* Zoomable wrapper */}
          <div
            className="w-full h-full relative"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.15s ease-out",
            }}
          >
            <img
              src={step.imageUrl}
              alt="Kentucky Mainframe"
              className="w-full h-full object-contain pointer-events-none select-none"
            />

            {/* ── Q8: Row tap targets + END OF DATA hotspot ── */}
            {step.id === "c2-s1" && (
              <>
                {/* Row 1 — Mount Sterling */}
                <button
                  onClick={() => handleRowTally("ky-1")}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer min-h-[44px] ${
                    tallyTapCount.includes("ky-1")
                      ? "border-emerald-500 bg-emerald-500/15"
                      : "border-dashed border-yellow-400/60 hover:border-yellow-400 bg-yellow-400/5 hover:bg-yellow-400/10 animate-pulse"
                  }`}
                  style={{ top: "29%", left: "21%", width: "57%", height: "9%" }}
                >
                  {tallyTapCount.includes("ky-1") && (
                    <span className="absolute top-1 right-1 bg-emerald-500 text-white text-sm font-bold rounded px-1">✓ 1</span>
                  )}
                </button>

                {/* Row 2 — Winchester */}
                <button
                  onClick={() => handleRowTally("ky-2")}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer ${
                    tallyTapCount.includes("ky-2")
                      ? "border-emerald-500 bg-emerald-500/15"
                      : "border-dashed border-yellow-400/60 hover:border-yellow-400 bg-yellow-400/5 hover:bg-yellow-400/10 animate-pulse"
                  }`}
                  style={{ top: "41.5%", left: "21%", width: "57%", height: "9%" }}
                >
                  {tallyTapCount.includes("ky-2") && (
                    <span className="absolute top-1 right-1 bg-emerald-500 text-white text-sm font-bold rounded px-1">✓ 2</span>
                  )}
                </button>

                {/* Row 3 — Erlanger */}
                <button
                  onClick={() => handleRowTally("ky-3")}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer ${
                    tallyTapCount.includes("ky-3")
                      ? "border-emerald-500 bg-emerald-500/15"
                      : "border-dashed border-yellow-400/60 hover:border-yellow-400 bg-yellow-400/5 hover:bg-yellow-400/10 animate-pulse"
                  }`}
                  style={{ top: "54%", left: "21%", width: "57%", height: "10%" }}
                >
                  {tallyTapCount.includes("ky-3") && (
                    <span className="absolute top-1 right-1 bg-emerald-500 text-white text-sm font-bold rounded px-1">✓ 3</span>
                  )}
                </button>

                {/* END OF DATA hotspot */}
                <button
                  onClick={handleEndOfDataTap}
                  disabled={!allRowsTallied}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer ${
                    spotTagTapped
                      ? "border-emerald-500 bg-emerald-500/20"
                      : allRowsTallied
                        ? "border-emerald-400 bg-emerald-400/10 animate-pulse"
                        : "border-dashed border-white/20 opacity-40 cursor-not-allowed"
                  }`}
                  style={{ top: "13.5%", left: "22.8%", width: "11%", height: "3.5%" }}
                />
              </>
            )}

            {/* ── Q9: UMID hotspot — H43303654 on Row 3 ── */}
            {step.id === "c2-s2" && (
              <>
                {/* Wrong targets — Row 1 & Row 2 have no UMID */}
                <button
                  onClick={() => handleHotspotFieldTap("ky-1-umid-wrong")}
                  className="absolute rounded border-2 border-dashed border-white/10 hover:border-red-400/40 bg-transparent hover:bg-red-400/5 cursor-pointer transition"
                  style={{ top: "29%", left: "21%", width: "57%", height: "9%" }}
                />
                <button
                  onClick={() => handleHotspotFieldTap("ky-2-umid-wrong")}
                  className="absolute rounded border-2 border-dashed border-white/10 hover:border-red-400/40 bg-transparent hover:bg-red-400/5 cursor-pointer transition"
                  style={{ top: "41.5%", left: "21%", width: "57%", height: "9%" }}
                />
                {/* Correct — Row 3 UMID H43303654 */}
                <button
                  onClick={() => handleHotspotFieldTap("ky-3-umid")}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    hotspotTapMatches.includes("ky-3-umid")
                      ? "border-emerald-500 bg-emerald-500/20"
                      : "border-dashed border-yellow-400/70 bg-yellow-400/8 animate-pulse hover:bg-yellow-400/15"
                  }`}
                  style={{ top: "61.5%", left: "57%", width: "9%", height: "3.5%" }}
                >
                  {hotspotTapMatches.includes("ky-3-umid") && (
                    <Check className="w-3 h-3 text-emerald-400" />
                  )}
                </button>
              </>
            )}

            {/* ── Q10: Suffix "1" on Row 1 S column ── */}
            {step.id === "c2-s3" && (
              <>
                {/* Row 1 S column — correct "1" */}
                <button
                  onClick={() => handleHotspotFieldTap("ky-1-suffix")}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer flex items-center justify-center text-sm font-bold ${
                    hotspotTapMatches.includes("ky-1-suffix")
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                      : "border-dashed border-yellow-400/70 animate-pulse hover:bg-yellow-400/10"
                  }`}
                  style={{ top: "30%", left: "56.2%", width: "2.5%", height: "3.5%" }}
                />
                {/* Row 2 S column — blank (wrong tap) */}
                <button
                  onClick={() => handleHotspotFieldTap("ky-2-suffix-wrong")}
                  className="absolute rounded border-2 border-dashed border-white/10 hover:border-red-400/40 bg-transparent cursor-pointer transition"
                  style={{ top: "42.5%", left: "56.2%", width: "2.5%", height: "3.5%" }}
                />
                {/* Row 3 S column — blank (wrong tap) */}
                <button
                  onClick={() => handleHotspotFieldTap("ky-3-suffix-wrong")}
                  className="absolute rounded border-2 border-dashed border-white/10 hover:border-red-400/40 bg-transparent cursor-pointer transition"
                  style={{ top: "55%", left: "56.2%", width: "2.5%", height: "3.5%" }}
                />
              </>
            )}

            {/* ── Q11: Blank suffix rows — Row 2 & Row 3 ── */}
            {step.id === "c2-s4" && (
              <>
                {/* Row 1 — has suffix "1" so it's wrong */}
                <button
                  onClick={() => {
                    if (!multiSelectSelected.includes("ky-1-suffix-blank")) {
                      dispatch({ type: "RECORD_ERROR" });
                    }
                  }}
                  className="absolute rounded border-2 border-dashed border-white/15 hover:border-red-400/40 bg-transparent hover:bg-red-400/5 cursor-pointer transition min-h-[44px]"
                  style={{ top: "29%", left: "21%", width: "57%", height: "9%" }}
                  aria-label="Row 1 has suffix — do not select"
                />
                {/* Row 2 — blank suffix (correct) */}
                <button
                  onClick={() => {
                    if (!multiSelectSelected.includes("ky-2-suffix-blank")) {
                      setMultiSelectSelected(prev => [...prev, "ky-2-suffix-blank"]);
                    } else {
                      setMultiSelectSelected(prev => prev.filter(id => id !== "ky-2-suffix-blank"));
                    }
                  }}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer ${
                    multiSelectSelected.includes("ky-2-suffix-blank")
                      ? "border-emerald-500 bg-emerald-500/15"
                      : "border-dashed border-yellow-400/60 hover:border-yellow-400 hover:bg-yellow-400/8"
                  }`}
                  style={{ top: "41.5%", left: "21%", width: "57%", height: "9%" }}
                >
                  {multiSelectSelected.includes("ky-2-suffix-blank") && (
                    <span className="absolute top-1 right-1 bg-emerald-500 text-white text-sm font-bold rounded px-1">✓ BLANK</span>
                  )}
                </button>
                {/* Row 3 — blank suffix (correct) */}
                <button
                  onClick={() => {
                    if (!multiSelectSelected.includes("ky-3-suffix-blank")) {
                      setMultiSelectSelected(prev => [...prev, "ky-3-suffix-blank"]);
                    } else {
                      setMultiSelectSelected(prev => prev.filter(id => id !== "ky-3-suffix-blank"));
                    }
                  }}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer ${
                    multiSelectSelected.includes("ky-3-suffix-blank")
                      ? "border-emerald-500 bg-emerald-500/15"
                      : "border-dashed border-yellow-400/60 hover:border-yellow-400 hover:bg-yellow-400/8"
                  }`}
                  style={{ top: "54%", left: "21%", width: "57%", height: "10%" }}
                >
                  {multiSelectSelected.includes("ky-3-suffix-blank") && (
                    <span className="absolute top-1 right-1 bg-emerald-500 text-white text-sm font-bold rounded px-1">✓ BLANK</span>
                  )}
                </button>
              </>
            )}

            {/* ── Q12: Map pin — drop on Erlanger (Row 3) address ── */}
            {step.id === "c2-s5" && (
              <>
                {/* Row 1 address — wrong */}
                <button
                  onClick={() => { if (pinSelected) handleMapPinDrop("ky-1"); }}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer ${
                    pinDroppedCardId === "ky-1"
                      ? "border-red-500 bg-red-500/15"
                      : pinSelected
                        ? "border-dashed border-emerald-400/50 hover:border-emerald-400 hover:bg-emerald-400/10 animate-pulse"
                        : "border-dashed border-white/10 hover:border-white/25"
                  }`}
                  style={{ top: "33%", left: "21%", width: "38%", height: "4%" }}
                />
                {/* Row 2 address — wrong */}
                <button
                  onClick={() => { if (pinSelected) handleMapPinDrop("ky-2"); }}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer ${
                    pinDroppedCardId === "ky-2"
                      ? "border-red-500 bg-red-500/15"
                      : pinSelected
                        ? "border-dashed border-emerald-400/50 hover:border-emerald-400 hover:bg-emerald-400/10 animate-pulse"
                        : "border-dashed border-white/10 hover:border-white/25"
                  }`}
                  style={{ top: "45.5%", left: "21%", width: "38%", height: "4%" }}
                />
                {/* Row 3 address — Erlanger, KY (correct) */}
                <button
                  onClick={() => { if (pinSelected) handleMapPinDrop("ky-3"); }}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    pinDroppedCardId === "ky-3"
                      ? "border-emerald-500 bg-emerald-500/20"
                      : pinSelected
                        ? "border-emerald-400 bg-emerald-400/10 animate-pulse"
                        : "border-dashed border-white/10 hover:border-white/25"
                  }`}
                  style={{ top: "57.5%", left: "21%", width: "38%", height: "4%" }}
                >
                  {pinDroppedCardId === "ky-3" && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span className="text-sm text-emerald-300 font-bold">PINNED</span>
                    </motion.div>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Zoom controls */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <button onClick={zoomOut} disabled={zoom <= 1} className="bg-black/70 disabled:opacity-30 border border-white/10 text-white rounded p-1.5 transition cursor-pointer flex items-center justify-center w-8 h-8"><Minus className="w-4 h-4" /></button>
            <button onClick={zoomIn} disabled={zoom >= 3.5} className="bg-black/70 disabled:opacity-30 border border-white/10 text-white rounded p-1.5 transition cursor-pointer flex items-center justify-center w-8 h-8"><Plus className="w-4 h-4" /></button>
            <button onClick={resetZoom} className="bg-black/70 border border-white/10 text-white rounded px-3 text-sm font-bold transition cursor-pointer h-8 flex items-center">Reset</button>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-sm font-mono text-emerald-300 border border-white/10">Drag · +/− zoom</div>
        </div>{/* end viewport */}
        </div>{/* end LEFT col */}

        {/* ── RIGHT: answer panel ── */}
        <div className="lg:w-80 xl:w-96 shrink-0 min-w-0 w-full min-h-0 flex flex-col border-t lg:border-t-0 lg:border-l border-emerald-600/20 bg-[#111827]">
          <div className="px-4 py-3 border-b border-emerald-600/20 bg-emerald-800/20 shrink-0 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold shrink-0">{step.qNum}</span>
            <span className="text-base font-bold text-emerald-200 uppercase tracking-wide">Your Answer</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

            {/* Q8 — checkbox list of 3 records */}
            {step.id === "c2-s1" && (() => {
              const records = [
                { id: "ky-1", city: "Mount Sterling, KY", name: "JONES, MARKUS", client: "56" },
                { id: "ky-2", city: "Winchester, KY",     name: "JONES, MARKUS", client: "56" },
                { id: "ky-3", city: "Erlanger, KY",       name: "JONES, MARKUS", client: "56" },
              ];
              const allChecked = records.every(r => tallyTapCount.includes(r.id));
              return (
                <div className="flex flex-col gap-3">
                  <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Check off each record found:</p>
                  <div className="flex flex-col gap-2">
                    {records.map((r, i) => {
                      const checked = tallyTapCount.includes(r.id);
                      return (
                        <button key={r.id}
                          onClick={() => { if (!checked) { const u = [...tallyTapCount, r.id]; setTallyTapCount(u); } }}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${checked ? "border-emerald-500/60 bg-emerald-500/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
                          <div className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition ${checked ? "bg-emerald-500 border-emerald-500" : "border-white/30"}`}>
                            {checked && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white font-mono">Record {i + 1}</div>
                            <div className="text-sm text-emerald-300">{r.city}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between bg-black/30 rounded-xl px-3 py-2">
                    <span className="text-xs text-white/50 uppercase tracking-wider">Count</span>
                    <span className="font-mono font-black text-white text-lg">{tallyTapCount.length} / 3</span>
                  </div>
                  {allChecked && (
                    <button onClick={() => { setSpotTagTapped(true); setTimeout(() => dispatch({ type: "RECORD_SUCCESS" }), 500); }}
                      className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-sm cursor-pointer transition">
                      Confirm Count (3 Records)
                    </button>
                  )}
                </div>
              );
            })()}

            {/* Q9 — scan cards, click UMID on correct card */}
            {step.id === "c2-s2" && (() => {
              const cards = [
                { id: "ky-1", label: "Record 1 — Mount Sterling", umid: null,         suffix: "1", rel: "CH" },
                { id: "ky-2", label: "Record 2 — Winchester",     umid: null,         suffix: "",  rel: "EE" },
                { id: "ky-3", label: "Record 3 — Erlanger",       umid: "H43303654",  suffix: "",  rel: "EE" },
              ];
              const found = hotspotTapMatches.includes("ky-3-umid");
              return (
                <div className="flex flex-col gap-3">
                  <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Click the UMID starting with "H":</p>
                  <div className="flex flex-col gap-2">
                    {cards.map(c => (
                      <div key={c.id} className="bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-xs space-y-1">
                        <div className="text-emerald-400/60 text-sm uppercase tracking-wider mb-1">{c.label}</div>
                        <div className="flex justify-between"><span className="text-white/40">SUFFIX (S)</span><span className="text-white">{c.suffix || "—"}</span></div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">UMID</span>
                          {c.umid ? (
                            <button onClick={() => !found && handleHotspotFieldTap("ky-3-umid")}
                              className={`px-2 py-0.5 rounded font-bold border transition cursor-pointer text-xs ${found ? "bg-emerald-500/30 border-emerald-500/60 text-emerald-300" : "bg-yellow-400/10 border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/20 animate-pulse"}`}>
                              {c.umid}
                            </button>
                          ) : (
                            <span className="text-white/20 italic">—</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {found && <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3"><Check className="w-4 h-4 text-emerald-400 shrink-0" /><span className="text-sm font-bold text-emerald-200">UMID H43303654 confirmed!</span></div>}
                </div>
              );
            })()}

            {/* Q10 — suffix column table, click the cell showing "1" */}
            {step.id === "c2-s3" && (() => {
              const rows = [
                { id: "ky-1", label: "Row 1 — Mount Sterling", suffix: "1" },
                { id: "ky-2", label: "Row 2 — Winchester",     suffix: "" },
                { id: "ky-3", label: "Row 3 — Erlanger",       suffix: "" },
              ];
              const found = hotspotTapMatches.includes("ky-1-suffix");
              return (
                <div className="flex flex-col gap-3">
                  <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Click the suffix value "1":</p>
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <div className="grid grid-cols-3 bg-emerald-900/60 text-sm font-bold uppercase tracking-wider text-emerald-400 px-3 py-2">
                      <span>Row</span><span>Location</span><span className="text-center">S (Suffix)</span>
                    </div>
                    {rows.map(r => (
                      <div key={r.id} className="grid grid-cols-3 items-center px-3 py-2.5 border-t border-white/5 bg-white/5">
                        <span className="text-white/50 font-mono text-xs">{r.id.replace("ky-", "")}</span>
                        <span className="text-emerald-200 font-mono text-xs">{r.label.split("—")[1].trim()}</span>
                        <div className="flex justify-center">
                          {r.suffix ? (
                            <button onClick={() => !found && handleHotspotFieldTap("ky-1-suffix")}
                              className={`w-8 h-8 rounded-lg font-mono font-black text-sm border transition cursor-pointer ${found ? "bg-emerald-500/30 border-emerald-500/60 text-emerald-300" : "bg-yellow-400/15 border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/25 animate-pulse"}`}>
                              {r.suffix}
                            </button>
                          ) : (
                            <span className="text-white/20 font-mono text-xs">—</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {found && <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3"><Check className="w-4 h-4 text-emerald-400 shrink-0" /><span className="text-sm font-bold text-emerald-200">Suffix "1" found on Row 1!</span></div>}
                </div>
              );
            })()}

            {/* Q11 — multi-select checkboxes for blank suffix rows */}
            {step.id === "c2-s4" && (() => {
              const rows = [
                { id: "ky-1-suffix-blank", label: "Row 1 — Mount Sterling", suffix: "1",  isBlank: false },
                { id: "ky-2-suffix-blank", label: "Row 2 — Winchester",     suffix: "—", isBlank: true  },
                { id: "ky-3-suffix-blank", label: "Row 3 — Erlanger",       suffix: "—", isBlank: true  },
              ];
              return (
                <div className="flex flex-col gap-3">
                  <div className="bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-emerald-300 space-y-1">
                    <p><strong className="text-yellow-300">Row 1</strong> has a suffix — do not select</p>
                    <p>Select rows with <strong>blank suffix</strong> on the board or below</p>
                  </div>
                  <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Select all rows with a blank suffix:</p>
                  <div className="flex flex-col gap-2">
                    {rows.map(r => {
                      const selected = multiSelectSelected.includes(r.id);
                      return (
                        <button key={r.id}
                          onClick={() => {
                            if (r.isBlank) {
                              setMultiSelectSelected(prev => selected ? prev.filter(x => x !== r.id) : [...prev, r.id]);
                            } else {
                              dispatch({ type: "RECORD_ERROR" });
                            }
                          }}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${selected ? "border-emerald-500/60 bg-emerald-500/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
                          <div className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 ${selected ? "bg-emerald-500 border-emerald-500" : "border-white/30"}`}>
                            {selected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-bold text-white">{r.label}</div>
                            <div className="text-sm text-white/40 font-mono">S = {r.suffix}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <button disabled={multiSelectSelected.length < 2} onClick={handleMultiSelectSubmit}
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition">
                    Confirm ({multiSelectSelected.length} selected)
                  </button>
                </div>
              );
            })()}

            {/* Q12 — address card picker */}
            {step.id === "c2-s5" && (() => {
              const addresses = [
                { id: "ky-1", city: "MOUNT STERLING, KY 40353", street: "1248 MAIN ST" },
                { id: "ky-2", city: "WINCHESTER, KY 40391",     street: "502 BYPASS RD" },
                { id: "ky-3", city: "ERLANGER, KY 41018",       street: "321 COMMONWEALTH AVE" },
              ];
              return (
                <div className="flex flex-col gap-3">
                  <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Select the Erlanger, KY address:</p>
                  <div className="flex flex-col gap-2">
                    {addresses.map(a => {
                      const picked = pinDroppedCardId === a.id;
                      return (
                        <button key={a.id} onClick={() => handleMapPinDrop(a.id)}
                          className={`flex items-start gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${
                            picked
                              ? a.id === "ky-3" ? "border-emerald-500/60 bg-emerald-500/15" : "border-red-500/40 bg-red-500/10"
                              : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}>
                          <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${picked ? a.id === "ky-3" ? "text-emerald-400" : "text-red-400" : "text-white/30"}`} />
                          <div>
                            <div className="text-xs font-bold text-white font-mono">{a.street}</div>
                            <div className="text-sm text-emerald-300 font-mono">{a.city}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

          </div>
        </div>{/* end RIGHT */}
      </div>{/* end side-by-side */}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Case 3 Interactive Board — The MRI Mission
// Phase 1: Re-confirm Erlanger on Image 2
// Phase 2: Drag-to-order navigation steps
// Phase 3: Tap the SELECT="MR" field on Image 3
// ---------------------------------------------------------------------------

function Case3InteractiveBoard({ step, dispatch }: { step: any; dispatch: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Phase tracker: 1 = confirm Erlanger, 2 = sequence builder, 3 = tap SELECT
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  // Phase 1 state
  const [erlRowConfirmed, setErlRowConfirmed] = useState(false);

  // Phase 2 state — drag-to-order
  const [seqSlots, setSeqSlots] = useState<Array<{ id: string; text: string } | null>>([null, null]);
  const [dragItem, setDragItem] = useState<{ id: string; text: string } | null>(null);

  // Phase 3 state
  const [selectTapped, setSelectTapped] = useState(false);

  const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  const zoomIn  = () => setZoom(z => Math.min(3.5, z + 0.25));
  const zoomOut = () => setZoom(z => Math.max(1, z - 0.25));

  const autoZoomTo = (cx: number, cy: number, level = 2.2) => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    setZoom(level);
    setPan({ x: w * (0.5 - cx * level), y: h * (0.5 - cy * level) });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, input")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const w = containerRef.current?.clientWidth || 800;
    const h = containerRef.current?.clientHeight || 450;
    const lx = w * (zoom - 0.5), ly = h * (zoom - 0.5);
    setPan({
      x: Math.max(-lx, Math.min(lx, e.clientX - dragStart.x)),
      y: Math.max(-ly, Math.min(ly, e.clientY - dragStart.y)),
    });
  };
  const handlePointerUp = () => setIsDragging(false);

  // Active image depends on phase
  const currentImage = phase === 1 ? step.data.img2 : step.data.img3;

  // Phase 1: tap Erlanger row
  const handleErlRow = () => {
    setErlRowConfirmed(true);
    autoZoomTo(0.38, 0.64, 1.9);
    setTimeout(() => {
      resetZoom();
      setPhase(2);
    }, 1200);
  };

  // Phase 2: drop a card into a slot
  const handleSlotDrop = (slotIdx: number) => {
    if (!dragItem) return;
    // Already placed that item elsewhere — clear it first
    const cleared = seqSlots.map(s => (s?.id === dragItem.id ? null : s));
    cleared[slotIdx] = dragItem;
    setSeqSlots(cleared as typeof seqSlots);
    setDragItem(null);
  };

  const removeFromSlot = (slotIdx: number) => {
    const updated = [...seqSlots];
    updated[slotIdx] = null;
    setSeqSlots(updated);
  };

  const seqCorrect =
    seqSlots[0]?.id === step.correctAnswer.sequence[0] &&
    seqSlots[1]?.id === step.correctAnswer.sequence[1];

  const handleSeqConfirm = () => {
    if (seqCorrect) {
      resetZoom();
      setPhase(3);
      // Zoom to SELECT field on Image 3
      setTimeout(() => autoZoomTo(0.08, 0.54, 2.4), 300);
    } else {
      dispatch({ type: "RECORD_ERROR" });
      setSeqSlots([null, null]);
    }
  };

  // Phase 3: tap SELECT = MR
  const handleSelectTap = () => {
    setSelectTapped(true);
    setTimeout(() => dispatch({ type: "RECORD_SUCCESS" }), 900);
  };

  // Tiles available for phase 2 (filter out already placed)
  const placedIds = seqSlots.filter(Boolean).map(s => s!.id);
  const availableTiles = (step.data.sequenceSteps as Array<{ id: string; text: string }>).filter(
    s => !placedIds.includes(s.id)
  );

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      {/* Phase strip */}
      <div className="flex shrink-0 items-center gap-2 px-1">
        {([1, 2, 3] as const).map(p => (
          <div key={p} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border transition-all ${
            phase === p ? "bg-emerald-600 text-white border-emerald-700 shadow-md"
              : phase > p ? "bg-emerald-100 text-emerald-700 border-emerald-200"
              : "bg-white text-slate-400 border-slate-200"
          }`}>
            {phase > p ? "✓" : p}
            <span>{p === 1 ? "Confirm Record" : p === 2 ? "Order Steps" : "Select MR"}</span>
          </div>
        ))}
      </div>

      {/* Side-by-side board */}
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row bg-[#1a1a2e] border-2 border-emerald-600/30 rounded-2xl overflow-hidden shadow-lg select-none">

        {/* LEFT: image */}
        <div className="flex flex-1 min-h-0 flex-col lg:flex-[3] min-w-0">
          <div className="flex items-center justify-between bg-emerald-700 text-[#E9F8F0] px-4 py-2 border-b border-emerald-800 shrink-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#25BB64] animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-wider">
                ASI MAINBOARD — {phase === 1 ? "KENTUCKY RECALL" : "MR NAVIGATION"}
              </span>
            </div>
            <span className="text-sm font-mono text-emerald-300">ZOOM: {Math.round(zoom * 100)}%</span>
          </div>
          <div ref={containerRef} className="relative flex-1 min-h-[200px] w-full bg-black overflow-hidden cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
            <div className="w-full h-full relative" style={{ transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`, transformOrigin: "center center", transition: isDragging ? "none" : "transform 0.15s ease-out" }}>
              <img src={currentImage} alt="Mainframe" className="w-full h-full object-contain pointer-events-none select-none" />

            {/* Phase 1: Erlanger (Row 3) highlight on Image 2 */}
            {phase === 1 && (
              <>
                {/* Rows 1 & 2 — dimmed decoy */}
                <div className="absolute rounded border border-white/10 bg-black/10" style={{ top: "29%", left: "21%", width: "57%", height: "9%" }} />
                <div className="absolute rounded border border-white/10 bg-black/10" style={{ top: "41.5%", left: "21%", width: "57%", height: "9%" }} />
                {/* Row 3 — Erlanger target */}
                <button
                  onClick={handleErlRow}
                  className={`absolute rounded border-2 transition-all duration-500 cursor-pointer flex items-center justify-center ${
                    erlRowConfirmed
                      ? "border-emerald-500 bg-emerald-500/25 shadow-[0_0_12px_2px_rgba(16,185,129,0.5)]"
                      : "border-dashed border-yellow-400/80 bg-yellow-400/8 animate-pulse hover:bg-yellow-400/15 hover:border-yellow-400"
                  }`}
                  style={{ top: "54%", left: "21%", width: "57%", height: "10%" }}
                >
                  {!erlRowConfirmed && (
                    <span className="bg-black/70 text-yellow-300 text-sm font-bold px-2 py-0.5 rounded border border-yellow-400/40 uppercase tracking-wider">
                      Tap to re-confirm Erlanger record
                    </span>
                  )}
                  {erlRowConfirmed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-emerald-500/90 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3" /> ERLANGER — H43303654 confirmed!
                    </motion.span>
                  )}
                </button>

                {/* UMID callout — Row 3 line 3 */}
                <div
                  className="absolute border border-emerald-500/50 bg-[#0d1f12]/80 rounded px-1.5 py-0.5 font-mono text-sm text-emerald-300 pointer-events-none"
                  style={{ top: "62%", left: "57%", width: "11%" }}
                >
                  H43303654
                </div>
              </>
            )}

            {/* Phase 2: Sequence builder — IMAGE 3 visible, no overlays needed */}
            {phase === 2 && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                <span className="bg-emerald-900/90 border border-emerald-500 text-emerald-200 text-sm font-bold px-3 py-1.5 rounded-lg tracking-wider">
                  ORDER THE STEPS BELOW ↓ THEN CLICK CONFIRM
                </span>
              </div>
            )}

            {/* Phase 3: SELECT = MR field highlight on Image 3 */}
            {phase === 3 && (
              <>
                {/* Dim everything except the SELECT cell area */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                {/* SELECT "MR" cell on Row 3 — leftmost column, ~54% down */}
                <button
                  onClick={handleSelectTap}
                  className={`absolute rounded border-2 transition-all duration-300 cursor-pointer flex items-center justify-center z-10 ${
                    selectTapped
                      ? "border-emerald-500 bg-emerald-500/30 shadow-[0_0_16px_4px_rgba(16,185,129,0.6)]"
                      : "border-yellow-400 bg-yellow-400/15 animate-pulse hover:bg-yellow-400/25"
                  }`}
                  style={{ top: "53%", left: "2.5%", width: "5.5%", height: "4.5%" }}
                >
                  {!selectTapped && (
                    <span className="text-yellow-300 font-mono text-sm font-extrabold">MR</span>
                  )}
                  {selectTapped && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </motion.span>
                  )}
                </button>

                {/* Arrow callout */}
                {!selectTapped && (
                  <div
                    className="absolute z-10 pointer-events-none"
                    style={{ top: "44%", left: "3%", width: "12%" }}
                  >
                    <div className="bg-black/80 border border-yellow-400/60 text-yellow-300 text-sm font-bold px-2 py-1 rounded text-center leading-tight">
                      SELECT = MR<br />Tap to confirm!
                    </div>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-yellow-400/60 mx-auto mt-0" />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Zoom controls */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <button onClick={zoomOut} disabled={zoom <= 1} className="bg-black/70 disabled:opacity-30 border border-white/10 text-white rounded p-1.5 transition cursor-pointer flex items-center justify-center w-8 h-8"><Minus className="w-4 h-4" /></button>
            <button onClick={zoomIn} disabled={zoom >= 3.5} className="bg-black/70 disabled:opacity-30 border border-white/10 text-white rounded p-1.5 transition cursor-pointer flex items-center justify-center w-8 h-8"><Plus className="w-4 h-4" /></button>
            <button onClick={resetZoom} className="bg-black/70 border border-white/10 text-white rounded px-3 text-sm font-bold transition cursor-pointer h-8 flex items-center">Reset</button>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-sm font-mono text-emerald-300 border border-white/10">Drag · +/− zoom</div>
        </div>{/* end viewport */}
        </div>{/* end LEFT */}

        {/* RIGHT: answer panel */}
        <div className="lg:w-80 xl:w-96 shrink-0 min-w-0 w-full min-h-0 flex flex-col border-t lg:border-t-0 lg:border-l border-emerald-600/20 bg-[#111827]">
          <div className="px-4 py-3 border-b border-emerald-600/20 bg-emerald-800/20 shrink-0 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold shrink-0">{step.qNum}</span>
            <span className="text-base font-bold text-emerald-200 uppercase tracking-wide">
              {phase === 1 ? "Confirm Record" : phase === 2 ? "Order Steps" : "Select Navigation"}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

            {/* Phase 1 — record confirm cards */}
            {phase === 1 && (
              <div className="flex flex-col gap-3">
                <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Select the Erlanger record to re-confirm:</p>
                {[
                  { id: "ky-1", city: "Mount Sterling, KY", umid: null },
                  { id: "ky-2", city: "Winchester, KY",     umid: null },
                  { id: "ky-3", city: "Erlanger, KY",       umid: "H43303654" },
                ].map(r => (
                  <button key={r.id}
                    onClick={() => r.id === "ky-3" ? handleErlRow() : dispatch({ type: "RECORD_ERROR" })}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${
                      erlRowConfirmed && r.id === "ky-3"
                        ? "border-emerald-500/60 bg-emerald-500/15"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${erlRowConfirmed && r.id === "ky-3" ? "bg-emerald-500 border-emerald-500" : "border-white/30"}`}>
                      {erlRowConfirmed && r.id === "ky-3" && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{r.city}</div>
                      {r.umid && <div className="text-xs font-mono text-emerald-300 mt-0.5">UMID: {r.umid}</div>}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Phase 2 — drag-to-order (keep existing) */}
            {phase === 2 && (
              <div className="flex flex-col gap-4">
                <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Drag steps into the correct order:</p>
                <div className="flex flex-col gap-2">
                  {[0, 1].map(slotIdx => (
                    <div key={slotIdx} onDragOver={e => e.preventDefault()} onDrop={() => handleSlotDrop(slotIdx)}
                      className={`flex items-center gap-3 rounded-xl border-2 px-3 py-3 transition-all min-h-[48px] ${seqSlots[slotIdx] ? "border-emerald-500 bg-emerald-500/15" : "border-dashed border-emerald-500/30 bg-white/5 hover:bg-white/10"}`}>
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${seqSlots[slotIdx] ? "bg-emerald-500 text-white" : "bg-white/10 text-white/50"}`}>{slotIdx + 1}</span>
                      {seqSlots[slotIdx] ? (
                        <span className="flex-1 text-sm font-bold text-white">{seqSlots[slotIdx]!.text}</span>
                      ) : (
                        <span className="flex-1 text-xs text-white/30 italic">Drop step here…</span>
                      )}
                      {seqSlots[slotIdx] && <button onClick={() => removeFromSlot(slotIdx)} className="text-white/30 hover:text-red-400 cursor-pointer transition"><X className="w-3.5 h-3.5" /></button>}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {availableTiles.map(tile => (
                    <div key={tile.id} draggable onDragStart={() => setDragItem(tile)} onDragEnd={() => setDragItem(null)}
                      className="px-3 py-2.5 rounded-xl border border-emerald-500/30 bg-white/10 text-sm font-bold text-white cursor-grab hover:bg-white/15 hover:border-emerald-400 transition select-none">
                      {tile.text}
                    </div>
                  ))}
                </div>
                <button disabled={!seqSlots[0] || !seqSlots[1]} onClick={handleSeqConfirm}
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition">
                  Confirm Order
                </button>
              </div>
            )}

            {/* Phase 3 — SELECT option picker */}
            {phase === 3 && (
              <div className="flex flex-col gap-3">
                <p className="text-base text-emerald-400 uppercase tracking-wider font-bold">Choose the correct SELECT value:</p>
                <div className="bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-xs space-y-1">
                  <div className="text-emerald-400/60 text-sm uppercase tracking-wider mb-2">Navigation Screen — Row 3</div>
                  <div className="flex justify-between"><span className="text-white/40">UMID</span><span className="text-emerald-300">H43303654</span></div>
                  <div className="flex justify-between"><span className="text-white/40">CITY</span><span className="text-white">ERLANGER, KY</span></div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-2">
                    <span className="text-yellow-300 font-bold">SELECT</span>
                    <span className={`px-2 py-0.5 rounded border text-xs font-bold ${selectTapped ? "bg-emerald-500/30 border-emerald-500/60 text-emerald-300" : "border-dashed border-yellow-400/50 text-yellow-300 animate-pulse"}`}>
                      {selectTapped ? "MR ✓" : "?"}
                    </span>
                  </div>
                </div>
                {!selectTapped ? (
                  <div className="grid grid-cols-2 gap-2">
                    {["MR", "CL", "PR", "RX"].map(opt => (
                      <button key={opt} onClick={() => { if (opt === "MR") { setSelectTapped(true); setTimeout(() => dispatch({ type: "RECORD_SUCCESS" }), 800); } else { dispatch({ type: "RECORD_ERROR" }); } }}
                        className={`rounded-xl border py-3.5 text-lg font-black font-mono transition cursor-pointer ${opt === "MR" ? "bg-white/10 hover:bg-emerald-600/40 border-white/20 hover:border-emerald-400 text-white" : "bg-white/5 border-white/10 hover:bg-red-500/10 hover:border-red-400/30 text-white/50"}`}>
                        {opt}
                        <div className="text-sm font-normal text-white/40 mt-0.5">
                          {opt === "MR" ? "Member Referral" : opt === "CL" ? "Claims List" : opt === "PR" ? "Provider" : "Pharmacy"}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-sm font-bold text-emerald-200">SELECT = MR confirmed! Navigating…</span>
                  </motion.div>
                )}
              </div>
            )}

          </div>
        </div>{/* end RIGHT */}
      </div>{/* end side-by-side */}
    </div>
  );
}

export function Gameplay() {
  const { state, dispatch } = useGame();
  const caseDef = CASES[state.currentCaseIndex];
  const step = caseDef.steps[state.currentStepIndex];
  const isCase1 = caseDef.number === 1;
  const isCase2 = caseDef.number === 2;
  const isCase3 = caseDef.number === 3;

  // --- Local Step State ---
  const [commandBuilderSlots, setCommandBuilderSlots] = useState<string[]>([]);
  const [spotTagTapped, setSpotTagTapped] = useState(false);
  const [spotTagPages, setSpotTagPages] = useState(1);
  const [hotspotTallyTapped, setHotspotTallyTapped] = useState<number[]>([]);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomValPlaced, setZoomValPlaced] = useState<string | null>(null);
  const [codeChipMatched, setCodeChipMatched] = useState(false);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [swipeCorrectCards, setSwipeCorrectCards] = useState<string[]>([]);
  const [tallyTapCount, setTallyTapCount] = useState<string[]>([]);
  const [hotspotTapMatches, setHotspotTapMatches] = useState<string[]>([]);
  const [multiSelectSelected, setMultiSelectSelected] = useState<string[]>([]);
  const [pinDroppedCardId, setPinDroppedCardId] = useState<string | null>(null);
  const [seqSelected, setSeqSelected] = useState<string[]>([]);
  const [seqCommand, setSeqCommand] = useState("");

  const [stepKey, setStepKey] = useState(0);

  // Reset local state on step change
  useEffect(() => {
    setCommandBuilderSlots([]);
    setSpotTagTapped(false);
    setSpotTagPages(1);
    setHotspotTallyTapped([]);
    setZoomOpen(false);
    setZoomValPlaced(null);
    setCodeChipMatched(false);
    setSwipeIndex(0);
    setSwipeCorrectCards([]);
    setTallyTapCount([]);
    setHotspotTapMatches([]);
    setMultiSelectSelected([]);
    setPinDroppedCardId(null);
    setSeqSelected([]);
    setSeqCommand("");
    setStepKey((prev) => prev + 1);
  }, [state.currentStepIndex, state.currentCaseIndex]);

  // Command Builder line preview
  const getCommandBuilderLine = () => {
    const parts = [...commandBuilderSlots];
    while (parts.length < 4) {
      parts.push("_____");
    }
    return parts.join(",");
  };

  // --- Handlers ---
  const handleCommandBuilderTileClick = (tile: string) => {
    if (commandBuilderSlots.includes(tile)) {
      setCommandBuilderSlots((prev) => prev.filter((t) => t !== tile));
    } else if (commandBuilderSlots.length < 4) {
      setCommandBuilderSlots((prev) => [...prev, tile]);
    }
  };

  const handleCommandBuilderSubmit = () => {
    const expected = step.correctAnswer as string[];
    const isCorrect =
      commandBuilderSlots.length === expected.length &&
      commandBuilderSlots.every((v, i) => v === expected[i]);

    if (isCorrect) {
      dispatch({ type: "RECORD_SUCCESS" });
    } else {
      dispatch({ type: "RECORD_ERROR" });
      setCommandBuilderSlots([]);
    }
  };

  const handleSpotTagSubmit = () => {
    const correct = step.correctAnswer as { tagTapped: boolean; pageCount: number };
    if (spotTagTapped && spotTagPages === correct.pageCount) {
      dispatch({ type: "RECORD_SUCCESS" });
    } else {
      dispatch({ type: "RECORD_ERROR" });
    }
  };

  const handleHotspotTallyRowClick = (idx: number) => {
    if (hotspotTallyTapped.includes(idx)) {
      setHotspotTallyTapped((prev) => prev.filter((i) => i !== idx));
    } else {
      setHotspotTallyTapped((prev) => [...prev, idx]);
    }
  };

  const handleHotspotTallySubmit = () => {
    const correct = step.correctAnswer as number[];
    const isCorrect =
      hotspotTallyTapped.length === correct.length &&
      hotspotTallyTapped.every((v) => correct.includes(v));

    if (isCorrect) {
      dispatch({ type: "RECORD_SUCCESS" });
    } else {
      dispatch({ type: "RECORD_ERROR" });
      setHotspotTallyTapped([]);
    }
  };

  const handleFieldDetectivePlaceTile = (tile: string) => {
    setZoomValPlaced(tile);
    if (tile === step.correctAnswer) {
      setTimeout(() => {
        setZoomOpen(false);
        dispatch({ type: "RECORD_SUCCESS" });
      }, 800);
    } else {
      dispatch({ type: "RECORD_ERROR" });
      setZoomValPlaced(null);
    }
  };

  const handleMatchCodeRowClick = (rowIdx: number) => {
    if (rowIdx === step.correctAnswer) {
      setCodeChipMatched(true);
      setTimeout(() => {
        dispatch({ type: "RECORD_SUCCESS" });
      }, 1500);
    } else {
      dispatch({ type: "RECORD_ERROR" });
    }
  };

  const handleSwipeChoice = (cardId: string, approve: boolean) => {
    const isTarget = cardId === step.correctAnswer;
    const isCorrect = (isTarget && approve) || (!isTarget && !approve);

    if (isCorrect) {
      if (swipeIndex < step.data.cards.length - 1) {
        setSwipeIndex((prev) => prev + 1);
      } else {
        dispatch({ type: "RECORD_SUCCESS" });
      }
    } else {
      dispatch({ type: "RECORD_ERROR" });
    }
  };

  const handleTallyTapCardClick = (cardId: string) => {
    if (!tallyTapCount.includes(cardId)) {
      const updated = [...tallyTapCount, cardId];
      setTallyTapCount(updated);
      if (updated.length === step.correctAnswer) {
        setTimeout(() => {
          dispatch({ type: "RECORD_SUCCESS" });
        }, 800);
      }
    }
  };

  const handleHotspotFieldTap = (fieldId: string) => {
    // Normalize correctAnswer to array (it may be a string for Case 2 single-target steps)
    const rawAnswer = step.correctAnswer;
    const targets: string[] = Array.isArray(rawAnswer) ? rawAnswer : [rawAnswer];

    // IDs suffixed "-wrong" are decoy targets — don't penalise, just ignore
    if (fieldId.endsWith("-wrong")) return;

    if (targets.includes(fieldId)) {
      if (!hotspotTapMatches.includes(fieldId)) {
        const updated = [...hotspotTapMatches, fieldId];
        setHotspotTapMatches(updated);
        if (updated.length === targets.length) {
          setTimeout(() => {
            dispatch({ type: "RECORD_SUCCESS" });
          }, 800);
        }
      }
    } else {
      dispatch({ type: "RECORD_ERROR" });
    }
  };

  const handleMultiSelectCardClick = (cardId: string) => {
    if (multiSelectSelected.includes(cardId)) {
      setMultiSelectSelected((prev) => prev.filter((id) => id !== cardId));
    } else {
      setMultiSelectSelected((prev) => [...prev, cardId]);
    }
  };

  const handleMultiSelectSubmit = () => {
    const correct = step.correctAnswer as string[];
    const isCorrect =
      multiSelectSelected.length === correct.length &&
      multiSelectSelected.every((id) => correct.includes(id));

    if (isCorrect) {
      dispatch({ type: "RECORD_SUCCESS" });
    } else {
      dispatch({ type: "RECORD_ERROR" });
      setMultiSelectSelected([]);
    }
  };

  const handleMapPinDrop = (cardId: string) => {
    setPinDroppedCardId(cardId);
    if (cardId === step.correctAnswer) {
      setTimeout(() => {
        dispatch({ type: "RECORD_SUCCESS" });
      }, 1000);
    } else {
      dispatch({ type: "RECORD_ERROR" });
      setPinDroppedCardId(null);
    }
  };

  const handleSeqStepClick = (stepId: string) => {
    if (seqSelected.includes(stepId)) {
      setSeqSelected((prev) => prev.filter((id) => id !== stepId));
    } else if (seqSelected.length < 2) {
      setSeqSelected((prev) => [...prev, stepId]);
    }
  };

  const handleSeqSubmit = () => {
    const correct = step.correctAnswer as { sequence: string[]; command: string };
    const seqCorrect =
      seqSelected.length === correct.sequence.length &&
      seqSelected.every((v, i) => v === correct.sequence[i]);
    const cmdCorrect = seqCommand.trim().toUpperCase() === correct.command;

    if (seqCorrect && cmdCorrect) {
      dispatch({ type: "RECORD_SUCCESS" });
    } else {
      dispatch({ type: "RECORD_ERROR" });
      setSeqSelected([]);
      setSeqCommand("");
    }
  };

  // Scout Avatar Mood determination
  const getScoutMood = () => {
    if (state.showHint) return "error";
    if (zoomOpen || commandBuilderSlots.length > 0 || seqCommand.length > 0) return "think";
    return "idle";
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#E9F8F0] overflow-hidden">

      {/* ── Zone 1: Top HUD bar ─────────────────────────────────────────── */}
      <header className="shrink-0 border-b border-emerald-100 bg-white/95 shadow-sm z-10">
        {/* Row 1: nav + stats */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => dispatch({ type: "GOTO", screen: "journey" })}
              className="rounded-full p-1.5 text-slate-500 hover:bg-emerald-50 hover:text-emerald-800 transition"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h2 className="font-display text-lg xl:text-xl font-extrabold text-slate-800 leading-tight truncate max-w-[50vw] lg:max-w-none" title={`Case ${caseDef.number}: ${caseDef.name}`}>
                Case {caseDef.number}: {caseDef.name}
              </h2>
              <div className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Step {state.currentStepIndex + 1} of {caseDef.steps.length} · {step.qNum}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {state.streak > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1.5 text-orange-600 text-sm font-bold border border-orange-100">
                <Flame className="h-4 w-4 fill-orange-500 text-orange-500 animate-bounce" />
                <span>{state.streak}</span>
              </div>
            )}
            <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1.5 text-yellow-800 text-sm font-bold border border-yellow-200">
              <Sparkles className="h-4 w-4 fill-yellow-400 text-yellow-600" />
              <span>{state.totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* Row 2: step checklist as a horizontal pill strip */}
        <div className="flex items-center gap-1.5 px-4 pb-3 overflow-x-auto scrollbar-none">
          {caseDef.steps.map((s, idx) => {
            const done = idx < state.currentStepIndex;
            const active = idx === state.currentStepIndex;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap shrink-0 border transition-all ${
                  done
                    ? "bg-emerald-500 border-emerald-600 text-white"
                    : active
                      ? "bg-[#E9F8F0] border-emerald-400 text-emerald-800 ring-1 ring-emerald-400"
                      : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {done ? (
                  <Check className="h-4 w-4 shrink-0" />
                ) : (
                  <span
                    className={`h-2 w-2 rounded-full shrink-0 ${
                      active ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
                    }`}
                  />
                )}
                {s.qNum}
              </div>
            );
          })}
          {/* End goal indicator */}
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap shrink-0 border border-yellow-200 bg-yellow-50 text-yellow-700 ml-1">
            <Sparkles className="h-4 w-4 fill-yellow-400 text-yellow-500" />
            +{caseDef.xpValue} XP
          </div>
        </div>
      </header>

      {/* ── Zone 2: Main workspace ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden lg:flex-row">

        {/* Mobile-only prompt bar (shown below md) */}
        <div className={`lg:hidden shrink-0 px-3 py-2 border-b border-emerald-100 bg-white/80 ${state.showHint ? "bg-amber-50/80 border-amber-200" : ""}`}>
          <div className="flex items-start gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-mono font-bold shrink-0 mt-0.5">
              {step.qNum}
            </span>
            <p className={`text-base font-medium leading-relaxed ${state.showHint ? "text-amber-900" : "text-slate-800"}`}>
              {state.showHint ? (
                <><span className="font-bold text-amber-800">Hint: </span>{step.scoutHint}</>
              ) : (
                step.prompt
              )}
            </p>
            {!state.showHint && (
              <button
                onClick={() => dispatch({ type: "RECORD_ERROR" })}
                className="ml-auto shrink-0 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-emerald-700 p-1.5 transition cursor-pointer"
                aria-label="Need a hint?"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            )}
            {state.showHint && (
              <button
                onClick={() => dispatch({ type: "CLOSE_HINT" })}
                className="ml-auto shrink-0 rounded-full bg-slate-800 text-white font-bold px-3 py-1.5 text-sm uppercase tracking-wider transition cursor-pointer whitespace-nowrap"
              >
                Got It
              </button>
            )}
          </div>
        </div>

        {/* Left panel: Scout + prompt */}
        <div className="hidden lg:flex lg:w-72 xl:w-80 shrink-0 flex-col gap-3 p-4 border-r border-emerald-100 bg-white/60 overflow-y-auto">

          {/* Scout card */}
          <div
            className={`rounded-2xl border bg-white p-4 text-center shadow-sm transition-all duration-300 ${
              state.showHint ? "border-amber-200 bg-amber-50/50" : "border-slate-100"
            }`}
          >
            <img src={scoutImg} alt="Scout" className="w-40 h-40 mx-auto" />
            <div
              className={`mt-3 rounded-xl p-3 text-base leading-relaxed text-left border relative transition-colors ${
                state.showHint
                  ? "bg-amber-100/50 border-amber-200 text-amber-900"
                  : "bg-emerald-50/40 border-emerald-100 text-emerald-950"
              }`}
            >
              <div
                className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-t border-l rotate-45 ${
                  state.showHint ? "bg-[#FEF3C7] border-amber-200" : "bg-[#F3FAF6] border-emerald-100"
                }`}
              />
              <p className="relative z-10 text-base leading-relaxed">
                {state.showHint ? (
                  <>
                    <span className="font-bold text-amber-800">Hint: </span>
                    {step.scoutHint}
                  </>
                ) : (
                  <>
                    <span className="font-bold text-emerald-800">Scout: </span>
                    {step.scoutIntro}
                  </>
                )}
              </p>
            </div>
            {state.showHint && (
              <button
                onClick={() => dispatch({ type: "CLOSE_HINT" })}
                className="mt-2 w-full rounded-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 text-sm uppercase tracking-wider transition cursor-pointer"
              >
                Got It, Retry
              </button>
            )}
          </div>

          {/* Prompt box */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-mono font-bold shrink-0">
                {step.qNum}
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Your Task</span>
            </div>
            <p className="text-base text-slate-800 font-medium leading-relaxed">
              {step.prompt}
            </p>
          </div>

          {/* Hint button (only when not already showing) */}
          {!state.showHint && (
            <button
              onClick={() => dispatch({ type: "RECORD_ERROR" })}
              className="flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-emerald-700 hover:border-emerald-200 py-2.5 text-sm font-bold uppercase tracking-wider transition cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Need a Hint?
            </button>
          )}
        </div>

        {/* Right panel: the interactive mainframe board */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden p-3 md:p-4">

          {/* The board — no duplicate prompt here */}
          <div key={stepKey} className="flex flex-1 min-h-0 flex-col gap-3">

            {/* Reference Image Panel (only for non-case boards that use it) */}
            {step.imageUrl && !isCase1 && !isCase2 && !isCase3 && (
              <ReferenceImagePanel imageUrl={step.imageUrl} qNum={step.qNum} />
            )}

            {/* Mainframe Interactive Terminal */}
            <div className="relative flex flex-1 min-h-0 flex-col">
              {isCase1 ? (
                <Case1InteractiveBoard
                  step={step}
                  state={state}
                  dispatch={dispatch}
                  commandBuilderSlots={commandBuilderSlots}
                  setCommandBuilderSlots={setCommandBuilderSlots}
                  spotTagTapped={spotTagTapped}
                  setSpotTagTapped={setSpotTagTapped}
                  spotTagPages={spotTagPages}
                  setSpotTagPages={setSpotTagPages}
                  zoomValPlaced={zoomValPlaced}
                  setZoomValPlaced={setZoomValPlaced}
                  codeChipMatched={codeChipMatched}
                  setCodeChipMatched={setCodeChipMatched}
                  swipeIndex={swipeIndex}
                  setSwipeIndex={setSwipeIndex}
                  handleCommandBuilderTileClick={handleCommandBuilderTileClick}
                  handleCommandBuilderSubmit={handleCommandBuilderSubmit}
                  handleSpotTagSubmit={handleSpotTagSubmit}
                  handleFieldDetectivePlaceTile={handleFieldDetectivePlaceTile}
                  handleMatchCodeRowClick={handleMatchCodeRowClick}
                  handleSwipeChoice={handleSwipeChoice}
                />
              ) : isCase2 ? (
                <Case2InteractiveBoard
                  step={step}
                  dispatch={dispatch}
                  tallyTapCount={tallyTapCount}
                  setTallyTapCount={setTallyTapCount}
                  spotTagTapped={spotTagTapped}
                  setSpotTagTapped={setSpotTagTapped}
                  hotspotTapMatches={hotspotTapMatches}
                  handleHotspotFieldTap={handleHotspotFieldTap}
                  multiSelectSelected={multiSelectSelected}
                  setMultiSelectSelected={setMultiSelectSelected}
                  handleMultiSelectSubmit={handleMultiSelectSubmit}
                  pinDroppedCardId={pinDroppedCardId}
                  handleMapPinDrop={handleMapPinDrop}
                />
              ) : isCase3 ? (
                <Case3InteractiveBoard
                  step={step}
                  dispatch={dispatch}
                />
              ) : (
                <div className="relative flex h-full min-h-0 flex-col">
                  {/* Zoom overlay wrapper for zoom mechanics */}
                  <AnimatePresence>
                    {zoomOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] rounded-2xl z-20 flex items-center justify-center p-6"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 10 }}
                      className="bg-white rounded-2xl border border-emerald-100 max-w-md w-full p-6 shadow-2xl text-center relative"
                    >
                      <button
                        onClick={() => setZoomOpen(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5 justify-center">
                        <Maximize2 className="w-4 h-4 text-[#25BB64]" />
                        <span>Field Zoom: {step.data.zoomLabel}</span>
                      </h4>

                      <p className="text-xs text-slate-500 mt-1.5">
                        Audit details zoomed. Select the correct value tile below to drop into the field.
                      </p>

                      <div className="my-5 p-4 bg-[#E9F8F0] border border-emerald-200 rounded-xl font-mono text-lg font-bold text-emerald-950 flex items-center justify-center min-h-[50px] shadow-sm">
                        {zoomValPlaced ? (
                          <motion.span
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1.1, color: "#25BB64" }}
                            className="flex items-center gap-1"
                          >
                            <Check className="w-5 h-5" /> {zoomValPlaced}
                          </motion.span>
                        ) : (
                          <span className="text-slate-400 animate-pulse">? FIELD PENDING ?</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {step.data.tiles.map((tileVal: string) => (
                          <button
                            key={tileVal}
                            onClick={() => handleFieldDetectivePlaceTile(tileVal)}
                            className="bg-emerald-50 hover:bg-[#E9F8F0] border border-emerald-200 hover:border-[#25BB64] text-emerald-950 rounded-xl py-2.5 text-xs font-bold transition font-mono cursor-pointer"
                          >
                            {tileVal}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RENDER TERMINAL CONTENTS */}
              {step.mechanic === "command-builder" && (
                <MainframeTerminal headerTitle="ASI QUERY SCREEN" commandValue={getCommandBuilderLine()}>
                  <div className="flex flex-col items-center justify-center flex-grow p-4 gap-6 text-center select-none">
                    <div className="font-mono text-emerald-800/80 max-w-md text-xs leading-normal">
                      &gt; BUILD A VALID CONTROL LINE TO ENTER TEXAS CLAIMS ARCHIVES.<br />
                      &gt; SYNTAX: CMD, LASTNAME, FIRSTNAME, STATE
                    </div>

                    {/* Word tile slots */}
                    <div className="flex items-center justify-center flex-wrap gap-2 w-full max-w-md">
                      {step.data.slots.map((slotName: string, idx: number) => {
                        const filled = commandBuilderSlots[idx];
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (filled) {
                                setCommandBuilderSlots((prev) => prev.filter((t) => t !== filled));
                              }
                            }}
                            className={`flex flex-col items-center justify-center rounded-xl border border-dashed h-16 w-24 p-2 transition cursor-pointer select-none ${
                              filled
                                ? "bg-[#25BB64]/10 border-[#25BB64] text-emerald-900 font-bold"
                                : "bg-emerald-500/5 border-emerald-500/20 text-emerald-800/40"
                            }`}
                          >
                            <span className="text-sm uppercase tracking-wider opacity-60 mb-0.5">
                              {slotName}
                            </span>
                            <span className="font-mono text-xs truncate max-w-full">
                              {filled || "?"}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Drag tiles area */}
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mt-2 border-t border-emerald-500/10 pt-4">
                      {step.data.tiles.map((tile: string) => {
                        const selected = commandBuilderSlots.includes(tile);
                        return (
                          <button
                            key={tile}
                            onClick={() => handleCommandBuilderTileClick(tile)}
                            className={`px-3 py-2 rounded-lg font-mono text-xs font-bold border transition cursor-pointer ${
                              selected
                                ? "bg-slate-200 text-slate-400 border-slate-300"
                                : "bg-white hover:bg-[#E9F8F0] border-emerald-500/20 text-emerald-900 hover:border-[#25BB64] shadow-sm"
                            }`}
                          >
                            {tile}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={commandBuilderSlots.length < 4}
                      onClick={handleCommandBuilderSubmit}
                      className="mt-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-8 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Execute Mainframe Search
                    </button>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "spot-tag" && (
                <MainframeTerminal headerTitle="QUERY ARCHIVE RESPONSE" commandValue="ASI,JONES,MARKUS,TX">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6 flex-grow">
                    {/* Viewport lines */}
                    <div className="bg-emerald-950/5 border border-emerald-600/10 rounded-xl p-3 flex flex-col font-mono text-xs leading-normal select-none overflow-y-auto max-h-[220px]">
                      {step.data.mainframeLines.map((line: string, idx: number) => {
                        const isTag = line.includes("*** END OF DATA ***");
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (isTag) setSpotTagTapped(true);
                            }}
                            className={`py-0.5 px-2 rounded font-mono ${
                              isTag
                                ? spotTagTapped
                                  ? "bg-[#25BB64]/20 text-emerald-800 border border-[#25BB64] font-bold cursor-pointer"
                                  : "bg-yellow-500/10 text-yellow-800 animate-pulse border border-dashed border-yellow-500/30 cursor-pointer"
                                : ""
                            }`}
                          >
                            {line || <span className="opacity-0">.</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Stepper Widget Column */}
                    <div className="flex flex-col justify-center items-center gap-4 bg-white border border-emerald-100 rounded-xl p-4 shadow-sm text-center">
                      <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                        Page Discernment
                      </span>
                      <p className="text-sm text-slate-500 leading-normal">
                        Verify and enter the total pages returned by this query:
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSpotTagPages((prev) => Math.max(1, prev - 1))}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-[#E9F8F0] border border-emerald-200 text-emerald-700 font-bold transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-2xl font-extrabold text-slate-800 w-8">
                          {spotTagPages}
                        </span>
                        <button
                          onClick={() => setSpotTagPages((prev) => prev + 1)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-[#E9F8F0] border border-emerald-200 text-emerald-700 font-bold transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={handleSpotTagSubmit}
                        disabled={!spotTagTapped}
                        className="w-full mt-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Submit Audit Count
                      </button>
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "hotspot-tally" && (
                <MainframeTerminal headerTitle="GROUP ARCHIVE AUDIT" commandValue="ASI,JONES,MARKUS,TX">
                  <div className="flex flex-col flex-grow select-none">
                    <div className="text-sm text-emerald-800 mb-3 border-b border-emerald-150 pb-2">
                      &gt; AUDITING SPECIAL PROCESSING FOR DENTAL GROUP (D-GRP) 56. TAP RELEVANT ROWS.
                    </div>

                    <div className="border border-emerald-100 rounded-xl overflow-hidden bg-white shadow-sm flex-grow">
                      <table className="w-full font-mono text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-emerald-50 text-emerald-800 border-b border-emerald-100 font-bold uppercase text-sm">
                            {step.data.headers.map((h: string) => (
                              <th key={h} className="p-3">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {step.data.rows.map((row: any, idx: number) => {
                            const isSelected = hotspotTallyTapped.includes(idx);
                            return (
                              <tr
                                key={idx}
                                onClick={() => handleHotspotTallyRowClick(idx)}
                                className={`border-b border-emerald-50/50 hover:bg-emerald-500/5 cursor-pointer transition-colors ${
                                  isSelected
                                    ? "bg-[#25BB64]/10 hover:bg-[#25BB64]/15 text-emerald-950 font-semibold"
                                    : ""
                                }`}
                              >
                                <td className="p-3 text-slate-400 font-mono font-bold">
                                  {row.rowNum}
                                </td>
                                <td className="p-3">{row.client}</td>
                                <td className="p-3 truncate max-w-[120px] font-bold">
                                  {row.name}
                                </td>
                                <td className="p-3">
                                  <span
                                    className={`px-1.5 py-0.5 rounded font-bold ${
                                      row.dgrp === "56"
                                        ? "bg-yellow-50 text-yellow-800 border border-yellow-250"
                                        : ""
                                    }`}
                                  >
                                    {row.dgrp}
                                  </span>
                                </td>
                                <td className="p-3">{row.mgrp}</td>
                                <td className="p-3 font-mono font-bold text-slate-500">
                                  {row.rel}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-800">
                        Selected Group 56 Rows: {hotspotTallyTapped.length} / 2
                      </span>
                      <button
                        onClick={handleHotspotTallySubmit}
                        disabled={hotspotTallyTapped.length === 0}
                        className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Verify Audit Selection
                      </button>
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "field-detective" && (
                <MainframeTerminal headerTitle="FIELD AUDIT AND RESOLUTION" commandValue="ASI,JONES,MARKUS,TX">
                  <div className="flex flex-col flex-grow select-none">
                    <div className="text-sm text-emerald-800 mb-3 border-b border-emerald-150 pb-2">
                      &gt; RESOLVING MISCONFIGURED / BLANK VALUE IN COLUMN:{" "}
                      <span className="font-bold uppercase text-emerald-950">
                        {step.data.targetColKey}
                      </span>
                    </div>

                    <div className="border border-emerald-100 rounded-xl overflow-hidden bg-white shadow-sm flex-grow">
                      <table className="w-full font-mono text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-emerald-50 text-emerald-800 border-b border-emerald-100 font-bold uppercase text-sm">
                            {step.data.headers.map((h: string) => (
                              <th key={h} className="p-3">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {step.data.rows.map((row: any, idx: number) => {
                            const isTargetRow = idx === step.data.targetRowIndex;
                            return (
                              <tr key={idx} className="border-b border-emerald-50/50">
                                <td className="p-3 text-slate-400 font-mono font-bold">
                                  {row.rowNum}
                                </td>
                                <td className="p-3">{row.client}</td>
                                <td className="p-3 truncate max-w-[120px] font-bold">
                                  {row.name}
                                </td>

                                {/* Column specific rendering */}
                                {step.data.targetColKey === "mgrp" ? (
                                  <>
                                    <td className="p-3">{row.dgrp}</td>
                                    <td className="p-3">
                                      {isTargetRow ? (
                                        <button
                                          onClick={() => setZoomOpen(true)}
                                          className="flex items-center gap-1 px-1.5 py-0.5 rounded font-extrabold bg-amber-50 text-amber-700 border border-dashed border-amber-300 animate-pulse hover:bg-amber-100/50 cursor-pointer"
                                        >
                                          <Maximize2 className="w-3 h-3" /> ? ZOOM ?
                                        </button>
                                      ) : (
                                        row.mgrp
                                      )}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="p-3">
                                      {isTargetRow ? (
                                        <button
                                          onClick={() => setZoomOpen(true)}
                                          className="flex items-center gap-1 px-1.5 py-0.5 rounded font-extrabold bg-amber-50 text-amber-700 border border-dashed border-amber-300 animate-pulse hover:bg-amber-100/50 cursor-pointer"
                                        >
                                          <Maximize2 className="w-3 h-3" /> ? ZOOM ?
                                        </button>
                                      ) : (
                                        row.dob
                                      )}
                                    </td>
                                    <td className="p-3">{row.dgrp}</td>
                                  </>
                                )}

                                <td className="p-3 font-mono font-bold text-slate-500">
                                  {row.rel}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "match-code" && (
                <MainframeTerminal headerTitle="SECURE CLIENT ADDRESS MATCH" commandValue="ASI,JONES,MARKUS,TX">
                  <div className="flex flex-col flex-grow select-none">
                    <div className="text-sm text-emerald-800 mb-3 border-b border-emerald-150 pb-2">
                      &gt; DRAG OR MATCH THE &apos;{step.data.chipLabel}&apos; (EMPLOYEE) KEY CHIP ONTO THE TARGET ROW TO DECRYPT ENCRYPTED ADDRESS.
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[110px_1fr] gap-4">
                      {/* Chip area */}
                      <div className="flex flex-col justify-center items-center bg-[#E9F8F0] border border-emerald-200 rounded-xl p-3 shadow-sm text-center">
                        <span className="text-sm uppercase font-bold text-slate-400">
                          Match Key
                        </span>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`mt-2 h-14 w-18 flex items-center justify-center rounded-xl font-mono text-sm font-extrabold shadow-md border cursor-grab select-none ${
                            codeChipMatched
                              ? "bg-emerald-500 border-emerald-600 text-white"
                              : "bg-[#25BB64] border-emerald-600 text-white animate-bounce"
                          }`}
                        >
                          {step.data.chipLabel}
                        </motion.div>
                        <span className="text-sm text-slate-400 mt-2">
                          Tap target row REL cell
                        </span>
                      </div>

                      {/* Table area */}
                      <div className="border border-emerald-100 rounded-xl overflow-hidden bg-white shadow-sm">
                        <table className="w-full font-mono text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-emerald-50 text-emerald-800 border-b border-emerald-100 font-bold uppercase text-sm">
                              {step.data.headers.map((h: string) => (
                                <th key={h} className="p-3">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {step.data.rows.map((row: any, idx: number) => {
                              const isTarget = idx === step.correctAnswer;
                              return (
                                <tr
                                  key={idx}
                                  className="border-b border-emerald-50/50"
                                >
                                  <td className="p-3 text-slate-400 font-mono font-bold">
                                    {row.rowNum}
                                  </td>
                                  <td className="p-3">{row.client}</td>
                                  <td className="p-3 truncate max-w-[120px] font-bold">
                                    {row.name}
                                  </td>
                                  <td className="p-3">
                                    {isTarget ? (
                                      <button
                                        onClick={() => handleMatchCodeRowClick(idx)}
                                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-extrabold border transition ${
                                          codeChipMatched
                                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                            : "bg-yellow-50 text-yellow-800 border-dashed border-yellow-400 animate-pulse hover:bg-yellow-100 cursor-pointer"
                                        }`}
                                      >
                                        {codeChipMatched ? (
                                          <>
                                            <Check className="w-3 h-3 text-[#25BB64]" /> {row.rel}
                                          </>
                                        ) : (
                                          <>
                                            <HelpCircle className="w-3 h-3" /> DROP HERE
                                          </>
                                        )}
                                      </button>
                                    ) : (
                                      <span className="font-bold text-slate-400">{row.rel}</span>
                                    )}
                                  </td>
                                  <td className="p-3 text-sm font-bold">
                                    {isTarget ? (
                                      codeChipMatched ? (
                                        <motion.span
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          className="text-emerald-800 flex items-center gap-1"
                                        >
                                          <Unlock className="w-3.5 h-3.5 text-[#25BB64]" /> {row.unlockedAddress}
                                        </motion.span>
                                      ) : (
                                        <span className="text-slate-300 flex items-center gap-1">
                                          <Lock className="w-3 h-3" /> {row.address}
                                        </span>
                                      )
                                    ) : (
                                      <span className="text-slate-600">{row.address}</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "decision-swipe" && (
                <MainframeTerminal headerTitle="DUPLICATE FILE RECONCILIATION" commandValue="ASI,JONES,MARKUS,TX">
                  <div className="flex flex-col items-center justify-center flex-grow py-3 select-none">
                    <div className="text-center max-w-md mb-4">
                      <span className="text-sm uppercase font-bold text-emerald-850 tracking-wider">
                        Reconciliation Queue
                      </span>
                      <p className="text-sm text-slate-500 mt-1 leading-normal">
                        Identify correct record with DOB 12/30/1996. Approve or Reject candidates.
                      </p>
                    </div>

                    {/* Tinder Card Stack */}
                    <div className="relative h-48 w-72 flex items-center justify-center">
                      <AnimatePresence>
                        {step.data.cards.map((card: any, idx: number) => {
                          if (idx !== swipeIndex) return null;
                          return (
                            <motion.div
                              key={card.id}
                              initial={{ scale: 0.95, opacity: 0, y: 5 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              exit={{
                                opacity: 0,
                                scale: 0.9,
                                x: swipeCorrectCards.includes(card.id) ? 200 : -200,
                              }}
                              className="absolute inset-0 bg-white border border-emerald-100 rounded-2xl p-4 shadow-md flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                  <span className="text-sm font-bold text-slate-400 uppercase">
                                    {card.title}
                                  </span>
                                  <span className="h-2 w-2 rounded-full bg-[#25BB64] animate-pulse" />
                                </div>
                                <h4 className="font-mono text-sm font-extrabold text-slate-800 mt-2 truncate">
                                  {card.name}
                                </h4>
                                <div className="mt-2 space-y-1 font-mono text-sm text-slate-650">
                                  <div>DOB: <strong className="text-slate-800">{card.dob}</strong></div>
                                  <div>UMID: <strong className="text-slate-800">{card.umid}</strong></div>
                                  <div className="truncate">ADDR: <strong className="text-slate-800">{card.address}</strong></div>
                                </div>
                              </div>

                              <div className="flex gap-2.5 mt-2 border-t border-slate-100 pt-2">
                                <button
                                  onClick={() => handleSwipeChoice(card.id, false)}
                                  className="flex-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 py-1.5 text-xs font-bold transition hover:bg-orange-100 cursor-pointer"
                                >
                                  Reject File
                                </button>
                                <button
                                  onClick={() => handleSwipeChoice(card.id, true)}
                                  className="flex-1 rounded-xl bg-emerald-500 border border-emerald-600 text-white py-1.5 text-xs font-bold transition hover:bg-emerald-600 shadow-sm cursor-pointer"
                                >
                                  Approve Match
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "tally-tap" && (
                <MainframeTerminal headerTitle="KENTUCKY REGIONAL MEMBERS" commandValue="ASI,ADAMS,BRENDA,KY">
                  <div className="flex flex-col flex-grow select-none">
                    <div className="text-sm text-emerald-800 mb-3 border-b border-emerald-150 pb-2 flex items-center justify-between">
                      <span>&gt; CONFIRM SYSTEM COUNT: TAP ALL DISPLAYED KENTUCKY RECORD CARDS once.</span>
                      <span className="font-bold text-emerald-950 font-mono">
                        TALLY: {tallyTapCount.length} / 3
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-grow">
                      {step.data.cards.map((card: any) => {
                        const tapped = tallyTapCount.includes(card.id);
                        return (
                          <motion.div
                            key={card.id}
                            onClick={() => handleTallyTapCardClick(card.id)}
                            className={`p-3.5 rounded-xl border bg-white shadow-sm flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                              tapped
                                ? "border-[#25BB64] bg-[#25BB64]/5 shadow-[0_2px_10px_rgba(37,187,100,0.1)] ring-1 ring-emerald-500"
                                : "border-slate-100 hover:border-emerald-300"
                            }`}
                            whileHover={{ y: tapped ? 0 : -2 }}
                          >
                            <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                              <span className="text-sm uppercase font-bold text-slate-450">
                                KY Member Record
                              </span>
                              {tapped && <Check className="w-3.5 h-3.5 text-[#25BB64] fill-emerald-50" />}
                            </div>

                            <div className="mt-2">
                              <h4 className="font-mono text-sm font-extrabold text-slate-800 truncate">
                                {card.name}
                              </h4>
                              <div className="space-y-0.5 mt-1.5 font-mono text-sm text-slate-500">
                                <div>DOB: <strong className="text-slate-800">{card.dob}</strong></div>
                                <div>UMID: <strong className="text-slate-800">{card.umid}</strong></div>
                                <div>S: <strong className="text-slate-800">{card.suffix || "BLANK"}</strong></div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "hotspot-tap" && (
                <MainframeTerminal headerTitle="RECORD FIELD SCRUB" commandValue="ASI,ADAMS,BRENDA,KY">
                  <div className="flex flex-col flex-grow select-none">
                    <div className="text-sm text-emerald-800 mb-3 border-b border-emerald-150 pb-2">
                      &gt; FIELD MATCHING TASK: TAP THE CORRECT CELL FIELD BASED ON INSTRUCTION PROMPT.
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-grow">
                      {step.data.cards.map((card: any) => {
                        const umidId = `${card.id}-umid`;
                        const suffixId = `${card.id}-suffix`;
                        const isUmidTapped = hotspotTapMatches.includes(umidId);
                        const isSuffixTapped = hotspotTapMatches.includes(suffixId);

                        return (
                          <div
                            key={card.id}
                            className="p-3.5 bg-white border border-slate-100 rounded-xl shadow-sm flex flex-col justify-between font-mono"
                          >
                            <div className="border-b border-slate-50 pb-1 text-sm uppercase font-bold text-slate-400">
                              RECORD: {card.id.toUpperCase()}
                            </div>
                            <div className="mt-2 text-sm">
                              <div className="font-extrabold text-slate-800 mb-1 leading-tight">
                                {card.name}
                              </div>
                              <div className="space-y-1.5 mt-2 text-sm">
                                <div>DOB: <strong>{card.dob}</strong></div>

                                {/* UMID Hotspot */}
                                <div className="flex items-center gap-1">
                                  <span>UMID: </span>
                                  <button
                                    onClick={() => handleHotspotFieldTap(umidId)}
                                    className={`px-1.5 py-0.5 rounded font-extrabold border transition ${
                                      isUmidTapped
                                        ? "bg-emerald-500 border-emerald-600 text-white"
                                        : "bg-emerald-50 hover:bg-[#E9F8F0] border-emerald-200 text-emerald-850 cursor-pointer"
                                    }`}
                                  >
                                    {card.umid}
                                  </button>
                                </div>

                                {/* Suffix Hotspot */}
                                <div className="flex items-center gap-1">
                                  <span>SUFFIX (S): </span>
                                  <button
                                    onClick={() => handleHotspotFieldTap(suffixId)}
                                    className={`px-2 py-0.5 rounded font-extrabold border transition ${
                                      isSuffixTapped
                                        ? "bg-emerald-500 border-emerald-600 text-white"
                                        : "bg-emerald-50 hover:bg-[#E9F8F0] border-emerald-200 text-emerald-850 cursor-pointer"
                                    }`}
                                  >
                                    {card.suffix || "BLANK"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "multi-select" && (
                <MainframeTerminal headerTitle="SUFFIX EXCLUSION QUERY" commandValue="ASI,ADAMS,BRENDA,KY">
                  <div className="flex flex-col flex-grow select-none">
                    <div className="text-sm text-emerald-800 mb-3 border-b border-emerald-150 pb-2">
                      &gt; AUDIT BLANK SUFFIXES: SELECT ALL KY CARDS WHICH HAVE NO SUFFIX IN THE &apos;S&apos; COLUMN.
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-grow">
                      {step.data.cards.map((card: any) => {
                        const selected = multiSelectSelected.includes(card.id);
                        return (
                          <div
                            key={card.id}
                            onClick={() => handleMultiSelectCardClick(card.id)}
                            className={`p-3.5 rounded-xl border bg-white shadow-sm flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                              selected
                                ? "border-[#25BB64] bg-[#25BB64]/5 ring-1 ring-emerald-500"
                                : "border-slate-100 hover:border-emerald-300"
                            }`}
                          >
                            <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                              <span className="text-sm uppercase font-bold text-slate-400">
                                KY Record Card
                              </span>
                              <div
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  selected
                                    ? "bg-[#25BB64] border-emerald-600 text-white text-sm font-bold"
                                    : "border-slate-350"
                                }`}
                              >
                                {selected && <Check className="w-2.5 h-2.5" />}
                              </div>
                            </div>

                            <div className="mt-2 text-sm font-mono">
                              <h4 className="font-extrabold text-slate-800 truncate">{card.name}</h4>
                              <div className="space-y-0.5 mt-1.5 text-sm text-slate-500">
                                <div>UMID: <strong className="text-slate-800">{card.umid}</strong></div>
                                <div>
                                  SUFFIX:{" "}
                                  <strong
                                    className={`px-1 rounded ${
                                      card.suffix
                                        ? "bg-slate-100 text-slate-650"
                                        : "bg-yellow-50 text-yellow-800 border border-yellow-250 animate-pulse font-bold"
                                    }`}
                                  >
                                    {card.suffix || "BLANK"}
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleMultiSelectSubmit}
                        disabled={multiSelectSelected.length === 0}
                        className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                      >
                        Confirm Selections
                      </button>
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "map-pin" && (
                <MainframeTerminal headerTitle="REGIONAL CLAIMS DESPATCH" commandValue="ASI,ADAMS,BRENDA,KY">
                  <div className="flex flex-col flex-grow select-none">
                    <div className="text-sm text-emerald-800 mb-3 border-b border-emerald-150 pb-2">
                      &gt; GEOGRAPHY AUDIT: TAP AND PLACE THE LOCATION DISPATCH PIN ONTO THE ERLANGER, KY RECORD CARD.
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4">
                      {/* Pin container */}
                      <div className="flex flex-col justify-center items-center bg-[#E9F8F0] border border-emerald-200 rounded-xl p-3 shadow-sm text-center">
                        <span className="text-sm uppercase font-bold text-slate-400">
                          Dispatch Pin
                        </span>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-3.5 h-12 w-12 flex items-center justify-center rounded-full bg-orange-500 border-2 border-orange-600 text-white shadow-md cursor-grab animate-bounce"
                        >
                          <MapPin className="w-6 h-6 fill-white/10" />
                        </motion.div>
                        <span className="text-sm text-slate-450 mt-3 leading-normal">
                          Tap card address below to drop pin
                        </span>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                        {step.data.cards.map((card: any) => {
                          const hasPin = pinDroppedCardId === card.id;
                          return (
                            <div
                              key={card.id}
                              onClick={() => handleMapPinDrop(card.id)}
                              className={`p-3 rounded-xl border bg-white shadow-sm flex flex-col justify-between font-mono cursor-pointer transition ${
                                hasPin
                                  ? "border-orange-500 bg-orange-500/5 ring-1 ring-orange-500"
                                  : "border-slate-100 hover:border-emerald-300"
                              }`}
                            >
                              <div className="border-b border-slate-50 pb-1 flex justify-between items-center text-sm uppercase font-bold text-slate-400">
                                <span>CARD: {card.id}</span>
                                {hasPin && <MapPin className="w-3.5 h-3.5 text-orange-500 fill-orange-100" />}
                              </div>
                              <div className="mt-2 text-sm">
                                <div className="font-extrabold text-slate-800 truncate">
                                  {card.name}
                                </div>
                                <div className="mt-2 p-1.5 rounded text-sm bg-slate-50 text-slate-650 leading-normal border border-slate-100/50">
                                  {card.address}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </MainframeTerminal>
              )}

              {step.mechanic === "sequence-builder" && (
                <MainframeTerminal headerTitle="MEMBER REFERRAL GATEWAY" commandValue={seqCommand}>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 flex-grow select-none">
                    {/* Sequence list */}
                    <div className="flex flex-col gap-3">
                      <div className="text-sm uppercase font-bold text-emerald-800">
                        Select and Order Steps:
                      </div>

                      <div className="flex flex-col gap-2">
                        {step.data.steps.map((st: any) => {
                          const idx = seqSelected.indexOf(st.id);
                          const isOrdered = idx !== -1;
                          return (
                            <button
                              key={st.id}
                              onClick={() => handleSeqStepClick(st.id)}
                              className={`text-left p-3 rounded-xl border font-mono text-xs transition cursor-pointer flex items-center justify-between ${
                                isOrdered
                                  ? "bg-[#25BB64]/10 border-[#25BB64] text-emerald-950 font-bold"
                                  : "bg-white hover:bg-emerald-50/50 border-slate-100 text-slate-600 hover:border-emerald-250"
                              }`}
                            >
                              <span>{st.text}</span>
                              {isOrdered ? (
                                <span className="h-5 w-5 rounded-full bg-[#25BB64] text-white flex items-center justify-center font-sans font-bold text-sm shadow-sm">
                                  {idx + 1}
                                </span>
                              ) : (
                                <span className="h-5 w-5 rounded-full border border-slate-200 flex items-center justify-center text-sm text-slate-400 font-bold">
                                  +
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Command Prompt Box */}
                    <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm flex flex-col justify-between text-center gap-3">
                      <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                        Shortcut Command
                      </span>
                      <p className="text-sm text-slate-500 leading-normal">
                        Type the 2-letter terminal command to navigate to member referrals:
                      </p>

                      <div className="flex justify-center mt-1">
                        <input
                          type="text"
                          maxLength={2}
                          value={seqCommand}
                          onChange={(e) => setSeqCommand(e.target.value.toUpperCase())}
                          placeholder="CMD"
                          className="h-10 w-20 border-2 border-emerald-300 focus:border-[#25BB64] focus:outline-none rounded-xl text-center font-mono text-lg font-extrabold tracking-widest text-slate-800 uppercase shadow-inner"
                        />
                      </div>

                      <button
                        onClick={handleSeqSubmit}
                        disabled={seqSelected.length < 2 || seqCommand.length < 2}
                        className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Submit CAS Command
                      </button>
                    </div>
                  </div>
                </MainframeTerminal>
              )}
                </div>
              )}
            </div>{/* end Mainframe Interactive Terminal */}
          </div>{/* end key={stepKey} board div */}
        </div>{/* end right panel */}
      </div>{/* end flex-1 flex row */}
    </div>
  );
}
