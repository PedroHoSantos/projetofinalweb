import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Header({ user }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/"); // redireciona para login
    } catch (err) {
      console.error("Erro ao sair:", err);
      alert("Erro ao sair. Tente novamente.");
    }
  }

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <h1
        className="text-xl font-bold text-primary cursor-pointer"
        onClick={() => navigate("/")}
      >
        🍎 Minha Dieta
      </h1>

      <nav className="flex gap-6 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive ? "text-primary" : "text-gray-600 hover:text-black"
            }`
          }
        >
          Início
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive ? "text-primary" : "text-gray-600 hover:text-black"
            }`
          }
        >
          Buscar
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive ? "text-primary" : "text-gray-600 hover:text-black"
            }`
          }
        >
          Perfil
        </NavLink>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Sair
        </button>
      </nav>
    </header>
  );
}
