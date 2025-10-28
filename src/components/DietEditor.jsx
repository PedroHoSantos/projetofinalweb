import React from "react";
import { MealCard } from "./MealCard";


export default function DietEditor({ selectedDiet, onChangeDiet }) {
    const meals = ["Café da Manhã", "Almoço", "Café da Tarde", "Jantar", "Ceia"];


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Dieta Selecionada</h2>
                    <p className="text-sm text-gray-500">Visualize e edite as refeições da dieta atual.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-3 py-2 rounded-xl border">Alterar Dieta</button>
                    <button className="px-3 py-2 rounded-xl bg-blue-600 text-white">Dieta Atual</button>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meals.map((m) => (
                    <MealCard key={m} title={m} items={(selectedDiet?.meals?.[m] ?? [])} onAdd={() => onChangeDiet(m)} />
                ))}
            </div>
        </div>
    );
}