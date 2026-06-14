import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Promotion = {
  id: number;
  title: string;
  description: string;
  discount: number;
  active: boolean;
};

export default function AdminPromocoes() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    loadPromotions();
  }, []);

  async function loadPromotions() {
    const { data } = await supabase
      .from("promotions")
      .select("*");

    if (data) {
      setPromotions(data);
    }
  }

  async function togglePromotion(
    id: number,
    active: boolean
  ) {
    await supabase
      .from("promotions")
      .update({
        active: !active,
      })
      .eq("id", id);

    loadPromotions();
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Promoções
      </h1>

      <div className="grid gap-4">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">
              {promo.title}
            </h2>

            <p>{promo.description}</p>

            <p className="mt-2 font-semibold">
              Desconto:
              R$ {promo.discount}
            </p>

            <button
              onClick={() =>
                togglePromotion(
                  promo.id,
                  promo.active
                )
              }
              className={`mt-4 px-4 py-2 rounded-lg text-white ${
                promo.active
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {promo.active
                ? "Desativar"
                : "Ativar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}