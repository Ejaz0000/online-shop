"use client";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import StatCards from "@/components/dashboard/StatCards";
import DataTable from "@/components/dashboard/DataTable";

export default function AdminPage() {
  const collapsed = useSelector((s) => s.sidebar.collapsed);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <AdminNavbar />

      <motion.main
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="p-6"
      >
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back, Admin</p>
        </div>

        <StatCards />

        <div className="mt-6">
          <DataTable />
        </div>
      </motion.main>
    </div>
  );
}
