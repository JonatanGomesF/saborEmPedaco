import { useState } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../services/supabase";
type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function CheckoutDialog({ open, onOpenChange }: Props) {
  const { cartItems, clearCart, totalPrice } = useCart();

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [payment, setPayment] = useState("PIX");
  const [troco, setTroco] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  const send = async () => {
    if (!name || !phone || !street || !number) {
      alert("Preencha nome, WhatsApp, rua e número");
      return;
    }

    // salva cliente no Supabase
    try {
      await supabase
        .from("customers")
        .insert([
          {
            name,
            phone,
            street,
            number,
            district,
            last_order_value: totalPrice,
          },
        ]);
    } catch (error) {
      console.error(error);
    }

    let msg = `*NOVO PEDIDO - YAKINHOME*\n\n`;

    msg += `*Nome:* ${name}\n`;
    msg += `*WhatsApp:* ${phone}\n`;
    msg += `*Endereço:* ${street}, ${number}`;

    if (district) {
      msg += ` - ${district}`;
    }

    msg += `\n\n*Pedido:*\n`;

    cartItems.forEach((item) => {
      msg += `• ${item.quantity}x ${item.name}`;

      if (item.promotionActive) {
        msg += ` 🔥 PROMOÇÃO`;
      }

      if (item.size) {
        msg += ` (${item.size})`;
      }

      msg += ` - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    msg += `\n*Total:* R$ ${totalPrice.toFixed(2)}\n`;
    msg += `*Pagamento:* ${payment}`;

    if (payment === "Dinheiro" && troco) {
      msg += ` (troco para R$ ${troco})`;
    }

    const url = `https://wa.me/5511963872966?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");

    clearCart();
    onOpenChange(false);
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 relative">

        {/* fechar */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold">Finalizar Pedido</h2>

        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          placeholder="Rua"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <input
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-1/2 border p-2 rounded"
          />

          <input
            placeholder="Bairro"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-1/2 border p-2 rounded"
          />
        </div>

        {/* pagamento */}
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="PIX">PIX</option>
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>

        {payment === "Dinheiro" && (
          <input
            placeholder="Troco para"
            value={troco}
            onChange={(e) => setTroco(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}

        <div className="text-sm text-gray-600">
          Total: <b>R$ {totalPrice.toFixed(2)}</b>
        </div>

        <button
          onClick={send}
          className="w-full bg-green-500 text-white py-3 rounded-xl font-bold"
        >
          Enviar pedido no WhatsApp
        </button>
      </div>
    </div>
  );
}