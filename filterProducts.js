const PRICE_THRESHOLD = 500;

function isValidProduct(product) {
  return (
    product != null &&
    typeof product === "object" &&
    typeof product.price === "number" &&
    Number.isFinite(product.price) &&
    typeof product.quantity === "number" &&
    Number.isFinite(product.quantity) &&
    product.quantity >= 0 &&
    typeof product.available === "boolean"
  );
}

/**
 * Filters out products that are unavailable or priced at ₹500 or below,
 * and returns the remaining products with their total value.
 *
 * Invalid or incomplete product entries are skipped rather than throwing,
 * so one bad row does not discard the rest of the cart.
 *
 * @param {Array<{id: number, name: string, price: number, quantity: number, available: boolean}>} products
 * @returns {{products: Array, totalValue: number}}
 */
function filterProducts(products) {
  if (!Array.isArray(products)) {
    return { products: [], totalValue: 0 };
  }

  const filtered = [];
  let totalValue = 0;

  for (const product of products) {
    if (!isValidProduct(product)) continue;
    if (!product.available || product.price <= PRICE_THRESHOLD) continue;

    filtered.push(product);
    totalValue += product.price * product.quantity;
  }

  return { products: filtered, totalValue };
}

module.exports = { filterProducts, isValidProduct, PRICE_THRESHOLD };
