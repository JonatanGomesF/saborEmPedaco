import frangoImg from "../assets/yaki-frango.png";
import carneImg from "../assets/yaki-carne.png";
import camaraoImg from "../assets/yaki-camarao.png";
import mistoImg from "../assets/yaki-misto.png";
import especialImg from "../assets/yaki-especial.png";
import yakiveg from "../assets/yaki-veg.png";
import hotTemaky from "../assets/temaky2.jpeg";
import hotRoll from "../assets/hotroll.jpg";
import hotFiladelfia from "../assets/filadel.jpg";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
  promotionalPrice?: number;
  promotionActive?: boolean;
  available?: boolean;
};

export const products: Product[] = [
  // New Hot items first to show at top of menu
  {
    id: 12,
    name: "Hot Temaky",
    description:
      "Temaky quente preparado na hora com arroz, nori e recheio especial.",
    price: 32.9,
    size: "1 un.",
    image: hotTemaky,
  },
  {
    id: 13,
    name: "Hot Roll",
    description:
      "Bandeja com 10 unidades de hot roll crocante e saboroso.",
    price: 26.9,
    size: "10 un.",
    image: hotRoll,
  },
  {
    id: 14,
    name: "Filadélfia",
    description:
      "Bandeja com 10 unidades de Sushi filadélfia cremoso.",
    price: 33.9,
    size: "10 un.",
    image: hotFiladelfia,
  },

  {
    id: 1,
    name: "Yakisoba de Frango",
    description:
      "Macarrão oriental preparado na hora com frango selecionado e legumes frescos.",
    price: 35.9,
    size: "450g",
    image: frangoImg,
  },

  {
    id: 2,
    name: "Yakisoba de Frango",
    description:
      "Macarrão oriental preparado na hora com frango selecionado e legumes frescos.",
    price: 38.9,
    size: "750g",
    image: frangoImg,
  },

  {
    id: 3,
    name: "Yakisoba de Carne",
    description:
      "Macarrão oriental com carne bovina macia e legumes salteados na chapa.",
    price: 41.9,
    size: "450g",
    image: carneImg,
  },

  {
    id: 4,
    name: "Yakisoba de Carne",
    description:
      "Macarrão oriental com carne bovina macia e legumes salteados na chapa.",
    price: 44.9,
    size: "750g",
    image: carneImg,
  },

  {
    id: 5,
    name: "Yakisoba de Camarão",
    description:
      "Macarrão oriental com camarões selecionados e legumes frescos.",
    price: 56.9,
    size: "450g",
    image: camaraoImg,
  },

  {
    id: 6,
    name: "Yakisoba de Camarão",
    description:
      "Macarrão oriental com camarões selecionados e legumes frescos.",
    price: 59.9,
    size: "750g",
    image: camaraoImg,
  },

  {
    id: 7,
    name: "Yakisoba Misto",
    description:
      "Combinação irresistível de carne bovina e frango com legumes frescos.",
    price: 49.9,
    size: "450g",
    image: mistoImg,
  },

  {
    id: 8,
    name: "Yakisoba Misto",
    description:
      "Combinação irresistível de carne bovina e frango com legumes frescos.",
    price: 52.9,
    size: "750g",
    image: mistoImg,
  },

  {
    id: 9,
    name: "Yakisoba Especial",
    description:
      "Combinação premium de carne, frango e camarão com molho especial da casa.",
    price: 62.9,
    size: "450g",
    image: especialImg,
  },

  {
    id: 10,
    name: "Yakisoba Especial",
    description:
      "Combinação premium de carne, frango e camarão com molho especial da casa.",
    price: 72.9,
    size: "750g",
    image: especialImg,
  },
  {
    id: 11,
    name: "Yakisoba Vegetariano",
    description:
      "Combinação vegetariana de legumes frescos com molho especial da casa.",
    price: 29.9,
    size: "450g",
    image: yakiveg,
  },
];