"use client";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export default function ProductCard({ product, index }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-gray-900/30 transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(addToCart(product))}
            className="absolute bottom-3 left-3 right-3 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-semibold rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          >
            Add to Cart
          </motion.button>
        </div>
        <div className="p-4">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-accent">{product.category}</span>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{product.name}</h3>
          <p className="text-sm font-bold text-gray-900 dark:text-white mt-2">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
}
