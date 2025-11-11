import React from "react";
import { useParams } from "react-router-dom";
import { useDiet } from "../context/DietContext";

export default function DietDetail() {
  const { dietId } = useParams();
  const { diets } = useDiet();

  const diet = diets.find((d) => d.id === dietId);

  if (!diet) return <p className="text-grayText">Dieta não encontrada.</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft">
      <h2 className="text-2xl font-bold mb-4">{diet.name}</h2>

      {Object.keys(diet.meals || {}).length === 0 && (
        <p className="text-grayText">Nenhum alimento adicionado ainda.</p>
      )}

      {Object.entries(diet.meals || {}).map(([meal, foods]) => (
        <div key={meal} className="mb-6">
          <h3 className="font-semibold text-lg mb-2">{meal}</h3>
          <ul className="space-y-2">
            {foods.map((f, i) => (
              <li
                key={i}
                className="border p-3 rounded-xl flex justify-between text-sm"
              >
                <span>{f.name}</span>
                <span className="text-grayText">{f.nutrients?.energia || 0} kcal</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}