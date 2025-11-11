import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./services/firebase";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import DietEditor from "./pages/DietEditor";
import FoodSearch from "./pages/FoodSearch";
import Profile from "./pages/Profile";
import { DietProvider } from "./context/DietContext";
import LoginPage from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <p>Carregando...</p>;

  // 🔒 Se não estiver logado → mostra tela de login
  if (!user) return <LoginPage onLogin={() => setUser(auth.currentUser)} />;

  // 🔓 Se logado → renderiza as rotas normalmente
  return (
    <DietProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="editor/:dietId" element={<DietEditor />} />
            <Route path="search" element={<FoodSearch />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DietProvider>
  );
}
