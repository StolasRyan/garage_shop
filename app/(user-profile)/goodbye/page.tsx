import AuthFormLayout from "@/app/(auth)/_components/AuthFormLayout";
import Link from "next/link";
import React from "react";

const GoddbyePage = () => {
  return (
    <AuthFormLayout>
      <div className="bg-white flex flex-col justify-center items-center ">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Yors account has been deleted successfully.
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for using our service. All your data has been deleted.
        </p>
        <Link 
        href={`/`}
        className="bg-primary hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) w-full text-center text-white text-2xl px-3 py-2 cursor-pointer rounded duration-300"
        >
            Go to Home
        </Link>
      </div>
    </AuthFormLayout>
  );
};

export default GoddbyePage;
