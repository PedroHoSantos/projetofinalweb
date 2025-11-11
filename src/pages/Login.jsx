import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Conta criada com sucesso!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login realizado!");
      }
      onLogin();
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          {isRegistering ? "Criar Conta" : "Entrar"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            required
          />

          <button type="submit" className="btn btn-primary w-full">
            {isRegistering ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Já tem conta? Entrar"
              : "Não tem conta? Criar agora"}
          </button>
        </div>
      </div>
    </div>
  );
}
