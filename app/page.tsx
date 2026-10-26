
"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
   
<main>
  <header className="site-header">
    <h1>Titosverse</h1>

    <nav>
      <a href="/">Home</a>
      <a href="#products">Shop</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  
<section className="hero">
  <div className="hero-content">
   <p className="hero-label">WELCOME TO TITOSVERSE</p>

<h2>
  Find your style.
  <br />
  Wear it your way.
</h2>

   <p className="hero-description">
  Find clothes you love, from everyday outfits to
  pieces for special occasions.
</p>

    <a href="#products">EXPLORE THE COLLECTION ↗</a>
  </div>

  <div className="hero-note">
    <span>EST.</span>
    <span>YOUR STYLE. YOUR STORY.</span>
  </div>
</section>


<section className="shop-categories">
  <div className="category-panel">
    <p>THE COLLECTION</p>
    <h2>For Him</h2>
    <a href="#products">SHOP MEN ↗</a>
  </div>

  <div className="category-panel">
    <p>THE COLLECTION</p>
    <h2>For Her</h2>
    <a href="#products">SHOP WOMEN ↗</a>
  </div>
</section>


      <section id="products">
  <h2>Our Collection</h2>
<p className="collection-intro">
  Take a look at what's available.
</p>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div>
            {products.map((product) => (
              <article key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                  width="150"
                />
                <h3>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
                <p>Rating: {product.rating.rate}/5</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
