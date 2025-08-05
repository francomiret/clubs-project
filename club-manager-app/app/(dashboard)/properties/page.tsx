"use client";

import { PropertiesSection } from "@/components/creative/sections/PropertiesSection";
import { properties } from "@/components/creative/data";

export default function PropertiesPage() {
  return (
    <div className="container mx-auto py-6">
      <PropertiesSection properties={properties} />
    </div>
  );
}
