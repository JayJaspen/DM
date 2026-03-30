"use client";

import Header from "@/components/layout/Header";
import { Plus, CheckCircle, XCircle, Clock, ArrowLeftRight } from "lucide-react";
import { useState } from "react";

const EXCHANGES = [
  { id: "1", requester: "Anna Lindqvist", device: "iPhone 12 (SN-IP12-014)", reason: "Trasig skärm – spricka över hela displayen", newModel: "iPhone 15", status: "pending", submitted: "2026-03-28", department: "IT" },
  { id: "2", requester: "Mikael Ström", device: "Samsung Galaxy A54 (SN-SGA-022)", reason: "Batteriet håller inte längre än 2 timmar", newModel: "Samsung Galaxy S24", status: "pending", submitted: "2026-03-29", department: "Försäljning" },
  { id: "3", requester: "Lisa Pettersson", device: "iPad Air 4 (SN-IPA-008)", reason: "Enhet är 4 år gammal och uppfyller inte krav", newModel: "iPad Pro 11", status: "pending", submitted: "2026-03-30", department: "Marknad" },
  { id: "4", requester: "David Holm", device: "Pixel 6 (SN-PX6-031)", reason: "Kameran fungerar inte", newModel: "Pixel 8", status: "approved", submitted: "2026-03-20", department: "Design" },
  { id: "5", requester: "Emma Andersson", device: "iPhone 13 (SN-IP13-019)", reason: "Enhet stulen – polisanmälan bifogad", newModel: "iPhone 15", status: "approved", submitted: "2026-03-18", department: "HR" },
  { id: "6", requester: "Tobias Ek", device: "Surface Pro 7 (SN-SP7-005)", reason: "Laddningsporten är söndrig", newModel: null, status: "rejected", submitted: "2026-03-15", department: "Ekonomi" },
];

const statusConfig: Record<string, { badge: string; label: string; icon: React.ElementType }> = {
  pending: { badge: "badge-yellow", label: "Väntar", icon: Clock },
  approved: { badge: "badge-green", label: "Godkänd", icon: CheckCircle },
  rejected: { badge: "badge-red", label: "Avvisad", icon: XCircle },
  completed: { badge: "badge-slate", label: "Klar", icon: CheckCircle },
};

export default function ExchangePage() {
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = EXCHANGES.filter((e) => filter === "all" || e.status === filter);
  const pending = EXCHANGES.filter((e) => e.status === "pending").length;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <Header title="Utbytesanmälan" subtitle="Hantera anmälningar om enhetsbyten" />
      <div className="flex-1 p-6 space-y-4">

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Väntande", value: EXCHANGES.filter((e) => e.status === "pending").length, color: "text-yellow-600" },
            { label: "Godkända", value: EXCHANGES.filter((e) => e.status === "approved").length, color: "text-green-600" },
            { label: "Avvisade", value: EXCHANGES.filter((e) => e.status === "rejected").length, color: "text-red-600" },
            { label: "Totalt", value: EXCHANGES.length, color: "text-slate-700" },
          ].map((s) => (
            <div key={s.label} className="card p-4">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className={`mt-1 text-2xl font-semibold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-brand-600 text-white"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {{ all: "Alla", pending: "Väntande", approved: "Godkända", rejected: "Avvisade" }[f]}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4" />
            Ny anmälan
          </button>
        </div>

        {/* New exchange form */}
        {showForm && (
          <div className="card p-5 border-brand-200 bg-brand-50">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Ny utbytesanmälan</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Nuvarande enhet</label>
                <input className="input" placeholder="T.ex. iPhone 12 – SN-IP12-014" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Önskad ny enhet (valfritt)</label>
                <input className="input" placeholder="T.ex. iPhone 15 Pro" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">Anledning</label>
                <textarea className="input resize-none" rows={3} placeholder="Beskriv varför enheten behöver bytas ut..." />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary text-sm">Skicka anmälan</button>
              <button className="btn-secondary text-sm" onClick={() => setShowForm(false)}>Avbryt</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <th className="px-4 py-3 font-medium text-slate-600">Anmälare</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Enhet</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Anledning</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Inlämnad</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 font-medium text-slate-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((ex) => {
                  const cfg = statusConfig[ex.status];
                  const Icon = cfg.icon;
                  return (
                    <tr key={ex.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{ex.requester}</p>
                        <p className="text-xs text-slate-500">{ex.department}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{ex.device}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{ex.reason}</td>
                      <td className="px-4 py-3 text-slate-500">{ex.submitted}</td>
                      <td className="px-4 py-3">
                        <span className={`${cfg.badge} inline-flex items-center gap-1`}>
                          <Icon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {ex.status === "pending" && (
                          <div className="flex gap-1">
                            <button className="btn-primary py-1 px-2 text-xs">Godkänn</button>
                            <button className="btn-danger py-1 px-2 text-xs">Avvisa</button>
                          </div>
                        )}
                        {ex.status !== "pending" && (
                          <button className="btn-secondary py-1 px-2 text-xs">Detaljer</button>
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
    </div>
  );
}
