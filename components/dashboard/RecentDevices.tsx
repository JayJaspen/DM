import { Smartphone } from "lucide-react";
import Link from "next/link";

const devices = [
  { id: "1", name: "iPhone 15 Pro", owner: "Anna Lindqvist", platform: "iOS", status: "active", lastSeen: "2 min sedan" },
  { id: "2", name: "Samsung Galaxy S24", owner: "Erik Svensson", platform: "Android", status: "active", lastSeen: "15 min sedan" },
  { id: "3", name: "iPad Pro 12.9", owner: "Maria Karlsson", platform: "iOS", status: "inactive", lastSeen: "2 dagar sedan" },
  { id: "4", name: "Pixel 8", owner: "Johan Berg", platform: "Android", status: "active", lastSeen: "1 tim sedan" },
  { id: "5", name: "iPhone 14", owner: "Sara Johansson", platform: "iOS", status: "lost", lastSeen: "5 dagar sedan" },
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

export default function RecentDevices() {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-700">Senaste enheter</h2>
        <Link href="/devices" className="text-xs font-medium text-brand-600 hover:text-brand-700">
          Visa alla →
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        {devices.map((d) => (
          <div key={d.id} className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                <Smartphone className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{d.name}</p>
                <p className="text-xs text-slate-500">{d.owner} · {d.platform}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:block">{d.lastSeen}</span>
              <span className={statusBadge[d.status]}>{statusLabel[d.status]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
