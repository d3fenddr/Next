"use client";

import { useRouter } from "next/navigation";
import SuccessModal from "../../../../components/modals/SuccessModal";

export default function Page() {
  const router = useRouter();
  return (
    <SuccessModal
      open
      title="Congratulations"
      message="Your circular has been sent successfully."
      actionLabel="Ok"
      onAction={() => router.push("/circular")}
    />
  );
}
