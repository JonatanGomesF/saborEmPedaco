import type { Product } from "../data/products";

type Props = {
    open: boolean;
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
};

export default function ProductModal({
    open,
    product,
    onClose,
    onAddToCart,
}: Props) {
    if (!open || !product) return null;

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
          animate-in
        "
            >
                {/* imagem */}
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

                {/* conteúdo */}
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

                    <div className="mt-5">
                        {product.promotionActive ? (
                            <>
                                <div className="text-gray-400 line-through">
                                    R$ {product.price.toFixed(2)}
                                </div>

                                <div className="text-3xl font-bold text-red-600">
                                    R$ {product.promotionalPrice?.toFixed(2)}
                                </div>

                                <div className="text-green-600 font-semibold">
                                    🔥 Promoção Ativa
                                </div>
                            </>
                        ) : (
                            <div className="text-3xl font-bold text-orange-600">
                                R$ {product.price.toFixed(2)}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            onAddToCart(product);
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
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}