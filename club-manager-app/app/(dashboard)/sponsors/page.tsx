"use client";

import { SponsorsSection } from "@/components/creative/sections/SponsorsSection";
import { sponsors } from "@/components/creative/data";

export default function SponsorsPage() {
  return (
    <div className="container mx-auto py-6">
      <SponsorsSection sponsors={sponsors} />
    </div>
  );
}
