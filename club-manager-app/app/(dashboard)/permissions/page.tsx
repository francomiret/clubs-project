"use client";

import { PermissionsSection } from "@/components/creative/sections/PermissionsSection";
import { permissions } from "@/components/creative/data";

export default function PermissionsPage() {
  return (
    <div className="container mx-auto py-6">
      <PermissionsSection permissions={permissions} />
    </div>
  );
}
