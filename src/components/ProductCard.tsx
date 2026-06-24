type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;

  promotionalPrice?: number;
  promotionActive?: boolean;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
  onOpenProduct,
}: ProductCardProps) {
  return (
    <article
      onClick={() => onOpenProduct(product)}
      className="
    bg-black/20
    backdrop-blur-md

    rounded-xl
    shadow

    overflow-hidden
    border
    border-white/30

    flex
    items-center

    hover:shadow-lg
    transition
  "
    >
      {/* Imagem */}
      <div
        className="
          w-28
          h-28
          flex-shrink-0
        "
      >
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
          "
        />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-bold text-base text-gray-900">
              {product.name}
            </h3>

            <span
              className="
                inline-block
                mt-1
                bg-orange-100
                text-orange-600
                px-2
                py-1
                rounded-full
                text-xs
                font-semibold
              "
            >
              {product.size}
            </span>
          </div>
        </div>

        <p
          className="
            text-gray-500
            text-xs
            mt-2
            line-clamp-2
          "
        >
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            {product.promotionActive ? (
              <>
                <div className="text-xs text-gray-400 line-through">
                  R$ {product.price.toFixed(2)}
                </div>

                <div className="text-lg font-bold text-red-600">
                  R$ {product.promotionalPrice?.toFixed(2)}
                </div>
              </>
            ) : (
              <span className="text-lg font-bold text-orange-600">
                R$ {product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="
              bg-orange-600
              hover:bg-orange-700
              text-white
              px-3
              py-2
              rounded-lg
              text-sm
              font-bold
              transition
            "
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}