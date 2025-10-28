import React from "react";


export default function ProfileCard({ profile = {}, onLogout, onSave }) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">Foto</div>
                <div>
                    <div className="font-semibold">{profile.name || 'Nome do Usuário'}</div>
                    <div className="text-xs text-gray-500">{profile.email || 'email@exemplo.com'}</div>
                    <div className="text-xs text-gray-500">{profile.phone || '(99) 99999-9999'}</div>
                </div>
            </div>


            <div className="mt-4 space-y-2">
                <div className="text-sm font-medium">Lista de Dietas criadas</div>
                <ul className="text-sm text-gray-600 list-disc ml-5">
                    {(profile.diets || []).map((d) => (
                        <li key={d.id}>{d.name}</li>
                    ))}
                </ul>
            </div>


            <div className="mt-4 flex gap-2">
                <button onClick={onSave} className="flex-1 py-2 rounded-xl border">Salvar alterações</button>
                <button onClick={onLogout} className="flex-1 py-2 rounded-xl bg-red-500 text-white">Deslogar</button>
            </div>
        </div>
    );
}