import React, { useEffect, useState } from "react";
import { useDiet } from "../context/DietContext";

export default function DietEditor() {
  const { selectedDiet, fetchDietMeals, deleteFood } = useDiet();
  const [meals, setMeals] = useState({});
  const [totals, setTotals] = useState({ kcal: 0, prot: 0, carb: 0, fat: 0 });

  useEffect(() => {
    if (!selectedDiet) return;
    (async () => {
      const data = await fetchDietMeals(selectedDiet.id);
      setMeals(data);
      calcTotals(data);
    })();
  }, [selectedDiet]);

  function calcTotals(meals) {
    let total = { kcal: 0, prot: 0, carb: 0, fat: 0 };
    Object.values(meals).forEach((foods) => {
      foods.forEach((f) => {
        total.kcal += Number(f.nutrients?.energia || 0);
        total.prot += Number(f.nutrients?.proteina || 0);
        total.carb += Number(f.nutrients?.carboidratos || 0);
        total.fat += Number(f.nutrients?.gordura || 0);
      });
    });
    setTotals(total);
  }

  async function handleDelete(meal, foodId) {
    await deleteFood(selectedDiet.id, meal, foodId);
    const data = await fetchDietMeals(selectedDiet.id);
    setMeals(data);
    calcTotals(data);
  }

  if (!selectedDiet)
    return <p className="text-gray-500 text-center">Selecione uma dieta.</p>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-xl font-bold mb-4">{selectedDiet.name}</h2>

      {Object.keys(meals).length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum alimento adicionado.</p>
      ) : (
        Object.entries(meals).map(([meal, foods]) => (
          <div key={meal} className="mb-6">
            <h3 className="font-semibold mb-2">{meal}</h3>
            <ul className="space-y-2">
              {foods.map((f) => (
                <li
                  key={f.id}
                  className="border rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-sm text-gray-500">
                      {f.nutrients?.energia || 0} kcal •{" "}
                      {f.nutrients?.proteina || 0}g proteína
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(meal, f.id)}
                    className="text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {/* Totais */}
      <div className="border-t pt-4 mt-4 text-sm text-gray-700">
        <p>
          <strong>Totais:</strong> {totals.kcal} kcal — {totals.prot}g proteína —{" "}
          {totals.carb}g carboidratos — {totals.fat}g gorduras
        </p>
      </div>
    </div>
  );
}
