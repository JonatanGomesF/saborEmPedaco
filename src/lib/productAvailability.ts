export const PRODUCT_AVAILABILITY_KEY = "saborEmpedaco_product_availability";

export function getProductAvailability(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PRODUCT_AVAILABILITY_KEY);
    return raw ? (JSON.parse(raw) as Record<number, boolean>) : {};
  } catch {
    return {};
  }
}

export function setProductAvailability(productId: number, available: boolean): Record<number, boolean> {
  const current = getProductAvailability();
  const next = { ...current, [productId]: available };
  window.localStorage.setItem(PRODUCT_AVAILABILITY_KEY, JSON.stringify(next));
  return next;
}
