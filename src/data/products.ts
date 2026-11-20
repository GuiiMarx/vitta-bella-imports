export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: "asad" | "yara" | "fakhar";
  description?: string;
}

export const products: Product[] = [
  // Coleção Asad
  {
    id: "asad",
    name: "Asad",
    price: 149.9,
    image: "/products/asad.png",
    collection: "asad",
    description: "Amber fragrance for men. Top: Black Pepper, Pineapple, Tobacco.",
  },
  {
    id: "asad_elixir",
    name: "Asad Elixir",
    price: 169.9,
    image: "/products/asad_elixir.png",
    collection: "asad",
  },
  {
    id: "asad_bourbon",
    name: "Asad Bourbon",
    price: 159.9,
    image: "/products/asad_bourbon.png",
    collection: "asad",
  },
  {
    id: "asad_zanzibar",
    name: "Asad Zanzibar",
    price: 169.9,
    image: "/products/asad_zanzibar.png",
    collection: "asad",
  },
  // Coleção Yara
  {
    id: "yara",
    name: "Yara",
    price: 139.9,
    image: "/products/yara.png",
    collection: "yara",
  },
  {
    id: "yara_candy",
    name: "Yara Candy",
    price: 149.9,
    image: "/products/yara_candy.png",
    collection: "yara",
  },
  {
    id: "yara_moi",
    name: "Yara Moi",
    price: 159.9,
    image: "/products/yara_moi.png",
    collection: "yara",
  },
  {
    id: "yara_elixir",
    name: "Yara Elixir",
    price: 169.9,
    image: "/products/yara_elixir.png",
    collection: "yara",
  },
  {
    id: "yara_tous",
    name: "Yara Tous",
    price: 149.9,
    image: "/products/yara_tous.png",
    collection: "yara",
  },
  // Coleção Fakhar
  {
    id: "fakhar_rose",
    name: "Fakhar Rose",
    price: 189.9,
    image: "/products/fakhar_rose.png",
    collection: "fakhar",
  },
  {
    id: "fakhar_black",
    name: "Fakhar Black",
    price: 189.9,
    image: "/products/fakhar_black.png",
    collection: "fakhar",
  },
];

export const collections = [
  { id: "asad", name: "Coleção Asad" },
  { id: "yara", name: "Coleção Yara" },
  { id: "fakhar", name: "Coleção Fakhar" },
] as const;
