import { ChevronDown, MessageCircle } from "lucide-react";
import logo from "../assets/logo.png"; // ajuste o nome se necessário

export default function Hero() {
  const scrollToMenu = () => {
    const section = document.getElementById("cardapio");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden h-[100svh]">
      {/* Background imagem cobrindo tudo */}
      <img
        src={logo}
        alt="YakinHome"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay escuro pra contraste */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center text-center text-white">

       

       

        

        <div className="mt-14 flex justify-center">
          <button onClick={scrollToMenu} className="animate-bounce">
            <ChevronDown size={36} />
          </button>
        </div>
      </div>
    </section>
  );
}