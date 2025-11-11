// src/services/foodApi.js
export async function searchFoodsOpenFoodFacts(query) {
  if (!query) return [];

  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=10`
    );

    const data = await res.json();
    if (!data.products) return [];

    return data.products.map((p, i) => ({
      id: p.id || `off-${i}`,
      name: p.product_name || query,
      brand: p.brands || "Desconhecido",
      image: p.image_front_small_url || null,
      nutrients: {
        energia: p.nutriments?.["energy-kcal_100g"] || 0,
        proteina: p.nutriments?.["proteins_100g"] || 0,
        carboidratos: p.nutriments?.["carbohydrates_100g"] || 0,
        gordura: p.nutriments?.["fat_100g"] || 0,
      },
    }));
  } catch (err) {
    console.error("Erro ao buscar na Open Food Facts:", err);
    return [];
  }
}
