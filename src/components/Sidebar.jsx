import React from "react";


export default function Sidebar({ diets = [], onSelect, onEdit, onDelete, onCreate }) {
    return (
        <aside className="bg-white/90 p-4 rounded-2xl shadow-soft h-full overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">Lista de Dietas Salvas</h3>
            <div className="space-y-2 max-h-72 overflow-auto">
                {diets.map((d) => (
                    <div
                        key={d.id}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100"
                    >
                        <button className="flex items-center gap-3 text-left flex-1" onClick={() => onSelect(d)}>
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium">
                                {d.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-medium">{d.name}</div>
                                <div className="text-xs text-gray-500">{d.author || 'Criada por você'}</div>
                            </div>
                        </button>


                        <div className="flex gap-2">
                            <button onClick={() => onEdit(d)} className="text-xs px-2 py-1 rounded bg-yellow-100">Editar</button>
                            <button onClick={() => onDelete(d)} className="text-xs px-2 py-1 rounded bg-red-100">Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <button onClick={onCreate} className="w-full py-2 rounded-xl bg-blue-600 text-white font-medium">Criar nova dieta</button>
            </div>
        </aside>
    );
}