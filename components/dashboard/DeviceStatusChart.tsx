"use client";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Aktiv", value: 231, color: "#22c55e" },
  { name: "Inaktiv", value: 11, color: "#94a3b8" },
  { name: "Borttappad", value: 4, color: "#f97316" },
  { name: "Raderad", value: 2, color: "#ef4444" },
];

export default function DeviceStatusChart() {
  return (
    <div className="card p-5 h-full">
      <h2 className="text-sm font-semibold text-slate-700 mb-4">Enhetsstatus</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} enheter`, ""]}
            contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ fontSize: "12px", color: "#475569" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
