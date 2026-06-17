import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { products } from "../data/products";
type Promotion = {
  id: number;
  title: string;
  description: string;
  discount: number;
  active: boolean;
  product_id: number;
};

export default function AdminPromocoes() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [productId, setProductId] = useState("");
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
  product_id: Number(productId),
  active: false,
}
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
  async function deletePromotion(id: number) {
  const confirmar = window.confirm(
    "Deseja realmente excluir esta promoção?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("promotions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Erro ao excluir promoção");
    return;
  }

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
    <select
  value={productId}
  onChange={(e) => setProductId(e.target.value)}
  className="border p-3 rounded-lg"
>
  <option value="">
    Selecione um produto
  </option>

  {products.map((product) => (
    <option
      key={product.id}
      value={product.id}
    >
      {product.name} - {product.size}
    </option>
  ))}
</select>
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

<p className="text-gray-600">
  Produto:
  {
    products.find(
      (p) => p.id === promo.product_id
    )?.name
  }
  {" - "}
  {
    products.find(
      (p) => p.id === promo.product_id
    )?.size
  }
</p>

<p className="mt-2 font-semibold">
  Desconto:
  R$ {promo.discount}
</p>
<div className="flex gap-3 mt-4">

  <button
    onClick={() =>
      togglePromotion(
        promo.id,
        promo.active
      )
    }
    className={`px-4 py-2 rounded-lg text-white ${
      promo.active
        ? "bg-red-500"
        : "bg-green-500"
    }`}
  >
    {promo.active
      ? "Desativar"
      : "Ativar"}
  </button>

  <button
    onClick={() => deletePromotion(promo.id)}
    className="px-4 py-2 rounded-lg bg-gray-800 text-white"
  >
    Excluir
  </button>

</div>          </div>
        ))}
      </div>
    </div>
  );
}