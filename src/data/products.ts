import frangoImg from "../assets/yaki-frango.png";
import carneImg from "../assets/yaki-carne.png";
import camaraoImg from "../assets/yaki-camarao.png";
import mistoImg from "../assets/yaki-misto.png";
import especialImg from "../assets/yaki-especial.png";
import yakiveg from "../assets/yaki-veg.png";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Yakisoba de Frango",
    description:
      "Macarrão oriental preparado na hora com frango selecionado e legumes frescos.",
    price: 35.9,
    size: "500g",
    image: frangoImg,
  },

  {
    id: 2,
    name: "Yakisoba de Frango",
    description:
      "Macarrão oriental preparado na hora com frango selecionado e legumes frescos.",
    price: 38.9,
    size: "800g",
    image: frangoImg,
  },

  {
    id: 3,
    name: "Yakisoba de Carne",
    description:
      "Macarrão oriental com carne bovina macia e legumes salteados na chapa.",
    price: 41.9,
    size: "500g",
    image: carneImg,
  },

  {
    id: 4,
    name: "Yakisoba de Carne",
    description:
      "Macarrão oriental com carne bovina macia e legumes salteados na chapa.",
    price: 44.9,
    size: "800g",
    image: carneImg,
  },

  {
    id: 5,
    name: "Yakisoba de Camarão",
    description:
      "Macarrão oriental com camarões selecionados e legumes frescos.",
    price: 56.9,
    size: "500g",
    image: camaraoImg,
  },

  {
    id: 6,
    name: "Yakisoba de Camarão",
    description:
      "Macarrão oriental com camarões selecionados e legumes frescos.",
    price: 59.9,
    size: "800g",
    image: camaraoImg,
  },

  {
    id: 7,
    name: "Yakisoba Misto",
    description:
      "Combinação irresistível de carne bovina e frango com legumes frescos.",
    price: 49.9,
    size: "500g",
    image: mistoImg,
  },

  {
    id: 8,
    name: "Yakisoba Misto",
    description:
      "Combinação irresistível de carne bovina e frango com legumes frescos.",
    price: 52.9,
    size: "800g",
    image: mistoImg,
  },

  {
    id: 9,
    name: "Yakisoba Especial",
    description:
      "Combinação premium de carne, frango e camarão com molho especial da casa.",
    price: 62.9,
    size: "500g",
    image: especialImg,
  },

  {
    id: 10,
    name: "Yakisoba Especial",
    description:
      "Combinação premium de carne, frango e camarão com molho especial da casa.",
    price: 72.9,
    size: "800g",
    image: especialImg,
  },
  {
    id: 11,
    name: "Yakisoba Vegetariano",
    description:
      "Combinação vegetariana de legumes frescos com molho especial da casa.",
    price: 29.9,
    size: "500g",
    image: yakiveg,
  },
  {
    id: 12,
    name: "Yakisoba Vegetariano",
    description:
      "Combinação vegetariana de legumes frescos com molho especial da casa.",
    price: 32.9,
    size: "800g",
    image: yakiveg,
  },
];