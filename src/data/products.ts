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
    image: "https://lattafa.com/wp-content/uploads/2024/05/Asad-01.jpg",
    collection: "asad",
    description: "Amber fragrance for men. Top: Black Pepper, Pineapple, Tobacco.",
  },
  {
    id: "asad_elixir",
    name: "Asad Elixir",
    price: 169.9,
    image: "https://www.lattafa-usa.com/cdn/shop/files/ASADELIXIRBOTTLE.png?v=1760805808",
    collection: "asad",
  },
  {
    id: "asad_bourbon",
    name: "Asad Bourbon",
    price: 159.9,
    image: "https://www.lattafa-usa.com/cdn/shop/files/Asad-Bourbon-1.png?v=1747416709",
    collection: "asad",
  },
  {
    id: "asad_zanzibar",
    name: "Asad Zanzibar",
    price: 169.9,
    image: "https://www.cologne.com/cdn/shop/files/82429M.jpg?v=1739824098",
    collection: "asad",
  },
  // Coleção Yara
  {
    id: "yara",
    name: "Yara",
    price: 139.9,
    image: "https://www.lattafa-usa.com/cdn/shop/files/1_7682153c-2dce-4b60-a9e6-20557f8502cf.png?v=1747500015",
    collection: "yara",
  },
  {
    id: "yara_candy",
    name: "Yara Candy",
    price: 149.9,
    image: "https://cdn.shopify.com/s/files/1/0754/4936/8799/files/Yara-Candy-1_86796aee-3226-4653-ba72-dd51d747c7f4.png?v=1747416617",
    collection: "yara",
  },
  {
    id: "yara_moi",
    name: "Yara Moi",
    price: 159.9,
    image: "https://www.lattafa-usa.com/cdn/shop/files/1_7682153c-2dce-4b60-a9e6-20557f8502cf.png?v=1747500015",
    collection: "yara",
  },
  {
    id: "yara_elixir",
    name: "Yara Elixir",
    price: 169.9,
    image: "https://www.lattafa-usa.com/cdn/shop/files/1_86dff855-8352-4fdc-bb59-68bfb09f6d75.png?v=1747576154",
    collection: "yara",
  },
  {
    id: "yara_tous",
    name: "Yara Tous",
    price: 149.9,
    image: "https://www.lattafa-usa.com/cdn/shop/files/myyaragiftset.png?v=1750374217",
    collection: "yara",
  },
  // Coleção Fakhar
  {
    id: "fakhar_rose",
    name: "Fakhar Rose",
    price: 189.9,
    image: "https://www.lattafa-usa.com/cdn/shop/files/1_aa0a5a38-775b-4814-a909-837c1d360d9c.png?v=1747500778",
    collection: "fakhar",
  },
  {
    id: "fakhar_black",
    name: "Fakhar Black",
    price: 189.9,
    image: "https://www.lattafa-usa.com/cdn/shop/files/1_aa0a5a38-775b-4814-a909-837c1d360d9c.png?v=1747500778",
    collection: "fakhar",
  },
];

export const collections = [
  { id: "asad", name: "Coleção Asad" },
  { id: "yara", name: "Coleção Yara" },
  { id: "fakhar", name: "Coleção Fakhar" },
] as const;
