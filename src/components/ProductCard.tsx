
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
      {/* Imagem */}
      <div className="h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-gray-900">
            {product.name}
          </h3>

          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
            {product.size}
          </span>
        </div>

        <p className="text-gray-600 text-sm mt-3 min-h-[60px]">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-orange-600">
            R$ {product.price.toFixed(2)}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl font-bold transition"
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

