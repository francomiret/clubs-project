"use client";

import { MembersSection } from "@/components/creative/sections/MembersSection";
import { members } from "@/components/creative/data";

export default function MembersPage() {
  return (
    <div className="container mx-auto py-6">
      <MembersSection members={members} />
    </div>
  );
}
