const productsByType = {
  tea: ["Black Tea", "Rooibos Tea", "Herbal Tea"],
  coffee: ["Coffee Beans", "Ground Coffee"],
  wine: ["White Wine", "Red Wine", "Rosé"],
};

// The seven combinations of tea (1), coffee (2), and wine (4).
const withoutFairtrade = { 1: 6, 2: 5, 3: 2, 4: 7, 5: 4, 6: 3, 7: 1 };
const allFairtrade = { 1: 10, 2: 11, 3: 13, 4: 12, 5: 15, 6: 14, 7: 9 };

export function getResultRoute(shoppingCart = [], fairtradeCart = []) {
  const selected = new Set(shoppingCart);
  if (selected.size === 0) return 16;

  const certified = new Set(fairtradeCart.filter((product) => selected.has(product)));
  const typeMask =
    (productsByType.tea.some((product) => selected.has(product)) ? 1 : 0) |
    (productsByType.coffee.some((product) => selected.has(product)) ? 2 : 0) |
    (productsByType.wine.some((product) => selected.has(product)) ? 4 : 0);

  if (certified.size > 0 && certified.size < selected.size) return 8;
  if (certified.size === 0) return withoutFairtrade[typeMask] || 16;
  return allFairtrade[typeMask] || 16;
}
