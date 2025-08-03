"use client";

import {
  ImageIcon,
  Brush,
  Video,
  Sparkles,
  Layers,
  LayoutGrid,
  Camera,
  FileText,
  Code,
  CuboidIcon,
  Type,
  Palette,
  Home,
  Grid,
  BookOpen,
  Users,
  Bookmark,
  Settings,
  Wand2,
  ChevronDown,
  Search,
  X,
  Bell,
  Cloud,
  Menu,
  MessageSquare,
  PanelLeft,
  Download,
  Plus,
  Star,
  Clock,
  Eye,
  Archive,
  ArrowUpDown,
  MoreHorizontal,
  Share2,
  Trash,
  Play,
  Award,
  Lightbulb,
  TrendingUp,
  Crown,
} from "lucide-react";

interface IconRendererProps {
  icon: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ImageIcon,
  Brush,
  Video,
  Sparkles,
  Layers,
  LayoutGrid,
  Camera,
  FileText,
  Code,
  CuboidIcon,
  Type,
  Palette,
  Home,
  Grid,
  BookOpen,
  Users,
  Bookmark,
  Settings,
  Wand2,
  ChevronDown,
  Search,
  X,
  Bell,
  Cloud,
  Menu,
  MessageSquare,
  PanelLeft,
  Download,
  Plus,
  Star,
  Clock,
  Eye,
  Archive,
  ArrowUpDown,
  MoreHorizontal,
  Share2,
  Trash,
  Play,
  Award,
  Lightbulb,
  TrendingUp,
  Crown,
};

export function IconRenderer({ icon, className }: IconRendererProps) {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found`);
    return null;
  }

  return <IconComponent className={className} />;
}
