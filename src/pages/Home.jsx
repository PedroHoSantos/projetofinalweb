import React from "react";
import Sidebar from "../components/Sidebar";
import DietEditor from "../pages/DietEditor";
import FoodList from "../components/FoodList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <header className="flex items-center justify-between mb-6 bg-white rounded-2xl p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-xl font-bold">
            D
          </div>
          <div>
            <div className="font-bold text-lg">Sistema de Dietas</div>
            <div className="text-sm text-grayText">Controle alimentar prático e visual</div>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <Sidebar />
        </div>

        <div className="md:col-span-6">
          <DietEditor />
        </div>

        <div className="md:col-span-3">
          <FoodList />
        </div>
      </main>
    </div>
  );
}
