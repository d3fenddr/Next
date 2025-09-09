"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SuccessModal from "../../../../components/modals/SuccessModal";

export default function Page() {
  const router = useRouter();
  const sp = useSearchParams();
  const t = sp.get("t");
  const name = sp.get("name") || "staff";
  const message = t === "added"
    ? "You have successfully added a new staff"
    : `You have successfully assigned a role to ${name}`;

  return (
    <SuccessModal
      open
      title="Congratulations"
      message={message}
      actionLabel={t === "added" ? "Continue" : "Ok"}
      onAction={() => router.push("/staff")}
    />
  );
}
