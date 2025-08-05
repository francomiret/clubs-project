"use client";

import { ActivitiesSection } from "@/components/creative/sections/ActivitiesSection";
import { activities } from "@/components/creative/data";

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto py-6">
      <ActivitiesSection activities={activities} />
    </div>
  );
}
