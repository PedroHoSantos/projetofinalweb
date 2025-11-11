import React, { useState } from "react";
import { useDiet } from "../context/DietContext";

export default function FoodModal({ open, onClose, food }) {
  const { diets, addFoodToDiet } = useDiet();
  const [selectedDiet, setSelectedDiet] = useState("");
  const [meal, setMeal] = useState("Almoço");

  if (!open || !food) return null;
  const n = food.nutrients || {};

  async function handleAdd() {
    if (!selectedDiet) return alert("Selecione uma dieta!");
    await addFoodToDiet(selectedDiet, meal, food);
    alert("Alimento adicionado com sucesso!");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">{food.name}</h2>
        <p className="text-grayText mb-4">{food.brand || "Alimento"}</p>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div>Calorias: <strong>{n.energia || 0} kcal</strong></div>
          <div>Proteínas: <strong>{n.proteina || 0} g</strong></div>
          <div>Carboidratos: <strong>{n.carboidratos || 0} g</strong></div>
          <div>Gorduras: <strong>{n.gordura || 0} g</strong></div>
        </div>

        <div className="space-y-3 mb-4">
          <select
            className="input w-full"
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
          >
            <option value="">Selecione a dieta</option>
            {diets.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
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
