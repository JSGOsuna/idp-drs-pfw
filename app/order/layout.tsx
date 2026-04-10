import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full h-14 bg-amber-500 z-50 border-b border-black/10 shadow-sm">
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

          <div className="ml-auto flex items-center gap-6">
            <a
              href="/"
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1.5 rounded-full shadow"
            >
              Salir
            </a>
          </div>
        </div>
      </header>

      {/* espacio para que el contenido no quede bajo el header */}
      <div className="pt-14" />

      {/* fondo de la página */}
      <div className="min-h-[calc(100vh-3.5rem)] bg-center bg-cover" style={{ backgroundImage: "url('/DRS_fondo.webp')" }}>

        {/* OrderSidebar: tarjeta ancha y grid para mostrar todas las categorías sin scroll */}
        {/* OrderSidebar expandido: overlay full-width para "tapar" lo que quede fuera */}
        <div className="sticky top-14 left-0 right-0 z-50">
          <div className="w-full bg-white shadow-lg border-b border-black/5">
            <div className="max-w-screen-2xl mx-auto px-6">
              <div className="p-4">
                <OrderSidebar />
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor principal: centro (productos) + derecha (resumen) */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_24rem]">
            <main className="min-h-[60vh]">
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 ring-1 ring-black/3">
                  {children}
                </div>
              </div>
            </main>

            <aside className="hidden md:block">
              <div className="sticky top-14">
                <div className="w-105 bg-white rounded-lg shadow-sm p-4 border border-black/5 " >
                  <OrderSummary />
                </div>
              </div>
            </aside>
          </div>
        </div>

      </div>
    </>
  )
}