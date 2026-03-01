"use client";

import { motion } from "framer-motion";
import { Banknote, ShoppingBag, UserPlus, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Sales", value: "$48,290", change: "+12.5%", positive: true, icon: <Banknote className="w-6 h-6" /> },
  { label: "Orders", value: "1,284", change: "+8.2%", positive: true, icon: <ShoppingBag className="w-6 h-6" /> },
  { label: "New Users", value: "342", change: "+24.1%", positive: true, icon: <UserPlus className="w-6 h-6" /> },
  { label: "Revenue", value: "$12,480", change: "-3.1%", positive: false, icon: <TrendingUp className="w-6 h-6" /> },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-lg dark:shadow-gray-900/30 transition-all duration-300 group cursor-default"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              <span className={`text-xs font-semibold mt-1 inline-block ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>
                {stat.change}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
              {stat.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
