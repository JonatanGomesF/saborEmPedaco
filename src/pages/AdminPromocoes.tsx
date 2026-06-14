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

  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [discount, setDiscount] = useState("");

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

  async function createPromotion() {
  if (!title) {
    alert("Digite o nome da promoção");
    return;
  }

  const { error } = await supabase
    .from("promotions")
    .insert([
      {
        title,
        description,
        discount: Number(discount) || 0,
        active: false,
      },
    ]);

  if (error) {
    console.error(error);
    alert("Erro ao salvar");
    return;
  }

  setTitle("");
  setDescription("");
  setDiscount("");

  loadPromotions();
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
        <div className="bg-white p-5 rounded-xl shadow mb-6">
  <h2 className="text-xl font-bold mb-4">
    Nova Promoção
  </h2>

  <div className="grid gap-3">
    <input
      type="text"
      placeholder="Título"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border p-3 rounded-lg"
    />

    <input
      type="text"
      placeholder="Descrição"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="border p-3 rounded-lg"
    />

    <input
      type="number"
      placeholder="Desconto"
      value={discount}
      onChange={(e) => setDiscount(e.target.value)}
      className="border p-3 rounded-lg"
    />

    <button
      onClick={createPromotion}
      className="bg-green-600 text-white py-3 rounded-lg font-bold"
    >
      Salvar Promoção
    </button>
  </div>
</div>
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