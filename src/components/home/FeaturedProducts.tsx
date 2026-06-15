import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../products/ProductCard";
import type { Product } from "../../types/product";

const products: Product[] = [
{
id: "1",
slug: "iphone-15-pro-max-256gb",
name: "iPhone 15 Pro Max 256GB",
description: "Smartphone topo de linha com câmera avançada e desempenho extremo.",
category: "Smartphones",
brand: "Apple",
stock: 12,
image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
price: 6999.9,
oldPrice: 7499.9,
featured: true,
active: true,
},

{
id: "2",
slug: "notebook-gamer-rtx",
name: "Notebook Gamer RTX",
description: "Notebook para jogos com placa gráfica dedicada e alta performance.",
category: "Notebooks",
brand: "Asus",
stock: 8,
image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
price: 4999.9,
oldPrice: 5799.9,
featured: true,
active: true,
},

{
id: "3",
slug: "headset-gamer-rgb",
name: "Headset Gamer RGB",
description: "Headset confortável para longas horas de jogo.",
category: "Acessórios",
brand: "HyperX",
stock: 25,
image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
price: 299.9,
featured: true,
active: true,
},

{
id: "4",
slug: "smartwatch-premium",
name: "Smartwatch Premium",
description: "Relógio inteligente com monitoramento de saúde.",
category: "Smartwatches",
brand: "Samsung",
stock: 5,
image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
price: 599.9,
oldPrice: 799.9,
featured: true,
active: true,
},
];

export default function FeaturedProducts() {
return ( <section className="py-20 bg-white"> <Container> <SectionTitle
       title="Produtos em Destaque"
       subtitle="Os produtos mais procurados da Tech Tudo Campina."
     />

```
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  </Container>
</section>
);  
}