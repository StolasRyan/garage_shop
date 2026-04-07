"use client";
import { TRANSLATIONS } from "@/utils/pathTranslations";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";



const BreadCrumbs = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams()

  if (pathName === "/" || pathName === "/search") return null;

  const pathSegments = pathName.split("/").filter((segment) => segment !== "");

  const productDesc = searchParams.get('desc')

  const breadCrumbs: { label: string | React.ReactNode; href: string; isLast: boolean }[] = pathSegments.map((segment, index) => {

    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

    let label = TRANSLATIONS[segment] || segment;


    if(
      index === pathSegments.length - 1 &&
      productDesc && 
      pathSegments.includes('catalog') &&
      pathSegments.length >=3
    ){
      label = productDesc
    }

    return {
      label,
      href:
      index === pathSegments.length - 1
      ? `${href}?desc=${productDesc}`
      :href,
      isLast: index === pathSegments.length - 1,
    };
  });

  breadCrumbs.unshift({
    label: <HomeIcon className="w-4 h-4 hover:animate-bounce " style={{ animationDuration: '0.7s' }} />,
    href: "/",
    isLast: false,
  });

  return (
    <nav className="px-[max(12px, calc((100%-1208px)/2))] my-6 ml-3">
      <ol className="flex gap-4 items-center text-[8px] md:text-xs">
        {breadCrumbs.map((item, index) => (
          <li key={index} className="flex items-center gap-4">
            <div
              className={
                item.isLast
                  ? "text-[#8f8f8f]"
                  : "text-[#414141] hover:underline cursor-pointer"
              }
            >
              {item.isLast ? (
                item.label
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </div>
            {!item.isLast && <Image src='/arrow-right.svg' alt={`Go from ${item.label} to ${breadCrumbs[breadCrumbs.length - 1].label}`} width={24} height={24} sizes="24px"/>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
