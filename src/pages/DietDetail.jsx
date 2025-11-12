import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDiet } from "../context/DietContext";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function DietDetail() {
  const { dietId } = useParams();
  const { diets } = useDiet();

  const diet = diets.find((d) => d.id === dietId);
  if (!diet) return <p className="text-grayText">Dieta não encontrada.</p>;

  // Totais gerais
  const totals = useMemo(() => {
    const total = { energia: 0, proteina: 0, carboidratos: 0, gordura: 0 };
    Object.values(diet.meals || {}).forEach((foods) => {
      foods.forEach((f) => {
        total.energia += f.nutrients?.energia || 0;
        total.proteina += f.nutrients?.proteina || 0;
        total.carboidratos += f.nutrients?.carboidratos || 0;
        total.gordura += f.nutrients?.gordura || 0;
      });
    });
    return total;
  }, [diet]);

  // Totais por refeição
  const mealTotals = useMemo(() => {
    const results = {};
    Object.entries(diet.meals || {}).forEach(([mealName, foods]) => {
      results[mealName] = foods.reduce(
        (acc, f) => ({
          energia: acc.energia + (f.nutrients?.energia || 0),
          proteina: acc.proteina + (f.nutrients?.proteina || 0),
          carboidratos: acc.carboidratos + (f.nutrients?.carboidratos || 0),
          gordura: acc.gordura + (f.nutrients?.gordura || 0),
        }),
        { energia: 0, proteina: 0, carboidratos: 0, gordura: 0 }
      );
    });
    return results;
  }, [diet]);

  // Dados do gráfico
  const chartData = [
    { name: "Proteína", value: totals.proteina },
    { name: "Carboidratos", value: totals.carboidratos },
    { name: "Gorduras", value: totals.gordura },
  ];
  const COLORS = ["#22c55e", "#3b82f6", "#f97316"];

  // ---------- Função para remover alimento ----------
  async function handleRemoveFood(mealName, index) {
    if (!window.confirm("Remover este alimento da dieta?")) return;

    const user = auth.currentUser;
    if (!user) return alert("Usuário não autenticado.");

    try {
      // Clona meals, remove item e atualiza no Firestore
      const updatedMeals = { ...(diet.meals || {}) };
      if (!Array.isArray(updatedMeals[mealName])) {
        console.warn("Refeição inválida:", mealName);
        return;
      }

      // remove o item pelo índice
      updatedMeals[mealName] = updatedMeals[mealName].filter((_, i) => i !== index);

      const ref = doc(db, "users", user.uid, "diets", diet.id);
      await updateDoc(ref, { meals: updatedMeals });

      // Simples: recarregamos a página para garantir que o contexto seja atualizado
      // (substitua por atualização do contexto caso já tenha função de refresh)
      window.location.reload();
    } catch (err) {
      console.error("Erro ao remover alimento:", err);
      alert("Falha ao remover alimento. Veja o console.");
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft space-y-8">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-2xl font-bold mb-1">{diet.name}</h2>
        <p className="text-grayText text-sm">
          Criada por {diet.author || "Usuário"}{" "}
          {diet.createdAt ? `em ${new Date(diet.createdAt).toLocaleDateString("pt-BR")}` : ""}
        </p>
      </div>

      {/* Totais gerais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="card text-center">
          <div className="font-bold text-lg">{totals.energia.toFixed(0)} kcal</div>
          <div className="text-grayText">Calorias totais</div>
        </div>
        <div className="card text-center">
          <div className="font-bold text-lg">{totals.proteina.toFixed(1)} g</div>
          <div className="text-grayText">Proteínas</div>
        </div>
        <div className="card text-center">
          <div className="font-bold text-lg">{totals.carboidratos.toFixed(1)} g</div>
          <div className="text-grayText">Carboidratos</div>
        </div>
        <div className="card text-center">
          <div className="font-bold text-lg">{totals.gordura.toFixed(1)} g</div>
          <div className="text-grayText">Gorduras</div>
        </div>
      </div>

      {/* Gráfico de macros */}
      <div className="bg-slate-50 p-4 rounded-xl shadow-inner">
        <h3 className="font-semibold mb-2 text-center">Distribuição de Macronutrientes</h3>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v.toFixed(1)} g`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Refeições e alimentos */}
      {Object.entries(diet.meals || {}).map(([mealName, foods]) => (
        <div key={mealName}>
          <h3 className="text-lg font-semibold mb-2">{mealName}</h3>
          <p className="text-sm text-grayText mb-3">
            {mealTotals[mealName]?.energia?.toFixed(0)} kcal —{" "}
            {mealTotals[mealName]?.proteina?.toFixed(1)}g prot,{" "}
            {mealTotals[mealName]?.carboidratos?.toFixed(1)}g carb,{" "}
            {mealTotals[mealName]?.gordura?.toFixed(1)}g gord
          </p>

          <ul className="space-y-3">
            {foods.map((food, i) => (
              <li
                key={i}
                className="flex items-center gap-3 border p-3 rounded-xl hover:bg-gray-50 transition justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={food.image || "https://via.placeholder.com/80?text=Sem+Imagem"}
                    alt={food.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{food.name}</div>
                    <div className="text-xs text-grayText">
                      {food.portion}g — {((food.nutrients?.energia || 0)).toFixed(0)} kcal
                    </div>
                  </div>
                </div>

                <div className="text-sm text-right mr-2">
                  <div>{(food.nutrients?.proteina || 0).toFixed(1)}g prot</div>
                  <div>{(food.nutrients?.carboidratos || 0).toFixed(1)}g carb</div>
                  <div>{(food.nutrients?.gordura || 0).toFixed(1)}g gord</div>
                </div>

                <button
                  onClick={() => handleRemoveFood(mealName, i)}
                  className="text-red-500 hover:text-red-700 text-lg ml-2"
                  title="Remover alimento"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
