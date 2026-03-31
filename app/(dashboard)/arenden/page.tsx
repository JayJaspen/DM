"use client";

import { useState } from "react";
import {
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  ChevronDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ArendeStatus = "open" | "pending" | "resolved";
type ArendeTyp = "support" | "felanmalan" | "utbyte" | "installning";

interface Arende {
  id: string;
  titel: string;
  foretag: string;
  status: ArendeStatus;
  typ: ArendeTyp;
  prioritet: "hög" | "medium" | "låg";
  skapad: string;
  tilldelad: string;
  beskrivning: string;
}

const arenden: Arende[] = [
  {
    id: "ARE-001",
    titel: "iPhone 15 Pro – skärmen svarar inte",
    foretag: "Acme AB",
    status: "open",
    typ: "felanmalan",
    prioritet: "hög",
    skapad: "2024-03-28",
    tilldelad: "Anna Lindqvist",
    beskrivning: "Touchskärmen slutade fungera efter OS-uppdatering.",
  },
  {
    id: "ARE-002",
    titel: "Samsung Galaxy S24 – VPN-konfiguration",
    foretag: "Beta Consulting",
    status: "pending",
    typ: "installning",
    prioritet: "medium",
    skapad: "2024-03-27",
    tilldelad: "Erik Svensson",
    beskrivning: "Användaren kan inte ansluta till företagets VPN.",
  },
  {
    id: "ARE-003",
    titel: "iPad Pro – byte efter vattenskada",
    foretag: "Gamma Tech",
    status: "open",
    typ: "utbyte",
    prioritet: "hög",
    skapad: "2024-03-26",
    tilldelad: "Maria Karlsson",
    beskrivning: "Enheten har utsatts för vattenskada och behöver bytas ut.",
  },
  {
    id: "ARE-004",
    titel: "Pixel 8 – synkronisering med MDM",
    foretag: "Acme AB",
    status: "open",
    typ: "support",
    prioritet: "låg",
    skapad: "2024-03-25",
    tilldelad: "Johan Berg",
    beskrivning: "Enheten registreras inte korrekt i MDM-systemet.",
  },
  {
    id: "ARE-005",
    titel: "iPhone 14 – skärmspricka",
    foretag: "Delta Services",
    status: "pending",
    typ: "felanmalan",
    prioritet: "medium",
    skapad: "2024-03-24",
    tilldelad: "Sara Johansson",
    beskrivning: "Skärmen är sprucken och användaren behöver reparation.",
  },
  {
    id: "ARE-006",
    titel: "MacBook Air – MDM-registrering",
    foretag: "Beta Consulting",
    status: "resolved",
    typ: "support",
    prioritet: "låg",
    skapad: "2024-03-20",
    tilldelad: "Erik Svensson",
    beskrivning: "Enheten registrerades manuellt och är nu aktiv.",
  },
];

const foretag = ["Alla företag", "Acme AB", "Beta Consulting", "Gamma Tech", "Delta Services"];
const typer: { label: string; value: ArendeTyp | "alla" }[] = [
  { label: "Alla typer", value: "alla" },
  { label: "Support", value: "support" },
  { label: "Felanmälan", value: "felanmalan" },
  { label: "Utbyte", value: "utbyte" },
  { label: "Inställning", value: "installning" },
];

const statusConfig: Record<ArendeStatus, { label: string; color: string; icon: React.ReactNode }> = {
  open: {
    label: "Öppet",
    color: "bg-red-100 text-red-700",
    icon: <AlertCircle className="h-3.5 w-3.5" />,
  },
  pending: {
    label: "Pågående",
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  resolved: {
    label: "Löst",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
};

const prioritetColor: Record<string, string> = {
  hög: "bg-red-500",
  medium: "bg-yellow-500",
  låg: "bg-green-500",
};

const typLabel: Record<ArendeTyp, string> = {
  support: "Support",
  felanmalan: "Felanmälan",
  utbyte: "Utbyte",
  installning: "Inställning",
};

export default function ArendenPage() {
  const [sok, setSok] = useState("");
  const [valtForetag, setValtForetag] = useState("Alla företag");
  const [valtStatus, setValtStatus] = useState<ArendeStatus | "alla">("open");
  const [valtTyp, setValtTyp] = useState<ArendeTyp | "alla">("alla");

  const filtrerade = arenden.filter((a) => {
    const matchSok =
      a.titel.toLowerCase().includes(sok.toLowerCase()) ||
      a.foretag.toLowerCase().includes(sok.toLowerCase()) ||
      a.id.toLowerCase().includes(sok.toLowerCase());
    const matchForetag = valtForetag === "Alla företag" || a.foretag === valtForetag;
    const matchStatus = valtStatus === "alla" || a.status === valtStatus;
    const matchTyp = valtTyp === "alla" || a.typ === valtTyp;
    return matchSok && matchForetag && matchStatus && matchTyp;
  });

  const antalOpen = arenden.filter((a) => a.status === "open").length;
  const antalPending = arenden.filter((a) => a.status === "pending").length;
  const antalResolved = arenden.filter((a) => a.status === "resolved").length;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setValtStatus("open")}
          className={cn(
            "rounded-xl border p-4 text-left transition-all",
            valtStatus === "open"
              ? "border-red-300 bg-red-50 shadow-sm"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <AlertCircle className="h-4 w-4 text-red-500" />
            Öppna ärenden
          </div>
          <div className="text-2xl font-bold text-slate-900">{antalOpen}</div>
        </button>
        <button
          onClick={() => setValtStatus("pending")}
          className={cn(
            "rounded-xl border p-4 text-left transition-all",
            valtStatus === "pending"
              ? "border-yellow-300 bg-yellow-50 shadow-sm"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <Clock className="h-4 w-4 text-yellow-500" />
            Pågående
          </div>
          <div className="text-2xl font-bold text-slate-900">{antalPending}</div>
        </button>
        <button
          onClick={() => setValtStatus("resolved")}
          className={cn(
            "rounded-xl border p-4 text-left transition-all",
            valtStatus === "resolved"
              ? "border-green-300 bg-green-50 shadow-sm"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Lösta
          </div>
          <div className="text-2xl font-bold text-slate-900">{antalResolved}</div>
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
        {/* Sök */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Sök ärende, företag, ID..."
            value={sok}
            onChange={(e) => setSok(e.target.value)}
            className="h-9 w-full rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Företagsfilter */}
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={valtForetag}
            onChange={(e) => setValtForetag(e.target.value)}
            className="h-9 appearance-none rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-8 text-sm text-slate-700 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            {foretag.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Status/öppna ärenden */}
        <div className="relative">
          <AlertCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={valtStatus}
            onChange={(e) => setValtStatus(e.target.value as ArendeStatus | "alla")}
            className="h-9 appearance-none rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-8 text-sm text-slate-700 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="alla">Alla ärenden</option>
            <option value="open">Öppna ärenden</option>
            <option value="pending">Pågående</option>
            <option value="resolved">Lösta</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Typfilter */}
        <div className="relative">
          <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={valtTyp}
            onChange={(e) => setValtTyp(e.target.value as ArendeTyp | "alla")}
            className="h-9 appearance-none rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-8 text-sm text-slate-700 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            {typer.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <span className="ml-auto text-sm text-slate-500">{filtrerade.length} ärenden</span>
      </div>

      {/* Ärendelista */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-medium text-slate-500">ID</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Ärende</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Företag</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Typ</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Prioritet</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Tilldelad</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Skapad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtrerade.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                  Inga ärenden matchade filtret.
                </td>
              </tr>
            ) : (
              filtrerade.map((a) => {
                const s = statusConfig[a.status];
                return (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{a.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{a.titel}</div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{a.beskrivning}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{a.foretag}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {typLabel[a.typ]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("h-2 w-2 rounded-full", prioritetColor[a.prioritet])} />
                        <span className="capitalize text-slate-700">{a.prioritet}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", s.color)}>
                        {s.icon}
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{a.tilldelad}</td>
                    <td className="px-4 py-3 text-slate-500">{a.skapad}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
