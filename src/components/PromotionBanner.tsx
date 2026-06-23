import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { products } from "../data/products";

type Promotion = {
  id: number;
  title: string;
  description: string;
  discount: number;
  product_id: number;
  active: boolean;
};

export default function PromotionBanner() {
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

  if (promotions.length === 0) return null;

  return (
    <div
      className="
        overflow-hidden
        py-5
        bg-gradient-to-r
        from-orange-500/10
        via-white/5
        to-orange-500/10
      "
    >
      <div className="animate-banner flex gap-6 w-max">

        {promotions.map((promotion) => {
          const product = products.find(
            (p) => p.id === promotion.product_id
          );

          return (
            <div
              key={promotion.id}
              className="
                flex items-center gap-5
                px-8 py-4
                rounded-3xl
                bg-white/70
                backdrop-blur-md
                border border-white/30
                shadow-2xl
                min-w-[500px]
              "
            >
              {product && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-24 h-24
                    rounded-2xl
                    object-cover
                    shadow-lg
                  "
                />
              )}

              <div className="text-gray-900">
                <h2 className="text-xl font-bold">
                  🔥 PROMOÇÃO ATIVA
                </h2>

                <p className="font-semibold text-lg">
                  {promotion.title}
                </p>

                <p className="text-sm text-gray-600">
                  {promotion.description}
                </p>

                <p className="font-bold text-green-600 mt-2">
                  Economize R$ {promotion.discount}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}