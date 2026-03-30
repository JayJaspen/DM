"use client";

import Header from "@/components/layout/Header";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";

const enrollmentData = [
  { month: "Okt", enheter: 18 },
  { month: "Nov", enheter: 24 },
  { month: "Dec", enheter: 15 },
  { month: "Jan", enheter: 31 },
  { month: "Feb", enheter: 27 },
  { month: "Mar", enheter: 22 },
];

const platformData = [
  { name: "iOS", antal: 142 },
  { name: "Android", antal: 89 },
  { name: "Windows", antal: 15 },
  { name: "macOS", antal: 2 },
];

const activityData = [
  { date: "24 Mar", aktiva: 228, inaktiva: 20 },
  { date: "25 Mar", aktiva: 229, inaktiva: 19 },
  { date: "26 Mar", aktiva: 226, inaktiva: 22 },
  { date: "27 Mar", aktiva: 230, inaktiva: 18 },
  { date: "28 Mar", aktiva: 231, inaktiva: 17 },
  { date: "29 Mar", aktiva: 229, inaktiva: 19 },
  { date: "30 Mar", aktiva: 231, inaktiva: 17 },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <Header title="Rapporter" subtitle="Statistik och trender" />
      <div className="flex-1 p-6 space-y-6">

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Genomsnittlig enrollmenttid", value: "4.2 min" },
            { label: "Enhetscompliance", value: "96.3%" },
            { label: "Aktiva de senaste 7 dagarna", value: "214" },
            { label: "Politikbrott denna månad", value: "3" },
          ].map((s) => (
            <div key={s.label} className="card p-4">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Enrollments per month */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Enrollments per månad</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
                <Bar dataKey="enheter" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Platform distribution */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Fördelning per plattform</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={platformData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={65} />
                <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
                <Bar dataKey="antal" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity over time */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Enhetsaktivitet – senaste 7 dagarna</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
              <Legend formatter={(v) => <span style={{ fontSize: "12px", color: "#475569" }}>{v === "aktiva" ? "Aktiva" : "Inaktiva"}</span>} />
              <Line type="monotone" dataKey="aktiva" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="inaktiva" stroke="#94a3b8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
