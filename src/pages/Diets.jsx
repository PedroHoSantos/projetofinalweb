// src/pages/Diets.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DietEditor from "../components/DietEditor";
import FoodList from "../components/FoodList";
import ProfileCard from "../components/ProfileCard";

// Dados mockados
const MOCK_DIETS = [
    { id: "d1", name: "Dieta Mediterrânea", author: "Sistema", meals: {} },
    { id: "d2", name: "Low Carb", author: "Usuário", meals: {} },
];

const MOCK_FOODS = [
    { id: "f1", name: "Abacate", description: "Fruta rica em gorduras boas", benefits: ["Saciedade", "Vitaminas"], count: 12 },
    { id: "f2", name: "Peito de Frango", description: "Proteína magra", benefits: ["Muscular"], count: 8 },
    { id: "f3", name: "Quinoa", description: "Grão integral", benefits: ["Proteína completa"], count: 5 },
];

export default function DietsPage() {
    const [diets, setDiets] = useState(MOCK_DIETS);
    const [selectedDiet, setSelectedDiet] = useState(MOCK_DIETS[0]);
    const [foods] = useState(MOCK_FOODS);
    const [profile] = useState({ name: "Usuário Exemplo", email: "user@example.com", diets: MOCK_DIETS });

    function handleSelect(d) {
        setSelectedDiet(d);
    }

    function handleEdit(d) {
        console.log("Editar", d);
    }

    function handleDelete(d) {
        if (!confirm(`Excluir ${d.name}?`)) return;
        setDiets((prev) => prev.filter((x) => x.id !== d.id));
        if (selectedDiet?.id === d.id) setSelectedDiet(null);
    }

    function handleCreate() {
        const name = prompt("Nome da nova dieta:");
        if (!name) return;
        const novo = { id: `d${Date.now()}`, name, author: "Você", meals: {} };
        setDiets((p) => [novo, ...p]);
        setSelectedDiet(novo);
    }

    function handleSelectFood(food) {
        const mealName = "Café da Manhã";
        setDiets((prev) =>
            prev.map((d) =>
                d.id === selectedDiet.id
                    ? { ...d, meals: { ...d.meals, [mealName]: [...(d.meals?.[mealName] ?? []), food] } }
                    : d
            )
        );
        setSelectedDiet((sd) => ({
            ...sd,
            meals: { ...sd.meals, [mealName]: [...(sd.meals?.[mealName] ?? []), food] },
        }));
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
            <header className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
                    <div>
                        <div className="text-xl font-bold">Dietas — Mockup</div>
                        <div className="text-sm text-gray-500">Protótipo funcional com dados mockados</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-3 py-2 rounded-lg">Manual do Usuário</button>
                    <div className="w-10 h-10 bg-gray-100 rounded-full" />
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3 order-2 md:order-1">
                    <Sidebar
                        diets={diets}
                        onSelect={handleSelect}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onCreate={handleCreate}
                    />
                </div>

                <div className="md:col-span-6 order-1 md:order-2">
                    <DietEditor selectedDiet={selectedDiet} onChangeDiet={(m) => console.log("Adicionar em", m)} />
                </div>

                <div className="md:col-span-3 order-3 space-y-4">
                    <FoodList foods={foods} onSelectFood={handleSelectFood} />
                    <ProfileCard
                        profile={profile}
                        onLogout={() => alert("Logout")}
                        onSave={() => alert("Salvar")}
                    />
                </div>
            </main>
        </div>
    );
}
