import { CartItem, StoredCart, StoredCartItem } from "@/types";

export type { CartItem, StoredCart, StoredCartItem };

export interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  total: number;
  addItem: (
    productId: string,
    size?: string,
    variant?: string,
    quantity?: number
  ) => void;
  removeItem: (productId: string, size?: string, variant?: string) => void;
  updateQuantity: (
    productId: string,
    size: string | undefined,
    variant: string | undefined,
    quantity: number
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}
