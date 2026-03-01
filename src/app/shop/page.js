"use client";

import ShopNavbar from "@/components/shop/ShopNavbar";
import Hero from "@/components/shop/Hero";
import ProductCard from "@/components/shop/ProductCard";
import products from "@/data/products.json";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <ShopNavbar />
      <Hero />

      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{products.length} items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <p className="text-center text-sm text-gray-400 dark:text-gray-600">
          &copy; 2026 OnlineShop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
