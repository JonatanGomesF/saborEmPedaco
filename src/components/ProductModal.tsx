import { useState } from "react";
import type { Product } from "../data/products";
import { extras } from "../data/extras";

type Props = {
    open: boolean;
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: any) => void;
};

export default function ProductModal({
    open,
    product,
    onClose,
    onAddToCart,
}: Props) {
    const [quantity, setQuantity] = useState(1);
    const [observation, setObservation] = useState("");
    const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

    function toggleExtra(id: number) {
        if (selectedExtras.includes(id)) {
            setSelectedExtras(selectedExtras.filter((x) => x !== id));
        } else {
            setSelectedExtras([...selectedExtras, id]);
        }
    }

    if (!open || !product) return null;

    const extrasPrice = extras
        .filter((extra) => selectedExtras.includes(extra.id))
        .reduce((total, extra) => total + extra.price, 0);

    const basePrice = product.promotionalPrice ?? product.price;
    const finalPrice = (basePrice + extrasPrice) * quantity;

    return (
        <div className="fixed inset-0 bg-black/70 z-[999] flex items-end md:items-center justify-center p-0 md:p-4">
            <div
                className="
                  bg-white
                  w-full
                  md:max-w-lg
                  rounded-t-3xl
                  md:rounded-3xl
                  overflow-hidden
                  shadow-2xl
                  max-h-[90vh] md:max-h-[85vh]  {/* Evita que o modal passe do tamanho da tela */}
                  flex flex-col                 {/* Permite controlar o scroll interno se necessário */}
                  overflow-y-auto               {/* Habilita a rolagem vertical */}
                "
            >
                {/* Imagem do Produto */}
                <div className="relative w-full h-48 md:h-64 flex-shrink-0"> 
                    {/* Alterado de h-[900px] para h-48 no mobile e h-64 no desktop */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Botão de fechar */}
                    <button
                        onClick={onClose}
                        className="
                          absolute
                          top-4
                          right-4
                          bg-black/50
                          text-white
                          w-10
                          h-10
                          rounded-full
                          flex items-center justify-center
                          hover:bg-black/70
                          transition-colors
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-5">
                    <h2 className="text-2xl font-bold">{product.name}</h2>

                    <p className="mt-3 text-gray-600">{product.description}</p>

                    <div className="mt-4">
                        <span
                            className="
                            bg-orange-100
                            text-orange-600
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                          "
                        >
                            {product.size}
                        </span>
                    </div>

                    {/* Adicionais */}
                    <div className="mt-6">
                        <h3 className="font-bold mb-3">Adicionais</h3>

                        <div className="space-y-2">
                            {extras.map((extra) => (
                                <label
                                    key={extra.id}
                                    className="
                                flex
                                justify-between
                                items-center
                                border
                                rounded-lg
                                p-3
                                cursor-pointer
                              "
                                >
                                    <div className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedExtras.includes(extra.id)}
                                            onChange={() => toggleExtra(extra.id)}
                                        />
                                        <span>{extra.name}</span>
                                    </div>
                                    <span className="font-semibold text-green-600">
                                        + R$ {extra.price.toFixed(2)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Observação */}
                    <div className="mt-6">
                        <h3 className="font-bold mb-2">Observações</h3>
                        <textarea
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                            placeholder="Ex: sem cebola, pouco molho..."
                            className="w-full border rounded-lg p-3 outline-none focus:border-orange-500"
                            rows={3}
                        />
                    </div>

                    {/* Quantidade */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 rounded-full bg-gray-200 font-bold text-xl flex items-center justify-center"
                        >
                            -
                        </button>
                        <span className="text-xl font-bold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 rounded-full bg-orange-600 text-white font-bold text-xl flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>

                    {/* Preço */}
                    <div className="mt-6 text-center">
                        {product.promotionActive ? (
                            <>
                                <div className="text-gray-400 line-through text-sm">
                                    R$ {product.price.toFixed(2)}
                                </div>
                                <div className="text-3xl font-bold text-red-600">
                                    R$ {basePrice.toFixed(2)}
                                </div>
                                <div className="text-green-600 font-semibold text-sm">
                                    🔥 Promoção Ativa
                                </div>
                            </>
                        ) : (
                            <div className="text-3xl font-bold text-orange-600">
                                R$ {basePrice.toFixed(2)}
                            </div>
                        )}
                    </div>

                    {/* Botão Adicionar */}
                    <button
                        onClick={() => {
                            onAddToCart({
                                ...product,
                                quantity,
                                observation,
                                extras: extras.filter((extra) => selectedExtras.includes(extra.id)),
                                price: basePrice + extrasPrice,
                            });
                            onClose();
                        }}
                        className="
                          mt-6
                          w-full
                          bg-orange-600
                          hover:bg-orange-700
                          text-white
                          py-4
                          rounded-xl
                          font-bold
                          transition-colors
                        "
                    >
                        Adicionar • R$ {finalPrice.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
}