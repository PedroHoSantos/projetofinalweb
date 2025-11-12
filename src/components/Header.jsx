import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Header({ user }) {
  const navigate = useNavigate();

  function handleLogout() {
    auth.signOut().then(() => navigate("/"));
  }

  return (
    <header className="flex items-center justify-between bg-white shadow-soft rounded-2xl p-4 mb-6">
      {/* Logo / Home */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer hover:opacity-80"
      >
        <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-xl font-bold">
          D
        </div>
        <div>
          <h1 className="text-lg font-bold">DietApp</h1>
          <p className="text-sm text-grayText">Gerencie suas dietas</p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium px-3 py-2 rounded-lg ${
              isActive ? "bg-primary text-white" : "hover:bg-gray-100"
            }`
          }
        >
          Início
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-sm font-medium px-3 py-2 rounded-lg ${
              isActive ? "bg-primary text-white" : "hover:bg-gray-100"
            }`
          }
        >
          Perfil
        </NavLink>

        {/* Usuário logado */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-xl">
          <span className="text-sm text-grayText">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-red-500 text-sm font-semibold hover:text-red-700"
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}
