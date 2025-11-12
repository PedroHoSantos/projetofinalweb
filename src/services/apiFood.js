// src/services/foodApi.js
export async function searchFoodsOpenFoodFacts(query, page = 1) {
  if (!query) return [];

  try {
    const res = await fetch(
      `https://br.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=50&page=${page}`
    );

    if (!res.ok) throw new Error("Erro na requisição da Open Food Facts");
    const data = await res.json();

    if (!data.products) return [];

    // Filtra duplicados e limpa resultados incompletos
    const unique = new Map();

    data.products.forEach((p) => {
      const name = p.product_name?.trim();
      if (!name || unique.has(name.toLowerCase())) return;

      const kcal = p.nutriments?.["energy-kcal_100g"];
      if (!kcal) return; // ignora se não há informação nutricional

      unique.set(name.toLowerCase(), {
        id: p.id || name,
        name,
        brand: p.brands || "Desconhecido",
        image:
          p.image_front_small_url ||
          p.image_front_url ||
          p.image_url ||
          "https://via.placeholder.com/120x120?text=Sem+Imagem",
        nutrients: {
          energia: kcal,
          proteina: p.nutriments?.["proteins_100g"] || 0,
          carboidratos: p.nutriments?.["carbohydrates_100g"] || 0,
          gordura: p.nutriments?.["fat_100g"] || 0,
        },
      });
    });

    return Array.from(unique.values());
  } catch (err) {
    console.error("Erro ao buscar alimentos:", err);
    return [];
  }
}
