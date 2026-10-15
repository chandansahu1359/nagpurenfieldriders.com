/**
 * Canonical Merchandise, Cart & Purchase Request Types
 */

export type MerchandiseSize = "S" | "M" | "L" | "XL" | "XXL" | "FREE_SIZE";

export type MerchandiseStatus =
  | "in_stock"
  | "out_of_stock"
  | "pre_order"
  | "discontinued";

export interface MerchandiseVariant {
  id: string;
  name: string;
  colorHex?: string;
  image?: string;
}

export interface MerchandiseItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  details?: string[];
  images: string[];
  sizes?: MerchandiseSize[];
  variants?: MerchandiseVariant[];
  status: MerchandiseStatus;
  isFeatured?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  variant?: string;
  quantity: number;
}

export interface StoredCartItem {
  productId: string;
  size?: string;
  variant?: string;
  quantity: number;
}

export interface StoredCart {
  version: 1;
  items: StoredCartItem[];
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  total: number;
}

export interface PurchaseCustomerInfo {
  fullName: string;
  email: string;
  confirmEmail: string;
  mobile: string;
  notes?: string;
}

export interface PurchaseRequestPayload {
  customer: PurchaseCustomerInfo;
  cartSnapshot: CartItem[];
  totalAmount: number;
}

export interface PurchaseRequestResponse {
  success: boolean;
  referenceId: string;
  message: string;
}
