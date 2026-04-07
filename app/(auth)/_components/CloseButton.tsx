"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CloseButton = () => {
  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
  };
  return (
    <button
      onClick={handleClose}
      className="bg-gray-300 rounded duration-300 cursor-pointer mb-8 absolute top-0 right-0"
      aria-label="Close"
    >
      <Image src="/close.svg" alt="Close" width={24} height={24} />
    </button>
  );
};

export default CloseButton;
