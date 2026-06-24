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

    const [observation, setObservation] =
        useState("");

    const [selectedExtras, setSelectedExtras] =
        useState<number[]>([]);

    function toggleExtra(id: number) {
        if (selectedExtras.includes(id)) {
            setSelectedExtras(
                selectedExtras.filter((x) => x !== id)
            );
        } else {
            setSelectedExtras([
                ...selectedExtras,
                id,
            ]);
        }
    }

    if (!open || !product) return null;

    const extrasPrice = extras
        .filter((extra) =>
            selectedExtras.includes(extra.id)
        )
        .reduce(
            (total, extra) => total + extra.price,
            0
        );

    const basePrice =
        product.promotionalPrice ??
        product.price;

    const finalPrice =
        (basePrice + extrasPrice) *
        quantity;

    return (
        <div className="fixed inset-0 bg-black/70 z-[999] flex items-end md:items-center justify-center">
            <div
                className="
          bg-white
          w-full
          md:max-w-lg
          rounded-t-3xl
          md:rounded-3xl
          overflow-hidden
          shadow-2xl
        "
            >
                {/* Imagem */}
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="
              w-full
              h-72
              object-cover
            "
                    />

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
            "
                    >
                        ✕
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                    <h2 className="text-2xl font-bold">
                        {product.name}
                    </h2>

                    <p className="mt-3 text-gray-600">
                        {product.description}
                    </p>

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
                        <h3 className="font-bold mb-3">
                            Adicionais
                        </h3>

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
                  "
                                >
                                    <div className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedExtras.includes(
                                                extra.id
                                            )}
                                            onChange={() =>
                                                toggleExtra(extra.id)
                                            }
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
                        <h3 className="font-bold mb-2">
                            Observações
                        </h3>

                        <textarea
                            value={observation}
                            onChange={(e) =>
                                setObservation(
                                    e.target.value
                                )
                            }
                            placeholder="Ex: sem cebola, pouco molho..."
                            className="
                w-full
                border
                rounded-lg
                p-3
              "
                            rows={3}
                        />
                    </div>

                    {/* Quantidade */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button
                            onClick={() =>
                                setQuantity(
                                    Math.max(
                                        1,
                                        quantity - 1
                                    )
                                )
                            }
                            className="
                w-10
                h-10
                rounded-full
                bg-gray-200
                font-bold
              "
                        >
                            -
                        </button>

                        <span className="text-xl font-bold">
                            {quantity}
                        </span>

                        <button
                            onClick={() =>
                                setQuantity(
                                    quantity + 1
                                )
                            }
                            className="
                w-10
                h-10
                rounded-full
                bg-orange-600
                text-white
                font-bold
              "
                        >
                            +
                        </button>
                    </div>

                    {/* Preço */}
                    <div className="mt-6">
                        {product.promotionActive ? (
                            <>
                                <div className="text-gray-400 line-through">
                                    R$ {product.price.toFixed(2)}
                                </div>

                                <div className="text-3xl font-bold text-red-600">
                                    R$ {basePrice.toFixed(2)}
                                </div>

                                <div className="text-green-600 font-semibold">
                                    🔥 Promoção Ativa
                                </div>
                            </>
                        ) : (
                            <div className="text-3xl font-bold text-orange-600">
                                R$ {basePrice.toFixed(2)}
                            </div>
                        )}
                    </div>

                    {/* Botão */}
                    <button
                        onClick={() => {
                            onAddToCart({
                                ...product,
                                quantity,
                                observation,

                                extras: extras.filter(
                                    (extra) =>
                                        selectedExtras.includes(
                                            extra.id
                                        )
                                ),

                                price:
                                    basePrice +
                                    extrasPrice,
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
            "
                    >
                        Adicionar • R${" "}
                        {finalPrice.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
}