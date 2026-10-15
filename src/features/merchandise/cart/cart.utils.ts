import { CartItem, StoredCart, StoredCartItem } from "@/types";
import { getMerchandiseBySlug, getAllMerchandise } from "@/data/merchandise.data";

export const CART_STORAGE_KEY = "ner-merchandise-cart";

/**
 * Safely loads stored cart items from browser localStorage.
 * Defends against SSR, corrupted JSON, missing keys, and invalid formats.
 */
export const loadCartFromStorage = (): StoredCartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as StoredCart;
    if (parsed && parsed.version === 1 && Array.isArray(parsed.items)) {
      // Validate items have at least productId and positive quantity
      return parsed.items.filter(
        (item) =>
          typeof item?.productId === "string" &&
          typeof item?.quantity === "number" &&
          item.quantity > 0
      );
    }

    // Invalid format, reset safely
    window.localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  } catch (err) {
    // Corrupted JSON or storage failure
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore storage errors in private browsing/restricted modes
    }
    return [];
  }
};

/**
 * Safely persists cart items to browser localStorage in versioned format.
 */
export const saveCartToStorage = (items: CartItem[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const stored: StoredCart = {
      version: 1,
      items: items.map((item) => ({
        productId: item.productId,
        size: item.size,
        variant: item.variant,
        quantity: item.quantity,
      })),
    };

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Ignore storage quota or disabled localStorage exceptions
  }
};

/**
 * Hydrates stored cart records against authoritative MERCHANDISE_DATA.
 * Guarantees prices and item titles are never trusted from client storage.
 * If an item is discontinued, deleted, or unlisted, it is safely excluded.
 */
export const hydrateCartItems = (stored: StoredCartItem[]): CartItem[] => {
  const allMerch = getAllMerchandise();
  if (!allMerch || allMerch.length === 0) {
    return [];
  }

  const hydrated: CartItem[] = [];

  for (const item of stored) {
    // Look up by id or slug
    const product = allMerch.find(
      (p) => p.id === item.productId || p.slug === item.productId
    );

    if (product) {
      hydrated.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/images/gallery/tank-gloves-macro.jpg",
        size: item.size,
        variant: item.variant,
        quantity: Math.max(1, Math.min(10, Math.floor(item.quantity))),
      });
    }
  }

  return hydrated;
};

/**
 * Generate a unique line-item key for distinct size/variant combinations.
 */
export const getCartItemKey = (
  productId: string,
  size?: string,
  variant?: string
): string => {
  return `${productId}::${size || "standard"}::${variant || "default"}`;
};
