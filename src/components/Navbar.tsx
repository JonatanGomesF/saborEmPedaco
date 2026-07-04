import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import logoImg from "../assets/logo.jpeg";

type NavbarProps = {
  onOpenCart: () => void;
};

export default function Navbar({ onOpenCart }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (totalItems === 0) return;
    setAnimateCart(true);
    const timer = setTimeout(() => setAnimateCart(false), 600);
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/[0.06] shadow-xl text-white font-sans-montserrat">
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">

        {/* ── Logo: igual ao Hero ── */}
        <a
          href="/"
          className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-85 active:scale-95"
        >
          <img
            src={logoImg}
            alt="Sabor Em Pedaço"
            className="w-10 h-10 rounded-2xl object-cover border border-white/10 shadow-sm"
          />
          <span className="flex items-baseline leading-none">
            <span
              className="text-white font-black"
              style={{ fontSize: "1.25rem", fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
            >
              Sabor
            </span>
            <span
              className="text-[#facc15] font-black"
              style={{ fontSize: "1.25rem", fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
            >
              Em Pedaço
            </span>
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { href: "#sobre", label: "Sobre Nós" },
            { href: "#cardapio", label: "Cardápio" },
            { href: "#contato", label: "Contato" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 hover:text-white relative py-2 transition-colors duration-300
                         after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0
                         hover:after:w-full after:bg-[#facc15] after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Cart + mobile toggle ── */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="cart-button-desktop"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenCart(); }}
            className={`relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/8 text-white/50 hover:text-white cursor-pointer transition-all duration-300 ${animateCart ? "animate-cart-pop" : ""}`}
          >
            <ShoppingCart size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#facc15] text-black text-[9px] font-black w-[18px] h-[18px] rounded-full flex items-center justify-center border border-[#0a0a0a] shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/50 hover:text-white transition-colors duration-300"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/[0.06] bg-[#0a0a0a] ${
          open ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className="flex flex-col px-6 gap-5">
          {[
            { href: "#sobre", label: "Sobre Nós" },
            { href: "#cardapio", label: "Cardápio" },
            { href: "#contato", label: "Contato" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white/50 text-[11px] font-bold uppercase tracking-[0.18em] hover:text-white py-1 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            id="cart-button-mobile"
            onClick={() => { onOpenCart(); setOpen(false); }}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all duration-200 text-[11px] tracking-wider"
          >
            <ShoppingCart size={15} />
            {totalItems} item(ns) no carrinho
          </button>
        </nav>
      </div>
    </header>
  );
}