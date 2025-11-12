import React, { useState } from "react";
import { searchFoodsOpenFoodFacts } from "../services/apiFood";
import FoodModal from "../components/FoodModal";

export default function FoodSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const foods = await searchFoodsOpenFoodFacts(query);
    setResults(foods);
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-2xl font-bold mb-4">Buscar Alimentos</h2>

      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Ex: arroz, frango, banana..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input flex-1"
        />
        <button className="btn btn-primary" type="submit">
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {results.length === 0 && !loading && (
        <p className="text-grayText text-sm">Nenhum resultado encontrado.</p>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {results.map((f) => (
          <li
            key={f.id}
            onClick={() => setSelectedFood(f)}
            className="border rounded-xl p-3 cursor-pointer hover:bg-gray-50 transition"
          >
            <img
              src={f.image || "https://via.placeholder.com/80?text=Sem+Imagem"}
              alt={f.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="font-medium">{f.name}</div>
            <div className="text-sm text-grayText">
              {f.nutrients.energia} kcal —{" "}
              {f.nutrients.proteina}g prot —{" "}
              {f.nutrients.carboidratos}g carb —{" "}
              {f.nutrients.gordura}g gord
            </div>
          </li>
        ))}
      </ul>

      <FoodModal
        open={!!selectedFood}
        onClose={() => setSelectedFood(null)}
        food={selectedFood}
      />
    </div>
  );
}
