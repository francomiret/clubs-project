"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Importar componentes
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { HomeSection } from "./sections/HomeSection";
import { MembersSection } from "./sections/MembersSection";
import { UsersSection } from "./sections/UsersSection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { PaymentsSection } from "./sections/PaymentsSection";
import { PermissionsSection } from "./sections/PermissionsSection";
import { RolesSection } from "./sections/RolesSection";

// Importar datos y tipos
import {
  sidebarItems,
  apps,
  recentFiles,
  projects,
  tutorials,
  communityPosts,
  members,
  users,
  sponsors,
  payments,
} from "./data";

export function DesignaliCreative() {
  const [progress, setProgress] = useState(0);
  const [notifications, setNotifications] = useState(5);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

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
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:pl-64" : "md:pl-0"
        )}
      >
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          onToggleMobileMenu={toggleMobileMenu}
          notifications={notifications}
        />

        <main className="flex-1 p-4 md:p-6">
          <Tabs
            defaultValue="home"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full max-w-[800px] grid-cols-7 rounded-2xl p-1">
                <TabsTrigger
                  value="home"
                  className="rounded-xl data-[state=active]:rounded-xl"
                >
                  Home
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="rounded-xl data-[state=active]:rounded-xl"
                >
                  Members
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="rounded-xl data-[state=active]:rounded-xl"
                >
                  Users
                </TabsTrigger>
                <TabsTrigger
                  value="sponsors"
                  className="rounded-xl data-[state=active]:rounded-xl"
                >
                  Sponsors
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="rounded-xl data-[state=active]:rounded-xl"
                >
                  Payments
                </TabsTrigger>
                <TabsTrigger
                  value="roles"
                  className="rounded-xl data-[state=active]:rounded-xl"
                >
                  Roles
                </TabsTrigger>
                <TabsTrigger
                  value="permissions"
                  className="rounded-xl data-[state=active]:rounded-xl"
                >
                  Permissions
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" className="rounded-2xl">
                  <Download className="mr-2 h-4 w-4" />
                  Install App
                </Button>
                <Button className="rounded-2xl">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="home" className="space-y-8 mt-0">
                  <HomeSection
                    apps={apps}
                    recentFiles={recentFiles}
                    projects={projects}
                    communityPosts={communityPosts}
                  />
                </TabsContent>

                <TabsContent value="members" className="space-y-8 mt-0">
                  <MembersSection members={members} />
                </TabsContent>

                <TabsContent value="users" className="space-y-8 mt-0">
                  <UsersSection users={users} />
                </TabsContent>

                <TabsContent value="sponsors" className="space-y-8 mt-0">
                  <SponsorsSection sponsors={sponsors} />
                </TabsContent>

                <TabsContent value="payments" className="space-y-8 mt-0">
                  <PaymentsSection payments={payments} members={members} />
                </TabsContent>

                <TabsContent value="roles" className="space-y-8 mt-0">
                  <RolesSection />
                </TabsContent>

                <TabsContent value="permissions" className="space-y-8 mt-0">
                  <PermissionsSection />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
