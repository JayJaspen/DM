"use client";

import Header from "@/components/layout/Header";
import { Plus, Search, Filter, Smartphone, Laptop, Tablet } from "lucide-react";
import { useState } from "react";

const DEVICES = [
  { id: "1", name: "iPhone 15 Pro", serial: "SN-IP15-001", platform: "iOS", os: "iOS 17.3", model: "iPhone 15 Pro", status: "active", owner: "Anna Lindqvist", enrolled: "2024-01-15", lastSeen: "2026-03-30" },
  { id: "2", name: "Samsung Galaxy S24", serial: "SN-SG24-002", platform: "Android", os: "Android 14", model: "Galaxy S24", status: "active", owner: "Erik Svensson", enrolled: "2024-02-01", lastSeen: "2026-03-30" },
  { id: "3", name: "iPad Pro 12.9", serial: "SN-IP12-003", platform: "iOS", os: "iPadOS 17.2", model: "iPad Pro", status: "inactive", owner: "Maria Karlsson", enrolled: "2023-11-20", lastSeen: "2026-03-28" },
  { id: "4", name: "Pixel 8", serial: "SN-PX8-004", platform: "Android", os: "Android 14", model: "Pixel 8", status: "active", owner: "Johan Berg", enrolled: "2024-03-01", lastSeen: "2026-03-30" },
  { id: "5", name: "iPhone 14", serial: "SN-IP14-005", platform: "iOS", os: "iOS 17.1", model: "iPhone 14", status: "lost", owner: "Sara Johansson", enrolled: "2023-09-10", lastSeen: "2026-03-25" },
  { id: "6", name: "Surface Pro 9", serial: "SN-SP9-006", platform: "Windows", os: "Windows 11", model: "Surface Pro 9", status: "active", owner: "Lars Nilsson", enrolled: "2024-01-08", lastSeen: "2026-03-30" },
];

const statusBadge: Record<string, string> = {
  active: "badge-green",
  inactive: "badge-slate",
  lost: "badge-red",
  wiped: "badge-yellow",
};

const statusLabel: Record<string, string> = {
  active: "Aktiv",
  inactive: "Inaktiv",
  lost: "Borttappad",
  wiped: "Raderad",
};

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "iOS") return <Tablet className="h-4 w-4 text-slate-500" />;
  if (platform === "Windows") return <Laptop className="h-4 w-4 text-slate-500" />;
  return <Smartphone className="h-4 w-4 text-slate-500" />;
}

export default function DevicesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = DEVICES.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.owner.toLowerCase().includes(search.toLowerCase()) ||
      d.serial.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <Header title="Enheter" subtitle={`${DEVICES.length} registrerade enheter`} />
      <div className="flex-1 p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Sök enhet, ägare, serienummer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-9 w-72"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input w-36"
            >
              <option value="all">Alla statusar</option>
              <option value="active">Aktiva</option>
              <option value="inactive">Inaktiva</option>
              <option value="lost">Borttappade</option>
              <option value="wiped">Raderade</option>
            </select>
          </div>
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            Lägg till enhet
          </button>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <th className="px-4 py-3 font-medium text-slate-600">Enhet</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Plattform</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Ägare</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Serienummer</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Senast sedd</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 font-medium text-slate-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                          <PlatformIcon platform={d.platform} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{d.name}</p>
                          <p className="text-xs text-slate-500">{d.os}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{d.platform}</td>
                    <td className="px-4 py-3 text-slate-600">{d.owner}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{d.serial}</td>
                    <td className="px-4 py-3 text-slate-500">{d.lastSeen}</td>
                    <td className="px-4 py-3">
                      <span className={statusBadge[d.status]}>{statusLabel[d.status]}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="btn-secondary py-1 px-2 text-xs">Detaljer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-slate-500">
                Inga enheter matchar din sökning.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
