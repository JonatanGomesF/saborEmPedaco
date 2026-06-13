import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartProps = {
  items: CartItem[];
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  onClose: () => void;
};

export default function Cart({
  items,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  onClose,
}: CartProps) {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Seu Carrinho</h2>
        </div>

        <button
  onClick={onClose}
  className="w-full mb-3 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition"
>
  ← Voltar
</button>
      </div>

      {/* Empty */}
      {items.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4 flex-1 overflow-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex gap-3"
              >
                {/* imagem */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{item.name}</h3>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span>R$ {item.price.toFixed(2)}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-gray-200 p-2 rounded-full"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-orange-500 text-white p-2 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-bold text-orange-600 mt-2">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* total */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}