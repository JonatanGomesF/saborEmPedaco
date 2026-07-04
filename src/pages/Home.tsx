
import Hero from "../components/Hero";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import PromotionBanner from "../components/PromotionBanner";
import ProductModal from "../components/ProductModal";
import { useCart } from "../context/CartContext";
import { usePromotions } from "../hooks/usePromotions";
import { getProductAvailability } from "../lib/productAvailability";
import { products, type Product } from "../data/products";
import { Phone, Clock, MapPin } from "lucide-react";

// Local Caldo Assets for the About Us Row
import costelaImg from "../assets/costela.jpeg";
import mandioquinhaImg from "../assets/mandioquinha.jpeg";
import quengaImg from "../assets/quenga.jpeg";
import verdeImg from "../assets/verde.jpeg";
import heroBg from "../assets/costela.jpeg";

export default function Home() {
  const { addToCart } = useCart();
  const promotions = usePromotions();
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const availability = getProductAvailability();
  const availableProducts = products.map((product) => ({
    ...product,
    available: availability[product.id] !== false,
  }));

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const scrollToMenu = () => {
    const section = document.getElementById("cardapio");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Por favor, preencha todos os campos do formulário.");
      return;
    }
    // Contato via WhatsApp
    const msg = `*Mensagem de Contato - Sabor Em Pedaço*\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Mensagem:* ${message}`;
    window.open(`https://wa.me/+5511947270037?text=${encodeURIComponent(msg)}`, "_blank");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans-montserrat">
      
      {/* Hero section */}
      <section id="inicio">
        <Hero />
        <PromotionBanner />
      </section>

      {/* Seção "Sobre Nós" (Fundo Branco) */}
      <section
        id="sobre"
        className="bg-white py-20 border-b border-gray-100"
      >
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif-display text-4xl italic text-[#b52626] font-semibold">
            Sobre Nós
          </h2>

          {/* Separador */}
          <div className="w-12 h-[2px] bg-[#b52626] mx-auto mt-2" />

          <p className="mt-4 text-xs md:text-sm text-gray-500 italic max-w-2xl mx-auto leading-relaxed">
            A Sabor Em Pedaço é especializada em caldos caseiros e cremosos, feitos com ingredientes frescos e temperos selecionados. Nossos caldos garantem um sabor único e acolhedor que você vai querer repetir sempre. Peça agora e sinta o conforto de um caldo quentinho em casa!
          </p>

          {/* Badges de destaque */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 py-6 max-w-3xl mx-auto">
            <div className="text-center sm:text-right flex-1">
              <h4 className="text-xs font-black text-[#b52626] tracking-widest uppercase">A APRESENTAÇÃO</h4>
              <p className="text-[11px] text-gray-400 mt-1">Preparado pelo nosso Chef na chapa,<br/>é algo que você precisa experimentar.</p>
            </div>
            
            <div className="w-12 h-12 bg-[#facc15] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-black/15 flex-shrink-0">
              <MapPin size={22} className="stroke-[2.5]" />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h4 className="text-xs font-black text-[#b52626] tracking-widest uppercase">NOSSO ORGULHO</h4>
              <p className="text-[11px] text-gray-400 mt-1">Servimos caldos frescos e saborosos, preparados com carinho<br/>para você se aquecer a cada colherada.</p>
            </div>
          </div>

          {/* Row de 5 fotos circulares dos caldos */}
          <div className="flex flex-wrap justify-center items-center gap-5 mt-10 select-none pointer-events-none max-w-4xl mx-auto">
            {[costelaImg, mandioquinhaImg, quengaImg, verdeImg].map((img, i) => (
              <div key={i} className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden hover:scale-108 transition-transform duration-300 shadow-lg border border-gray-100/50 bg-gray-50">
                <img src={img} alt="Caldo Sabor Em Pedaço" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu/Cardápio */}
      <section
        id="cardapio"
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <div className="text-center mb-14 space-y-2">
          <span className="text-[10px] font-black text-[#a16207] tracking-[0.25em] uppercase bg-yellow-50 border border-yellow-100/30 px-3 py-1 rounded-full">
            Cardápio
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Escolha seu Caldo
          </h2>

          <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Caldos preparados com ingredientes frescos e temperos caseiros, servidos quentinhos para sua refeição.
          </p>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {availableProducts.map((product) => {
            const promotion = promotions.find(
              (p) => p.product_id === product.id && p.active
            );

            return (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  promotionActive: !!promotion,
                  promotionalPrice: promotion
                    ? product.price - promotion.discount
                    : undefined,
                }}
                onAddToCart={addToCart}
                onOpenProduct={(product) => {
                  setSelectedProduct(product);
                  setModalOpen(true);
                }}
              />
            );
          })}
        </div>
      </section>

      <ProductModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={addToCart}
      />

      {/* Seção: "MELHOR CALDO DA CIDADE" (Fundo Escuro com Parallax) */}
      <section className="relative overflow-hidden bg-black text-center min-h-[40vh] flex items-center">
        {/* Background image com overlay escuro */}
        <img 
          src={heroBg} 
          alt="Caldo Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 select-none pointer-events-none scale-105"
        />
        <div className="absolute inset-0 bg-[#070707]/75 backdrop-blur-xs" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-6">
          <h2 className="text-xl md:text-3xl font-extrabold tracking-[0.2em] text-white leading-relaxed uppercase">
            O MELHOR CALDO DA CIDADE. <span className="text-[#facc15]">GARANTIDO!</span>
          </h2>
          
          <p className="text-[#808080] text-xs font-semibold tracking-wider max-w-2xl mx-auto italic leading-relaxed">
            Nosso cardápio conta com caldos artesanais preparados com ingredientes frescos e temperos caseiros. Venha experimentar e descubra por que somos referência em caldos na região.
          </p>

          <div className="pt-4">
            <button 
              onClick={scrollToMenu}
              className="px-8 py-3.5 border border-white hover:border-[#facc15] hover:bg-[#facc15] hover:text-black transition-all duration-300 text-xs tracking-[0.2em] font-bold text-white uppercase cursor-pointer"
            >
              VER NOSSO CARDÁPIO
            </button>
          </div>
        </div>
      </section>

      {/* Seção: "CONTATO" (Gradiente Vermelho Escuro) */}
      <section
        id="contato"
        className="bg-gradient-to-r from-[#5a0c0c] to-[#7d1818] text-white py-20 border-b border-red-950"
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Coluna Esquerda: Informações de Contato */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold uppercase tracking-[0.1em]">CONTATO</h2>
              <p className="text-xs text-red-200/60 italic font-semibold mt-1.5">Caldos Artesanais • Sabor Em Pedaço</p>
            </div>

            <div className="space-y-4 text-xs font-semibold tracking-wider text-red-100/80">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-red-200 mt-0.5 flex-shrink-0" />
                <p>(11) 947270037</p>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-red-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Ter - Sex: 17h45 às 23h45</p>
                  <p className="mt-1">Sáb & Dom: 15h às 00h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Contato */}
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-red-200 tracking-wider uppercase">Seu Nome</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-white/20 hover:border-white/40 focus:border-white bg-white/5 rounded-lg p-3 text-xs outline-none text-white transition-all duration-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-red-200 tracking-wider uppercase">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-white/20 hover:border-white/40 focus:border-white bg-white/5 rounded-lg p-3 text-xs outline-none text-white transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#facc15] tracking-wider uppercase">Mensagem</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border border-white/20 hover:border-white/40 focus:border-white bg-white/5 rounded-lg p-3 text-xs outline-none text-white transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-white text-[#7d1818] font-black text-xs tracking-widest uppercase rounded hover:bg-orange-600 hover:text-white hover:scale-102 transition-all duration-300 shadow-md cursor-pointer"
            >
              ENVIAR
            </button>
          </form>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-[#070707] text-gray-500 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-1 font-bold text-xs tracking-[0.2em] text-white">
            <span>SABOR</span>
            <span className="flex items-center text-white">
              EM
              <span className="relative inline-flex items-center justify-center w-4.5 h-4.5 bg-[#ea580c] rounded-full mx-0.5">
                <span className="text-[8px] text-white">🔥</span>
              </span>
              PEDAÇO
            </span>
          </div>

          <p className="text-[9px] font-bold tracking-widest uppercase text-gray-600">
            © {new Date().getFullYear()} SABOR EM PEDAÇO. TODOS OS DIREITOS RESERVADOS.
          </p>

          {/* Scroll to Top */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-8 h-8 rounded-full border border-gray-800 hover:border-orange-500 hover:text-[#ea580c] flex items-center justify-center text-gray-500 transition-colors duration-300 cursor-pointer text-xs"
          >
            ▲
          </button>
        </div>
      </footer>
    </div>
  );
}