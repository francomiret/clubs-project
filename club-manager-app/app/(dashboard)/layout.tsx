"use client";

import { useState } from "react";
import { Sidebar } from "@/components/creative/Sidebar";
import { Header } from "@/components/creative/Header";
import { sidebarItems } from "@/components/creative/data";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(5);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 opacity-20 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600" />

        {/* Sidebar */}
        <Sidebar
          items={sidebarItems}
          sidebarOpen={sidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          onToggleSidebar={toggleSidebar}
          onToggleMobileMenu={toggleMobileMenu}
        />

        {/* Main Content */}
        <div
          className={`min-h-screen transition-all duration-300 ease-in-out ${
            sidebarOpen ? "md:pl-64" : "md:pl-0"
          }`}
        >
          {/* Header */}
          <Header
            sidebarOpen={sidebarOpen}
            onToggleSidebar={toggleSidebar}
            onToggleMobileMenu={toggleMobileMenu}
            notifications={notifications}
          />

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
