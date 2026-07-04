import { products as defaultProducts } from "../data/products";

export type MenuProduct = (typeof defaultProducts)[number] & {
  category: string;
};

export type MenuCategory = {
  id: string;
  name: string;
};

const PRODUCTS_KEY = "saborEmPedaco-menu-products";
const CATEGORIES_KEY = "saborEmPedaco-menu-categories";

const defaultCategories: MenuCategory[] = [
  { id: "caldos", name: "Caldos" },
  { id: "bebidas", name: "Bebidas" },
];

const defaultProductsWithCategory: MenuProduct[] = defaultProducts.map((product) => ({
  ...product,
  category: "Caldos",
}));

const safeStorageGet = <T,>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const safeStorageSet = <T,>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore write errors
  }
};

export const getStoredCategories = (): MenuCategory[] => {
  const stored = safeStorageGet<MenuCategory[]>(CATEGORIES_KEY);
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  safeStorageSet(CATEGORIES_KEY, defaultCategories);
  return defaultCategories;
};

export const setStoredCategories = (categories: MenuCategory[]) => {
  safeStorageSet(CATEGORIES_KEY, categories);
};

export const getStoredProducts = (): MenuProduct[] => {
  const stored = safeStorageGet<MenuProduct[]>(PRODUCTS_KEY);
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  safeStorageSet(PRODUCTS_KEY, defaultProductsWithCategory);
  return defaultProductsWithCategory;
};

export const setStoredProducts = (products: MenuProduct[]) => {
  safeStorageSet(PRODUCTS_KEY, products);
};

export const resetStoredMenu = () => {
  safeStorageSet(PRODUCTS_KEY, defaultProductsWithCategory);
  safeStorageSet(CATEGORIES_KEY, defaultCategories);
};
