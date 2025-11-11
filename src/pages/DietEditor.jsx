import React, { useEffect, useState } from "react";
import { useDiet } from "../context/DietContext";

export default function DietEditor() {
  const { selectedDiet, fetchDietMeals } = useDiet();
  const [meals, setMeals] = useState({});

  useEffect(() => {
    if (!selectedDiet) return;
    (async () => {
      const data = await fetchDietMeals(selectedDiet.id);
      setMeals(data);
    })();
  }, [selectedDiet]);

  if (!selectedDiet) {
    return <p className="text-gray-500 text-center">Selecione uma dieta para ver detalhes.</p>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-xl font-bold mb-4">{selectedDiet.name}</h2>

      {Object.keys(meals).length === 0 && (
        <p className="text-sm text-gray-500">Nenhum alimento adicionado ainda.</p>
      )}

      {Object.entries(meals).map(([mealName, foods]) => (
        <div key={mealName} className="mb-6">
          <h3 className="font-semibold mb-2">{mealName}</h3>
          <ul className="space-y-2">
            {foods.map((f, i) => (
              <li key={i} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{f.name}</p>
                  <p className="text-sm text-gray-500">
                    {f.nutrients?.energia || "-"} kcal • {f.nutrients?.proteina || "-"}g proteína
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
