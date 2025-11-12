import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useDiet } from "../context/DietContext"; // Importado para pegar estatísticas

// Ícone para o botão de sair
function LogoutIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { diets } = useDiet(); // Pega as dietas do contexto
  const user = auth.currentUser;

  async function handleLogout() {
    if (window.confirm("Tem certeza que deseja sair?")) {
      try {
        await signOut(auth);
        // O App.jsx irá redirecionar para a tela de login automaticamente
        navigate("/");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
        alert("Não foi possível sair. Tente novamente.");
      }
    }
  }

  // Fallback se não houver usuário logado
  if (!user) {
    return (
      <div className="card text-center p-8">
        <p className="text-grayText">Nenhum usuário logado.</p>
        <button onClick={() => navigate('/login')} className="btn btn-primary mt-4">
          Ir para Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft max-w-2xl mx-auto space-y-8">
      {/* Informações do Usuário */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
          {user.email ? user.email[0].toUpperCase() : 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.displayName || 'Usuário'}</h1>
          <p className="text-grayText">{user.email}</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div>
         <h2 className="text-lg font-semibold mb-3 text-gray-700">Suas Estatísticas</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="card text-center bg-base-200/50">
                 <div className="font-bold text-3xl text-primary">{diets.length}</div>
                 <div className="text-grayText text-sm">Dietas Criadas</div>
             </div>
             <div className="card text-center bg-base-200/50">
                 <div className="font-bold text-3xl text-primary">...</div>
                 <div className="text-grayText text-sm">Em breve</div>
             </div>
         </div>
      </div>

      {/* Ações */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Ações da Conta</h2>
        <button onClick={handleLogout} className="btn btn-error w-full gap-2">
          <LogoutIcon />
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
