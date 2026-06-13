
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
     

      <section id="inicio">
        <Hero />
      </section>

      {/* Cardápio */}
      <section
        id="cardapio"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-12">
          <span className="text-orange-600 font-bold uppercase tracking-widest">
            Nosso Cardápio
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
            Escolha seu Yakisoba
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Preparado na hora com ingredientes frescos,
            legumes selecionados e molho especial da casa.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section
        id="sobre"
        className="bg-white py-16"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-orange-600 font-bold uppercase tracking-widest">
            Sobre Nós
          </span>

          <h2 className="text-4xl font-extrabold mt-3">
            YakinHome
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            A YakinHome nasceu com a missão de levar até você
            um yakisoba saboroso, preparado com carinho,
            ingredientes frescos e aquele gostinho oriental
            irresistível.
          </p>

          <p className="mt-4 text-lg text-gray-600">
            Trabalhamos com ingredientes selecionados,
            preparo na hora e entrega rápida para garantir
            a melhor experiência para nossos clientes.
          </p>
        </div>
      </section>

      {/* Contato */}
      <section
        id="contato"
        className="bg-orange-600 text-white py-16"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">
            Faça seu pedido agora
          </h2>

          <p className="mt-4 text-lg">
            Clique no botão abaixo e peça diretamente pelo
            WhatsApp.
          </p>

          <a
            href="https://wa.me/5511963872966"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            Pedir no WhatsApp
          </a>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold">
            🥢 YakinHome
          </h3>

          <p className="mt-2 text-gray-400">
            Yakissobaria Delivery
          </p>

          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} YakinHome.
            Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}