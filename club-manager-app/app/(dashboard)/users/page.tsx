"use client";

import { UsersSection } from "@/components/creative/sections/UsersSection";
import { users } from "@/components/creative/data";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-6">
      <UsersSection users={users} />
    </div>
  );
}
