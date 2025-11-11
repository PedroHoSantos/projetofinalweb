import React from "react";
import Sidebar from "../components/Sidebar";
import DietEditor from "../pages/DietEditor";
import FoodList from "../components/FoodList";

export default function Home() {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h2 className="text-2xl font-bold mb-3">Bem-vindo!</h2>
      <p>Selecione uma dieta à esquerda ou busque novos alimentos.</p>
    </div>
  );
}