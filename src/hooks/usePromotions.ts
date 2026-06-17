import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export type Promotion = {
  id: number;
  product_id: number;
  discount: number;
  active: boolean;
};

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    loadPromotions();
  }, []);

  async function loadPromotions() {
    const { data } = await supabase
      .from("promotions")
      .select("*")
      .eq("active", true);

    if (data) {
      setPromotions(data);
    }
  }

  return promotions;
}