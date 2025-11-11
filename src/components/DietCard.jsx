import React from "react";


export function MealCard({ title, items = [], onAdd }) {
    return (
        <div className="bg-white p-3 rounded-xl shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold">{title}</h4>
                <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 rounded bg-green-100">Salvar</button>
                    <button className="text-xs px-2 py-1 rounded bg-red-100">Excluir</button>
                </div>
            </div>
            <div className="mt-3 flex-1">
                {items.length === 0 ? (
                    <div className="text-sm text-gray-600">Nenhum alimento selecionado — selecione à direita.</div>
                ) : (
                    <ul className="space-y-2">
                        {items.map((it) => (
                            <li key={it.id} className="text-sm text-gray-700">{it.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-3">
                <button onClick={onAdd} className="w-full text-sm py-2 rounded-lg border">Adicionar alimento</button>
            </div>
        </div>
    );
}