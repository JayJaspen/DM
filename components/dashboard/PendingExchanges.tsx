import Link from "next/link";
import { ArrowLeftRight, Clock } from "lucide-react";

const exchanges = [
  { id: "1", requester: "Anna Lindqvist", device: "iPhone 12", reason: "Trasig skärm", submitted: "2026-03-28" },
  { id: "2", requester: "Mikael Ström", device: "Samsung A54", reason: "Batteri ur funktion", submitted: "2026-03-29" },
  { id: "3", requester: "Lisa Pettersson", device: "iPad Air 4", reason: "Enhet för gammal", submitted: "2026-03-30" },
];

export default function PendingExchanges() {
  return (
    <div className="card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-700">Väntande utbytesanmälningar</h2>
          <span className="badge-yellow">{exchanges.length} väntande</span>
        </div>
        <Link href="/exchange" className="text-xs font-medium text-brand-600 hover:text-brand-700">
          Hantera alla →
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        {exchanges.map((ex) => (
          <div key={ex.id} className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                <ArrowLeftRight className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{ex.requester}</p>
                <p className="text-xs text-slate-500">{ex.device} · {ex.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                {ex.submitted}
              </div>
              <Link href={`/exchange/${ex.id}`} className="btn-secondary text-xs py-1 px-2">
                Granska
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
