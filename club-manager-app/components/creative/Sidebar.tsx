"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, Settings, X } from "lucide-react";
import { IconRenderer } from "./IconRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarProps {
  items: SidebarItem[];
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  onToggleSidebar: () => void;
  onToggleMobileMenu: () => void;
}

export function Sidebar({
  items,
  sidebarOpen,
  mobileMenuOpen,
  onToggleSidebar,
  onToggleMobileMenu,
}: SidebarProps) {
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold">Designali</h2>
            <p className="text-xs text-muted-foreground">Creative Suite</p>
          </div>
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("common.search")}
            className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.title} className="mb-1">
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                  item.isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
                onClick={() => item.items && toggleExpanded(item.title)}
              >
                <div className="flex items-center gap-3">
                  <IconRenderer icon={item.icon} className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant="outline"
                    className="ml-auto rounded-full px-2 py-0.5 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
                {item.items && (
                  <ChevronDown
                    className={cn(
                      "ml-2 h-4 w-4 transition-transform",
                      expandedItems[item.title] ? "rotate-180" : ""
                    )}
                  />
                )}
              </button>

              {item.items && expandedItems[item.title] && (
                <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                  {item.items.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.url}
                      className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                    >
                      {subItem.title}
                      {subItem.badge && (
                        <Badge
                          variant="outline"
                          className="ml-auto rounded-full px-2 py-0.5 text-xs"
                        >
                          {subItem.badge}
                        </Badge>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
            <div className="flex items-center gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </div>
            <Badge variant="outline" className="ml-auto">
              Pro
            </Badge>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onToggleMobileMenu}
        />
      )}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold">Designali</h2>
                <p className="text-xs text-muted-foreground">Creative Suite</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggleMobileMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <SidebarContent />
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </div>
    </>
  );
}
