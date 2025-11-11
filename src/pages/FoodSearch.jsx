import React, { useState } from "react";
import FoodModal from "../components/FoodModal";
import { useDiet } from "../context/DietContext";

// ⚠️ Se você tiver uma API real, importe aqui
// import { searchBrazilianFoods } from "../services/apiFoods";

export default function FoodSearch() {
  const [q, setQ] = useState("");          // ✅ variável de busca
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFood, setModalFood] = useState(null);
  const { diets, addFoodToDiet } = useDiet();

  // Simulação de busca (use API real depois)
  async function handleSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;

    // Mock de alimentos (substituir depois pela API real)
    const mockResults = [
      {
        id: 1,
        name: "Frango Grelhado",
        brand: "Genérico",
        image: "https://via.placeholder.com/100",
        nutrients: { energia: 165, proteina: 31, carboidratos: 0, gordura: 3.6 },
      },
      {
        id: 2,
        name: "Arroz Integral",
        brand: "Tio João",
        image: "https://via.placeholder.com/100",
        nutrients: { energia: 124, proteina: 2.6, carboidratos: 26, gordura: 1 },
      },
    ];

    // Aqui você chamaria: const res = await searchBrazilianFoods(q);
    setResults(mockResults);
  }

  function handleOpenModal(food) {
    setModalFood(food);
    setModalOpen(true);
  }

  function handleAddFood(food) {
    if (!diets.length) {
      alert("Crie uma dieta antes de adicionar alimentos.");
      return;
    }

    const selectedDiet = prompt(`Escolha a dieta: ${diets.map(d => d.name).join(", ")}`);
    const meal = prompt("Informe a refeição (ex: Café, Almoço, Jantar):", "Almoço");
    if (!selectedDiet || !meal) return;

    const chosenDiet = diets.find(d => d.name === selectedDiet);
    if (!chosenDiet) {
      alert("Dieta não encontrada.");
      return;
    }

    addFoodToDiet(chosenDiet.id, meal, food);
    alert(`Adicionado ${food.name} ao ${meal} da dieta ${selectedDiet}.`);
    setModalOpen(false);
  }

  return (
    <div>
      <h1 className="heading">Buscar Alimentos</h1>

      {/* 🔎 Campo de busca */}
      <form onSubmit={handleSearch} className="flex gap-3 my-4">
        <input
          className="input flex-1"
          placeholder="Digite o nome do alimento..."
          value={q}
          onChange={(e) => setQ(e.target.value)}   // ✅ setQ definido
        />
        <button className="btn btn-primary">Buscar</button>
      </form>

      {/* 📋 Resultados */}
      <ul className="space-y-3">
        {results.map((f) => (
          <li
            key={f.id}
            className="card flex justify-between items-center cursor-pointer hover:shadow-md transition"
            onClick={() => handleOpenModal(f)}
          >
            <div className="flex items-center gap-3">
              <img
                src={f.image}
                alt={f.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <div className="font-semibold">{f.name}</div>
                <div className="text-xs text-grayText">{f.nutrients.energia} kcal</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">Ver detalhes</div>
          </li>
        ))}
      </ul>

      {/* 🍎 Modal de detalhes */}
      <FoodModal
        open={modalOpen}
        food={modalFood}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddFood}
      />
    </div>
  );
}
