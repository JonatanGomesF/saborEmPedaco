import { useState } from "react";
import {
  Menu,
  X,
  MessageCircle,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "../context/CartContext";

type NavbarProps = {
  onOpenCart: () => void;
};

export default function Navbar({ onOpenCart }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-extrabold text-orange-600"
        >
          🥢 YakinHome
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="hover:text-orange-600">
            Início
          </a>

          <a href="#cardapio" className="hover:text-orange-600">
            Cardápio
          </a>

          <a href="#sobre" className="hover:text-orange-600">
            Sobre
          </a>

          <a href="#contato" className="hover:text-orange-600">
            Contato
          </a>

          {/* 🛒 Carrinho (CORRIGIDO AQUI) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenCart();
            }}
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart size={28} className="text-gray-700" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5511963872966"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-bold transition"
          >
            <MessageCircle size={18} />
            Pedir Agora
          </a>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          
          {/* Carrinho mobile (CORRIGIDO) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenCart();
            }}
            className="relative"
          >
            <ShoppingCart size={26} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 gap-4">
            <a href="#inicio" onClick={() => setOpen(false)}>
              Início
            </a>

            <a href="#cardapio" onClick={() => setOpen(false)}>
              Cardápio
            </a>

            <a href="#sobre" onClick={() => setOpen(false)}>
              Sobre
            </a>

            <a href="#contato" onClick={() => setOpen(false)}>
              Contato
            </a>

            {/* 🛒 Mobile carrinho (CORRIGIDO) */}
            <button
              type="button"
              onClick={() => {
                onOpenCart();
                setOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 font-bold"
            >
              <ShoppingCart size={22} />
              {totalItems} item(ns)
            </button>

            <a
              href="https://wa.me/5511963872966"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-bold"
            >
              <MessageCircle size={18} />
              Pedir no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}