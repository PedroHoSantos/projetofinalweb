import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center text-center p-6">
      {/* Cabeçalho simples */}
      <div className="mb-10">
        <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-2xl text-3xl font-bold mx-auto">
          D
        </div>
        <h1 className="text-3xl font-bold mt-4 text-gray-800">Sistema de Dietas</h1>
        <p className="text-gray-600 mt-2">
          Gerencie, crie e visualize suas dietas de forma simples e rápida.
        </p>
      </div>

      {/* Botões principais */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="px-8 py-3 bg-white border rounded-xl shadow hover:bg-gray-50 text-blue-600 font-medium"
        >
          Fazer Login
        </Link>
        <Link
          to="/dietas"
          className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 font-medium"
        >
          Acessar Dietas
        </Link>
      </div>

      {/* Rodapé */}
      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Sistema de Dietas — Todos os direitos reservados.
      </footer>
    </div>
  );
}
