"use client";

import Header from "@/components/layout/Header";
import { Plus, Search, Mail, Phone } from "lucide-react";
import { useState } from "react";

const USERS = [
  { id: "1", name: "Anna Lindqvist", email: "anna.lindqvist@företag.se", role: "admin", department: "IT", phone: "+46 70 123 45 67", devices: 2, created: "2023-01-15" },
  { id: "2", name: "Erik Svensson", email: "erik.svensson@företag.se", role: "technician", department: "IT", phone: "+46 70 234 56 78", devices: 1, created: "2023-03-22" },
  { id: "3", name: "Maria Karlsson", email: "maria.karlsson@företag.se", role: "user", department: "Försäljning", phone: "+46 73 345 67 89", devices: 1, created: "2023-06-10" },
  { id: "4", name: "Johan Berg", email: "johan.berg@företag.se", role: "user", department: "Marknad", phone: "+46 76 456 78 90", devices: 1, created: "2024-01-05" },
  { id: "5", name: "Sara Johansson", email: "sara.johansson@företag.se", role: "user", department: "HR", phone: "+46 70 567 89 01", devices: 1, created: "2024-02-14" },
  { id: "6", name: "Lars Nilsson", email: "lars.nilsson@företag.se", role: "technician", department: "IT", phone: "+46 73 678 90 12", devices: 2, created: "2023-11-01" },
];

const roleBadge: Record<string, string> = {
  admin: "badge-blue",
  technician: "badge-yellow",
  user: "badge-slate",
};

const roleLabel: Record<string, string> = {
  admin: "Admin",
  technician: "Tekniker",
  user: "Användare",
};

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = ["bg-brand-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500", "bg-teal-500"];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <Header title="Användare" subtitle={`${USERS.length} registrerade användare`} />
      <div className="flex-1 p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Sök namn, e-post, avdelning..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-9 w-72"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input w-36"
            >
              <option value="all">Alla roller</option>
              <option value="admin">Admin</option>
              <option value="technician">Tekniker</option>
              <option value="user">Användare</option>
            </select>
          </div>
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            Lägg till användare
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((u, i) => (
            <div key={u.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                    {initials(u.name)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.department}</p>
                  </div>
                </div>
                <span className={roleBadge[u.role]}>{roleLabel[u.role]}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="h-3 w-3" />
                  {u.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone className="h-3 w-3" />
                  {u.phone}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">{u.devices} enhet{u.devices !== 1 ? "er" : ""}</span>
                <button className="btn-secondary py-1 px-2 text-xs">Hantera</button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="card py-12 text-center text-sm text-slate-500">
            Inga användare matchar din sökning.
          </div>
        )}
      </div>
    </div>
  );
}
