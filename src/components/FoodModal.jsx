import React, { useState, useMemo } from "react";
import { useDiet } from "../context/DietContext";

export default function FoodModal({ open, onClose, food }) {
  const { diets, addFoodToDiet } = useDiet();
  const [selectedDiet, setSelectedDiet] = useState("");
  const [meal, setMeal] = useState("Almoço");
  const [portion, setPortion] = useState(100);

  const n = food?.nutrients || {};

  // ✅ useMemo sempre é chamado — mesmo se food for null
  const scaled = useMemo(() => {
    const factor = portion / 100;
    return {
      energia: (n.energia || 0) * factor,
      proteina: (n.proteina || 0) * factor,
      carboidratos: (n.carboidratos || 0) * factor,
      gordura: (n.gordura || 0) * factor,
    };
  }, [portion, n]);

  // 🔒 só interrompe o render **depois dos hooks**
  if (!open || !food) return null;

  async function handleAdd() {
    if (!selectedDiet) return alert("Selecione uma dieta!");
    const item = {
      ...food,
      portion,
      nutrients: scaled,
      addedAt: new Date().toISOString(),
    };
    await addFoodToDiet(selectedDiet, meal, item);
    alert(`${food.name} adicionado à dieta!`);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
        <div className="w-full h-40 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-gray-100">
          <img
            src={food.image || "https://via.placeholder.com/200x200?text=Sem+Imagem"}
            alt={food.name}
            className="object-cover w-full h-full"
          />
        </div>

        <h2 className="text-2xl font-bold mb-1">{food.name}</h2>
        <p className="text-grayText mb-3 text-sm">{food.brand || "Alimento genérico"}</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade (g)
          </label>
          <input
            type="number"
            min="1"
            className="input w-full"
            value={portion}
            onChange={(e) => setPortion(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div>Calorias: <strong>{scaled.energia.toFixed(0)} kcal</strong></div>
          <div>Proteínas: <strong>{scaled.proteina.toFixed(1)} g</strong></div>
          <div>Carboidratos: <strong>{scaled.carboidratos.toFixed(1)} g</strong></div>
          <div>Gorduras: <strong>{scaled.gordura.toFixed(1)} g</strong></div>
        </div>

        <div className="space-y-3 mb-4">
          <select
            className="input w-full"
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
          >
            <option value="">Selecione a dieta</option>
            {diets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            className="input w-full"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          >
            <option>Café da Manhã</option>
            <option>Almoço</option>
            <option>Jantar</option>
            <option>Lanche</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleAdd}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
