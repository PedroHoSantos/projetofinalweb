import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDiet } from "../context/DietContext";
import { collection, addDoc, doc, deleteDoc  } from "firebase/firestore";
import { db, auth } from "../services/firebase";

function TrashIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

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
  async function handleDelete(dietId, dietName, e) {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm(`Tem certeza que deseja apagar a dieta "${dietName}"?`)) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("É preciso estar logado para apagar dietas!");
        return;
      }

      // Apaga do Firestore
      const dietRef = doc(db, "users", user.uid, "diets", dietId);
      await deleteDoc(dietRef);

      // Atualiza o estado global através do contexto
      deleteDiet(dietId);

      alert("Dieta apagada com sucesso!");

      // Navega para a home para não ficar em uma página deletada
      nav("/");

    } catch (error) {
      console.error("Erro ao apagar dieta:", error);
      alert("Erro ao apagar dieta. Verifique o console.");
    }
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold text-lg mb-4">Minhas Dietas</h3>
      <button onClick={handleCreate} className="btn btn-primary text-sm mb-2">
          Nova Dieta
        </button>

      <ul className="flex-1 space-y-2 overflow-y-auto -mr-2 pr-2">
        {diets.map((d) => (
          <li key={d.id}>
            <NavLink
              to={`/diets/${d.id}`}
              className={({ isActive }) =>
                `flex items-center justify-between p-3 rounded-lg transition-colors duration-200 group ${isActive ? "bg-primary text-white shadow-md" : "hover:bg-base-300"}`
              }
            >
              <span className="truncate flex-1">{d.name}</span>
              <button
                onClick={(e) => handleDelete(d.id, d.name, e)}
                className="ml-2 p-1 text-gray-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Apagar dieta"
              >
                <TrashIcon />
              </button>
            </NavLink>
          </li>
        ))}
        {diets.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>Nenhuma dieta criada.</p>
            <p className="text-sm">Clique em '+' para começar.</p>
          </div>
        )}
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