import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex flex-row gap-3 items-center px-5 ">

        <Image src="/favicon.ico" alt="Logo" width={40} height={40} priority={false}/>
        <h1 className="text-2xl font-bold hidden md:block relative">GARAGE SHOP</h1>

    </Link>
  );
};

export default Logo;
