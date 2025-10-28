import React, { useState } from "react";


export default function FoodList({ foods = [], onSelectFood }) {
    const [q, setQ] = useState("");
    const filtered = foods.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));


    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Lista de Alimentos</h3>
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Pesquisar nome de alimentos"
                    className="text-sm border px-3 py-1 rounded-lg"
                />
            </div>


            <div className="space-y-3 max-h-72 overflow-auto">
                {filtered.map((f) => (
                    <div key={f.id} className="flex items-start gap-3 border-b pb-3 hover:bg-gray-50 p-2 rounded" onClick={() => onSelectFood(f)}>
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">Foto</div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{f.name}</div>
                                    <div className="text-xs text-gray-500">{f.description}</div>
                                </div>
                                <div className="text-xs text-gray-400">Dietas: {f.count || 0}</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">Benefícios: {(f.benefits || []).join(" • ")}</div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="mt-4 text-sm text-gray-500">Alimento mais procurado: <span className="font-medium">{foods[0]?.name ?? '—'}</span></div>
        </div>
    );
}