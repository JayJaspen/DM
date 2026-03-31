"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, SlidersHorizontal, Building2, Ticket, AlertCircle, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const foretag = ["Acme AB", "Beta Consulting", "Gamma Tech", "Delta Services"];
const statusar = ["Öppna ärenden", "Pågående", "Lösta"];
const typer = ["Support", "Felanmälan", "Utbyte", "Inställning"];

export default function Header({ title, subtitle }: HeaderProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [valtForetag, setValtForetag] = useState<string[]>([]);
  const [valtStatus, setValtStatus] = useState<string[]>([]);
  const [valtTyp, setValtTyp] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const antalFilter = valtForetag.length + valtStatus.length + valtTyp.length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(arr: string[], val: string, set: (v: string[]) => void) {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  function rensaAllt() {
    setValtForetag([]);
    setValtStatus([]);
    setValtTyp([]);
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Sökfält */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Sök..."
            className="h-9 w-56 rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Filterknapp */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className={cn(
              "flex items-center gap-2 h-9 rounded-lg border px-3 text-sm font-medium transition-colors",
              filterOpen || antalFilter > 0
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
            {antalFilter > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {antalFilter}
              </span>
            )}
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", filterOpen && "rotate-180")} />
          </button>

          {/* Dropdown */}
          {filterOpen && (
            <div className="absolute right-0 top-11 z-50 w-72 rounded-xl border border-slate-200 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-sm font-semibold text-slate-900">Filtrera</span>
                {antalFilter > 0 && (
                  <button
                    onClick={rensaAllt}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                    Rensa alla
                  </button>
                )}
              </div>

              {/* Företag */}
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Företag</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {foretag.map((f) => (
                    <button
                      key={f}
                      onClick={() => toggle(valtForetag, f, setValtForetag)}
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                        valtForetag.includes(f)
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Öppna ärenden */}
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertCircle className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Öppna ärenden</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {statusar.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggle(valtStatus, s, setValtStatus)}
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                        valtStatus.includes(s)
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typ av ärende */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Ticket className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Typ av ärende</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {typer.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggle(valtTyp, t, setValtTyp)}
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                        valtTyp.includes(t)
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifikationer */}
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-medium text-white">
          JD
        </div>
      </div>
    </header>
  );
}
