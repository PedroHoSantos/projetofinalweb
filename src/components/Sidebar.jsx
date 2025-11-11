import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDiet } from "../context/DietContext";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase"; // 👈 certifique-se do caminho correto

export default function Sidebar({ onSelect }) {
  const { diets, setDiets, setSelectedDiet, deleteDiet } = useDiet();
  const nav = useNavigate();

  async function handleCreate() {
    const name = prompt("Nome da nova dieta:");
    if (!name) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("É preciso estar logado para criar dietas!");
        return;
      }

      const newDiet = {
        name,
        author: user.email || "Usuário",
        meals: {},
        createdAt: new Date().toISOString(),
      };

      // 🔥 Salva no Firestore
      const ref = collection(db, "users", user.uid, "diets");
      const docRef = await addDoc(ref, newDiet);

      const created = { id: docRef.id, ...newDiet };

      // ✅ Atualiza contexto global
      setDiets((prev) => [created, ...prev]);
      setSelectedDiet(created);

      alert("Dieta criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar dieta:", error);
      alert("Erro ao salvar dieta. Verifique o console.");
    }
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold text-lg mb-4">Minhas Dietas</h3>

      <ul className="flex-1 space-y-2">
        {diets.map((d) => (
          <li key={d.id}>
            <NavLink
              to={`/diets/${d.id}`}
              className={({ isActive }) =>
                `block p-3 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"
                }`
              }
            >
              {d.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-2">
        <button
          onClick={() => nav("/search")}
          className="btn btn-outline w-full text-sm"
        >
          Buscar alimentos
        </button>
        <button
          onClick={() => nav("/profile")}
          className="btn btn-primary w-full text-sm"
        >
          Perfil
        </button>
      </div>
    </div>
  );
}