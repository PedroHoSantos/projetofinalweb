import React from "react";
import { MealCard } from "./MealCard";


export default function DietEditor({ selectedDiet, onChangeDiet }) {
    const meals = ["Café da Manhã", "Almoço", "Café da Tarde", "Jantar", "Ceia"];


    return (
        <section className="card h-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="heading">Dieta Selecionada</h2>
                    <p className="subheading">Visualize e edite as refeições da dieta atual.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn btn-outline">Alterar Dieta</button>
                    <button className="btn btn-primary">Dieta Atual</button>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meals.map((m) => (
                    <MealCard key={m} title={m} items={(selectedDiet?.meals?.[m] ?? [])} onAdd={() => onChangeDiet(m)} />
                ))}
            </div>
        </section>
    );
}