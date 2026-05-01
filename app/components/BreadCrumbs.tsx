"use client";
import { TRANSLATIONS } from "@/utils/pathTranslations";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import MiniLoader from "./Header/MiniLoader";
import { useProduct } from "../contexts/ProductContext";
import { useArticleTitles } from "../contexts/ArticleContext";
import { useCategoryTitles } from "../contexts/CategoryContext";


function BreadCrumbsContent(){
  const pathName = usePathname();
  const {title} = useProduct();
  const {articleTitle} = useArticleTitles();
  const {categoryTitle} = useCategoryTitles();

  if (pathName === "/" || pathName === "/search") return null;

  const pathSegments = pathName.split("/").filter((segment) => segment !== "");

  const productDesc = title;

  const isArticlePage = pathSegments[0] === "blog" && pathSegments.length >= 3;
  const isCategoryPage = pathSegments[0] === "blog" && pathSegments.length >= 2;

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

    if(isCategoryPage && index === pathSegments.length -1 && categoryTitle){
      label = categoryTitle
    }
    if(isArticlePage && index === pathSegments.length -2 && categoryTitle){
      label = categoryTitle
    }
    if(isArticlePage && index === pathSegments.length -1 && articleTitle){
      label = articleTitle
    }

    let finalHref = href;
    
    const isLastItem = index === pathSegments.length - 1;
    
    const isBlogPage = isArticlePage || isCategoryPage;

    if(isLastItem && !isBlogPage){
      finalHref = `${href}?desc=${productDesc}`
    }

    return {
      label,
      href: finalHref,
      isLast: isLastItem,
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
                <span title={item.label?.toString()}>{item.label}</span>
              ) : (
                <Link href={item.href}>
                  <span title={item.label?.toString()}>{item.label}</span>
                </Link>
              )}
            </div>
            {!item.isLast && <Image src='/arrow-right.svg' alt={`Go from ${item.label} to ${breadCrumbs[breadCrumbs.length - 1].label}`} width={24} height={24} sizes="24px"/>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const BreadCrumbs = () => {
  return (
    <Suspense fallback={<MiniLoader/>}>
      <BreadCrumbsContent />
    </Suspense>
  )
};

export default BreadCrumbs;
