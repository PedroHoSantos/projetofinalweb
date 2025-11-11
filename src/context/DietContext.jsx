import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../services/firebase";

const DietContext = createContext();
export const useDiet = () => useContext(DietContext);

export function DietProvider({ children }) {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Carrega dietas do Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchDiets = async () => {
      const snapshot = await getDocs(collection(db, "users", user.uid, "diets"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setDiets(data);
      setLoading(false);
    };
    fetchDiets();
  }, []);

  // 🔹 Adiciona alimento à dieta
  async function addFoodToDiet(dietId, meal, food) {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const dietRef = doc(db, "users", user.uid, "diets", dietId);
    const diet = diets.find((d) => d.id === dietId);
    if (!diet) return;

    const meals = { ...diet.meals };
    if (!meals[meal]) meals[meal] = [];
    meals[meal].push(food);

    await updateDoc(dietRef, { meals });
    setDiets((prev) =>
      prev.map((d) => (d.id === dietId ? { ...d, meals } : d))
    );
  }

  return (
    <DietContext.Provider
      value={{
        diets,
        setDiets,
        loading,
        addFoodToDiet,
      }}
    >
      {children}
    </DietContext.Provider>
  );
}