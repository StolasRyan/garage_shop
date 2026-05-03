'use client'
import { ArrowUpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = ({appearPosition = 0, finishPosition = 0}) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(()=>{
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > appearPosition);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[appearPosition])

    const scrollToTop = () => {
        window.scrollTo({
            top: finishPosition ,
            behavior: 'smooth'
        });
    }
  return (
    <button
    onClick={scrollToTop}
    className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-12 h-12 bg-linear-to-r from-lime-500 to-emerald-600 text-white rounded-full shadow-xl hover:from-lime-600 hover:to-emerald-700 hover:shadow-2xl cursor-pointer duration-300 flex items-center justify-center group ${
        showScrollTop
          ? "opacity-100 scale-100"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll up"
    >
        <ArrowUpCircle className="w-10 h-10" />
    </button>
  )
}

export default ScrollToTopButton