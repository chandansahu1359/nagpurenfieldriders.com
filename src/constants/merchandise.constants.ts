import { MerchandiseStatus, MerchandiseSize } from "@/types";

export const MERCHANDISE_STATUS_LABELS: Record<MerchandiseStatus, string> = {
  in_stock: "In Stock",
  out_of_stock: "Currently Unavailable",
  pre_order: "Pre-Order",
  discontinued: "Archived Edition",
};

export const MERCHANDISE_SIZE_LABELS: Record<MerchandiseSize, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "X-Large",
  XXL: "2X-Large",
  FREE_SIZE: "One Size",
};
