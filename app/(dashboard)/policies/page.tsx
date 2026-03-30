"use client";

import Header from "@/components/layout/Header";
import { Plus, ShieldCheck, ShieldAlert, ChevronRight } from "lucide-react";
import { useState } from "react";

const POLICIES = [
  {
    id: "1",
    name: "Baslinjepolicy – iOS",
    description: "Grundläggande säkerhetskrav för alla iOS-enheter.",
    platform: "iOS",
    status: "active",
    devices: 142,
    rules: ["Lösenord krävs (min 8 tecken)", "Skärmlås efter 2 minuter", "Kryptering aktiverad", "Jailbreak förbjudet"],
    updated: "2026-03-10",
  },
  {
    id: "2",
    name: "Baslinjepolicy – Android",
    description: "Grundläggande säkerhetskrav för alla Android-enheter.",
    platform: "Android",
    status: "active",
    devices: 89,
    rules: ["Lösenord krävs (min 8 tecken)", "Skärmlås efter 2 minuter", "Kryptering aktiverad", "Root förbjudet"],
    updated: "2026-03-10",
  },
  {
    id: "3",
    name: "Avancerad säkerhet – Ledningsgrupp",
    description: "Utökade säkerhetskrav för ledningsgruppens enheter.",
    platform: "All",
    status: "active",
    devices: 12,
    rules: ["Biometri krävs", "VPN alltid aktivt", "Lösenord min 12 tecken", "Fjärrhantering aktiverad", "Kamera inaktiverad vid konferensrum"],
    updated: "2026-02-28",
  },
  {
    id: "4",
    name: "BYOD-policy",
    description: "Policy för medarbetares egna enheter med arbetsåtkomst.",
    platform: "All",
    status: "draft",
    devices: 0,
    rules: ["Arbetscontainer isolerad", "Lösenord krävs", "Fjärrradering av arbetsdata tillåten"],
    updated: "2026-03-25",
  },
];

const statusBadge: Record<string, string> = {
  active: "badge-green",
  draft: "badge-yellow",
  archived: "badge-slate",
};

const statusLabel: Record<string, string> = {
  active: "Aktiv",
  draft: "Utkast",
  archived: "Arkiverad",
};

export default function PoliciesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPolicy = POLICIES.find((p) => p.id === selected);

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Header title="Policyer" subtitle={`${POLICIES.length} definierade policyer`} />
        <div className="flex-1 p-6 space-y-4">
          <div className="flex justify-end">
            <button className="btn-primary">
              <Plus className="h-4 w-4" />
              Ny policy
            </button>
          </div>

          <div className="space-y-3">
            {POLICIES.map((p) => (
              <div
                key={p.id}
                className={`card p-4 cursor-pointer transition-all hover:shadow-md ${selected === p.id ? "ring-2 ring-brand-500" : ""}`}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${p.status === "active" ? "bg-green-50" : "bg-yellow-50"}`}>
                      {p.status === "active"
                        ? <ShieldCheck className="h-4 w-4 text-green-600" />
                        : <ShieldAlert className="h-4 w-4 text-yellow-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 hidden sm:block">{p.devices} enheter</span>
                    <span className="badge-blue">{p.platform}</span>
                    <span className={statusBadge[p.status]}>{statusLabel[p.status]}</span>
                    <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${selected === p.id ? "rotate-90" : ""}`} />
                  </div>
                </div>

                {selected === p.id && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Regler ({p.rules.length})</p>
                    <ul className="space-y-1">
                      {p.rules.map((rule, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <ShieldCheck className="h-3 w-3 text-green-500 shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex gap-2">
                      <button className="btn-primary text-xs py-1 px-3">Redigera</button>
                      <button className="btn-secondary text-xs py-1 px-3">Kopiera</button>
                      {p.status === "active" && (
                        <button className="btn-secondary text-xs py-1 px-3 text-red-600">Arkivera</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
