/**
 * API principal: OpenFoodFacts 🇧🇷
 * Fallback: CaloriasPorAlimento 🇧🇷
 * Agora com validação, normalização inteligente e verificação de correspondência.
 */

const OPENFOOD_URL = "https://world.openfoodfacts.org/api/v2";
const FALLBACK_URL = "/api-calorias/api/calorias/?descricao=";

/**
 * Busca alimentos pelo nome, com prioridade OpenFoodFacts
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function searchBrazilianFoods(query) {
  if (!query) return [];

  const cleanQuery = query.trim().toLowerCase();

  try {
    const timeoutMs = 4000;
    const url = `${OPENFOOD_URL}/search?countries_tags=brasil&fields=product_name,brands,nutriments,image_url,image_front_small_url,serving_quantity,serving_size&search_terms=${encodeURIComponent(
      query
    )}&page_size=10`;

    const fetchWithTimeout = Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeoutMs)
      ),
    ]);

    const res = await fetchWithTimeout;
    if (!res || !res.ok) throw new Error(`Erro ${res?.status || "desconhecido"}`);

    const data = await res.json();
    const products = data.products || [];

    // Filtra produtos cujo nome contém o termo buscado
    const relevant = products.filter((p) =>
      (p.product_name || "").toLowerCase().includes(cleanQuery)
    );

    if (!relevant.length) {
      console.warn("Nenhum item condizente, usando fallback...");
      return await searchFallbackCalories(cleanQuery);
    }

    const foods = relevant.map((item) => {
      const n = item.nutriments || {};
      return {
        name: item.product_name || "Produto sem nome",
        brand: item.brands || "Marca não informada",
        image:
          item.image_front_small_url ||
          item.image_url ||
          "https://via.placeholder.com/100x100.png?text=Sem+Imagem",
        portion: item.serving_size || item.serving_quantity || "100 g",
        nutrients: normalizeNutrients(n),
        source: "OpenFoodFacts",
      };
    });

    // Evita duplicatas e resultados vazios
    const uniqueFoods = foods.filter(
      (f) => f.nutrients.energia && f.nutrients.energia > 0
    );

    if (uniqueFoods.length === 0) {
      console.warn("Sem valores válidos, usando fallback...");
      return await searchFallbackCalories(cleanQuery);
    }

    return uniqueFoods;
  } catch (err) {
    console.error("Erro principal:", err.message);
    return await searchFallbackCalories(cleanQuery);
  }
}

/**
 * Fallback — CaloriasPorAlimento API 🇧🇷
 * Retorna apenas 1 alimento com kcal aproximada.
 */
async function searchFallbackCalories(query) {
  try {
    const res = await fetch(`${FALLBACK_URL}${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Erro na API de CaloriasPorAlimento");

    const data = await res.json();

    // Alguns retornam lista, outros um único objeto
    const arr = Array.isArray(data) ? data : [data];

    // Tenta encontrar o mais próximo da descrição
    const match = arr.find((i) =>
      (i.descricao || "").toLowerCase().includes(query)
    );

    if (!match) {
      console.warn("Nenhum alimento correspondente encontrado.");
      return [];
    }

    return [
      {
        name: match.descricao || "Alimento não identificado",
        brand: "Base CaloriasPorAlimento",
        image: "https://via.placeholder.com/100x100.png?text=CaloriasAPI",
        portion: match.quantidade ? `${match.quantidade} g` : "100 g",
        nutrients: {
          energia: parseFloat(match.valorCalorico) || 0,
          proteina: null,
          carboidratos: null,
          gordura: null,
        },
        source: "CaloriasPorAlimento",
      },
    ];
  } catch (err) {
    console.error("Erro no fallback (Heroku API):", err.message);
    return [];
  }
}

/**
 * Normaliza os campos do OpenFoodFacts de forma dinâmica e segura.
 */
function normalizeNutrients(n) {
  const energia =
    n["energy-kcal"] || n["energy_100g"] || n["energy"] / 4.184 || 0;
  return {
    energia: round(energia),
    proteina: round(n["proteins"] || n["proteins_100g"]),
    carboidratos: round(n["carbohydrates"] || n["carbohydrates_100g"]),
    gordura: round(n["fat"] || n["fat_100g"]),
    fibra: round(n["fiber"] || n["fiber_100g"]),
    sodio: round((n["sodium"] || n["sodium_100g"]) / 1000),
  };
}

/** Arredondamento seguro */
function round(value) {
  if (!value || typeof value !== "number" || isNaN(value)) return 0;
  return Math.round(value * 10) / 10;
}
