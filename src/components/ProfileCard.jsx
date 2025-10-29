import React from "react";


export default function ProfileCard({ profile = {}, onLogout, onSave }) {
    return (
        <section className="card text-center">
            <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        Foto
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold">{profile.name || 'Nome do Usuário'}</h4>
                        <p className="text-sm text-grayText">{profile.email || 'email@exemplo.com'}</p>
                        <p className="text-sm text-grayText mb-4">{profile.phone || '(99) 99999-9999'}</p>
                    </div>
                </div>


                <div className="text-left">
                    <div className="text-sm font-medium mb-2">Dietas criadas</div>
                    <ul className="list-disc ml-5 text-sm text-grayText">
                        {(profile.diets || []).map((d) => (
                            <li key={d.id}>{d.name}</li>
                        ))}
                    </ul>
                </div>


                <div className="flex gap-2 mt-4">
                    <button onClick={onSave} className="btn btn-outline flex-1">Salvar</button>
                    <button onClick={onLogout} className="btn btn-danger flex-1">Sair</button>
                </div>
        </section>
    );
}