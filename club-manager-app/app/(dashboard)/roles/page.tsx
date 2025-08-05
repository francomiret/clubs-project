"use client";

import { RolesSection } from "@/components/creative/sections/RolesSection";
import { roles } from "@/components/creative/data";

export default function RolesPage() {
  return (
    <div className="container mx-auto py-6">
      <RolesSection roles={roles} />
    </div>
  );
}
