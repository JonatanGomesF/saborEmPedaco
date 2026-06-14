import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Promotion = {
  id: number;
  title: string;
  description: string;
  discount: number;
};

export default function PromotionBanner() {
  const [promotion, setPromotion] =
    useState<Promotion | null>(null);

  useEffect(() => {
    loadPromotion();
  }, []);

  async function loadPromotion() {
    const { data } = await supabase
      .from("promotions")
      .select("*")
      .eq("active", true)
      .limit(1)
      .single();

    if (data) {
      setPromotion(data);
    }
  }

  if (!promotion) return null;

  return (
    <div className="bg-red-600 text-white text-center py-4 px-4">
      <h2 className="text-2xl font-bold">
        🔥 PROMOÇÃO ATIVA
      </h2>

      <p className="text-lg mt-1">
        {promotion.title}
      </p>

      <p>
        {promotion.description}
      </p>

      <p className="font-bold mt-2">
        Economize R$ {promotion.discount}
      </p>
    </div>
  );
}