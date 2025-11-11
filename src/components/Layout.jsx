import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between p-4 bg-white shadow-soft rounded-b-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-xl font-bold">D</div>
          <div>
            <div className="font-bold text-lg">Sistema de Dietas</div>
            <div className="text-sm text-grayText">Controle visual e prático</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/profile" className="btn btn-outline text-sm">Perfil</a>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          <aside className="md:col-span-3">
            <Sidebar />
          </aside>

          <main className="md:col-span-6 overflow-y-auto bg-transparent">
            <Outlet />
          </main>

          <aside className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-soft">
              <p className="font-semibold">Resumo ou widgets</p>
              <p className="text-sm text-grayText">Espaço reservado para cards rápidos</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
