import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar fixa à esquerda */}
      <aside className="w-72 bg-white shadow-soft p-4">
        <Sidebar />
      </aside>

      {/* Área principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* <- Aqui as páginas serão renderizadas */}
      </main>
    </div>
  );
}