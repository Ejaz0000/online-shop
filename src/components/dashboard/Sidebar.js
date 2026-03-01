"use client";

import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/sidebarSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Archive, Users, Settings, Menu } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutGrid className="w-5 h-5" /> },
  { label: "Products", href: "/shop", icon: <Archive className="w-5 h-5" /> },
  { label: "Users", href: "/admin", icon: <Users className="w-5 h-5" /> },
  { label: "Settings", href: "/admin", icon: <Settings className="w-5 h-5" /> },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector((s) => s.sidebar.collapsed);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 bottom-0 z-30 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col"
    >
      <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-3 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap"
          >
            Admin Panel
          </motion.span>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href && item.label === "Dashboard";
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-accent/10 text-accent"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              } ${collapsed ? "justify-center" : ""}`}
            >
              {item.icon}
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
