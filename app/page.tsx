'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("")
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: usuario, password })
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(data?.error || 'Usuario o contraseña incorrectos')
        return
      }

      // Login correcto: cerrar modal y redirigir
      setShowLogin(false)
      router.push('/order')
    } catch (err) {
      setError('Error conectando con el servidor')
    }
  };

  return (
    <main className="min-h-screen relative bg-center bg-cover" style={{ backgroundImage: "url('/DRS_fondo.webp')" }}>

      <header className="fixed top-0 left-0 w-full h-14 bg-amber-500 z-50 border-b-2 border-black/10">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center gap-4">

          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-amber-400 font-bold shadow">
  
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="10" fill="#000" />
              <circle cx="12" cy="12" r="3" fill="#F59E0B" />
              <path d="M2 12c4 6 14 6 20 0" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
            </svg>
          </div>

          <div>
            <h1 className="text-amber-950 font-semibold">Disco Rayado Store</h1>
          </div>

          <div className="ml-auto hidden md:flex items-center gap-6">

          </div>
        </div>
      </header>
 
      <div className="h-14" aria-hidden />

      <section className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
    
          <div id="horario" className="w-80 h-64 rounded-3xl bg-amber-400/85 backdrop-blur-md border border-amber-300/40 p-6 flex flex-col justify-center shadow-lg">
            <h2 className="text-2xl font-bold text-amber-950 mb-2 text-center">Horario</h2>
            <ul className="mt-2 text-amber-950/95 space-y-1 text-center font-medium">
              <li>Lun 8:00 — 20:00</li>
              <li>Mar 8:00 — 20:00</li>
              <li>Mié 8:00 — 20:00</li>
              <li>Jue 8:00 — 20:00</li>
              <li>Vie 8:00 — 20:00</li>
              <li>Sáb 8:00 — 20:00</li>
            </ul>
          </div>

          <div id="iniciar" className="w-80 h-64 rounded-3xl bg-amber-400/85 backdrop-blur-md border border-amber-300/40 p-6 flex flex-col items-center justify-center shadow-lg">
            <h2 className="text-2xl font-bold text-amber-950 mb-3">Iniciar</h2>

            <button
              id="btnLoginInicio"
              onClick={() => { setShowLogin(true); setError(""); }}
              className="relative w-36 h-36 rounded-full flex items-center justify-center bg-black shadow-2xl transform hover:scale-105 transition"
              aria-label="Abrir login"
            >
             
              <div className="w-32 h-32 rounded-full bg-linear-to-b from-slate-900 to-black flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-amber-500" />
              </div>

              <div className="absolute -top-3 -left-6 w-40 h-12 rounded-full bg-white/8 blur-sm opacity-60 transform rotate-12 pointer-events-none" />
            </button>
          </div>
        </div>
      </section>

      {showLogin && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowLogin(false)} />
          <div className="relative z-10 w-full max-w-md mx-4">
            <div className="bg-white rounded-xl p-6 shadow-2xl border border-slate-100">
              <button onClick={() => setShowLogin(false)} className="absolute top-3 right-3 text-slate-500 hover:text-slate-700" aria-label="Cerrar">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <header className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold shadow-sm">DR</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Iniciar sesión</h3>
                  <p className="text-sm text-slate-500">Introduce tus credenciales</p>
                </div>
              </header>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded">{error}</div>}

                <div>
                  <label className="block text-sm text-slate-700">Usuario</label>
                  <input
                    id="campoUsuario"
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="mt-2 block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-700">Contraseña</label>
                  <input
                    id="campoPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                    autoComplete="current-password"
                  />
                </div>


                <div className="flex gap-3 pt-2">
                  <button id="btnCancelarLogin" type="button" onClick={() => setShowLogin(false)} className="flex-1 py-2 rounded-lg border border-slate-200">Cancelar</button>
                  <button id="btnEntrarLogin" type="submit" className="flex-1 py-2 rounded-lg bg-amber-500 text-white">Entrar</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}
