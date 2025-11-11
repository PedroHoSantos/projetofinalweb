import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const DietContext = createContext();
export const useDiet = () => useContext(DietContext);

export function DietProvider({ children }) {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, "users", user.uid, "diets");

    // 🔁 Observa mudanças em tempo real
    const unsub = onSnapshot(ref, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setDiets(list);
    });

    return () => unsub();
  }, []);

  async function addFoodToDiet(dietId, mealName, food) {
    const user = auth.currentUser;
    if (!user) return alert("Faça login para continuar.");

    try {
      const dietRef = doc(db, "users", user.uid, "diets", dietId);
      const mealsRef = collection(dietRef, "meals", mealName, "foods");

      await addDoc(mealsRef, food);
      console.log("✅ Alimento adicionado:", food);
    } catch (err) {
      console.error("Erro ao adicionar alimento:", err);
    }
  }

  async function fetchDietMeals(dietId) {
    const user = auth.currentUser;
    if (!user) return [];

    const meals = {};
    const mealNames = ["Café da Manhã", "Almoço", "Jantar", "Lanche"];

    for (const mealName of mealNames) {
      const ref = collection(db, "users", user.uid, "diets", dietId, "meals", mealName, "foods");
      const snapshot = await getDocs(ref);
      meals[mealName] = snapshot.docs.map((d) => d.data());
    }

    return meals;
  }

  return (
    <DietContext.Provider
      value={{
        diets,
        selectedDiet,
        setSelectedDiet,
        addFoodToDiet,
        fetchDietMeals,
      }}
    >
      {children}
    </DietContext.Provider>
  );
}
