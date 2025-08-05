"use client";

import { PaymentsSection } from "@/components/creative/sections/PaymentsSection";
import { payments } from "@/components/creative/data";

export default function PaymentsPage() {
  return (
    <div className="container mx-auto py-6">
      <PaymentsSection payments={payments} />
    </div>
  );
}
