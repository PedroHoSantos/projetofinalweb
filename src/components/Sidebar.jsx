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
    <div className="bg-white rounded-2xl p-4 shadow-soft h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Minhas Dietas</h3>
        <button onClick={handleCreate} className="btn btn-primary text-sm">
          Nova
        </button>
      </div>

      <ul className="space-y-2">
        {diets.length === 0 && (
          <p className="text-sm text-grayText text-center">Nenhuma dieta criada</p>
        )}

        {diets.map((d) => (
          <li key={d.id} className="flex justify-between items-center">
            <NavLink
              to={`/editor/${d.id}`}
              className={({ isActive }) =>
                `block flex-1 p-3 rounded-lg ${
                  isActive ? "bg-primary text-white" : "hover:bg-gray-50"
                }`
              }
              onClick={() => onSelect && onSelect(d)}
            >
              {d.name}
            </NavLink>
            <button
              onClick={() => deleteDiet(d.id)}
              className="text-red-500 hover:text-red-700 text-sm ml-2"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <NavLink to="/search" className="btn btn-outline w-full">
          Buscar alimentos
        </NavLink>
      </div>
    </div>
  );
}
