import { createContext, useState } from "react";

export const DietContext = createContext();

export function DietProvider({ children }) {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);

  return (
    <DietContext.Provider value={{ diets, setDiets, selectedDiet, setSelectedDiet }}>
      {children}
    </DietContext.Provider>
  );
}
