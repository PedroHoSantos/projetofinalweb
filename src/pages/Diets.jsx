import React from "react";
import { useDiet } from "../context/DietContext";
import { useNavigate } from "react-router-dom";

export default function Diets() {
  const { diets } = useDiet();
  const nav = useNavigate();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft">
      <h2 className="text-2xl font-bold mb-4">Suas Dietas</h2>
      <ul className="space-y-2">
        {diets.map((d) => (
          <li
            key={d.id}
            className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => nav(`/diets/${d.id}`)}
          >
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
