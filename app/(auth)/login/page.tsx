"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: Koppla till Supabase auth
    setTimeout(() => {
      setLoading(false);
      setError("Fel e-post eller lösenord.");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 shadow-lg mb-3">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">DManager</h1>
          <p className="text-sm text-slate-500 mt-1">Mobile Device Management</p>
        </div>

        {/* Form */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-5">Logga in</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">E-postadress</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="din@email.se"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Lösenord</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}
            <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
              {loading ? "Loggar in..." : "Logga in"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-slate-500">
            Glömt lösenord?{" "}
            <a href="#" className="text-brand-600 hover:underline">Återställ här</a>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 DManager · Jaspen AB
        </p>
      </div>
    </div>
  );
}
