import caldoMandioImg from "../assets/mandioquinha.jpeg";
import caldoVerdeImg from "../assets/verde.jpeg";
import caldoQuengaImg from "../assets/quenga.jpeg";
import caldoCostelaImg from "../assets/costela.jpeg";

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
  {
    id: 1,
    name: "Caldo Mandioquinha",
    description:
      "Caldo cremoso de costela com toque de temperos especiais.",
    price: 20.0,
    size: "350ml",
    image: caldoMandioImg,
  },
  {
    id: 2,
    name: "Caldo Mandioquinha",
    description:
      "Caldo cremoso de mandioquinha com toque de temperos especiais.",
    price: 25.0,
    size: "500ml",
    image: caldoMandioImg,
  },
  {
    id: 3,
    name: "Caldo verde",
    description:
      "Caldo verde tradicional com couve, batata e calabresa suave.",
    price: 22.0,
    size: "350ml",
    image: caldoVerdeImg,
  },
  {
    id: 4,
    name: "Caldo Verde",
    description:
      "Caldo verde tradicional com couve, batata e calabresa suave.",
    price: 30.0,
    size: "500ml",
    image: caldoVerdeImg,
  },
  {
    id: 5,
    name: "Caldo de Quenga",
    description:
      "Caldo saboroso com pedaços suculentos e tempero caseiro.",
    price: 25.0,
    size: "350ml",
    image: caldoQuengaImg,
  },
  {
    id: 6,
    name: "Caldo de Quenga",
    description:
      "Caldo saboroso com pedaços suculentos e tempero caseiro.",
    price: 35.0,
    size: "500ml",
    image: caldoQuengaImg,
  },
  {
    id: 7,
    name: "Caldo de Costela",
    description:
      "Caldo encorpado de costela com sabor intenso e caldo bem temperado.",
    price: 28.0,
    size: "350ml",
    image: caldoCostelaImg,
  },
  {
    id: 8,
    name: "Caldo de Costela",
    description:
      "Caldo encorpado de costela com sabor intenso e caldo bem temperado.",
    price: 35.0,
    size: "500ml",
    image: caldoCostelaImg,
  },
];