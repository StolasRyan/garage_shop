"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import MenuOverlay from "./MenuOverlay";
import MenuHeader from "./MenuHeader";
import { Truck } from "lucide-react";
import MenuItemsList from "./MenuItemsList";
import { menuItems } from "../utils/menuItems";
import MenuFooter from "./MenuFooter";

interface SidebarMenuProps {
  isOpen: boolean;
  onCloseAction: () => void;
}
const SidebarMenu = ({ isOpen, onCloseAction }: SidebarMenuProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCloseAction();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCloseAction]);

  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, mounted]);

  const handleItemClick = (path: string) => {
    router.push(path);
    onCloseAction();
  };

  if (!mounted) return null;

  return (
    <>
      <GlobalStyles />
      <MenuOverlay isOpen={isOpen} onClose={onCloseAction} />
      <div
        className={`fixed right-0 top-0 h-full w-96 z-200 shadow-2xl shadow-black/20 ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{
          transition:
            "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-out",
        }}
      >
        <div className="absolute -left-2 top-0 h-full w-2 bg-linear-to-r from-transparent via-blue-500/10 to-transparent blur-sm"></div>
        <div className="absolute -left-4 top-4 h-[calc(100%-2rem)] w-1 bg-linear-to-r from-transparent via-purple-500/5 to-transparent blur"></div>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-linear-to-b from-white via-white to-gray-50/95 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="absolute inset-0 shadow-[inset_0_0_60px_-20px_rgba(59,130,246,0.1)]" />
          <div className="relative h-full flex flex-col">
            <div className="shrink-0 pt-5 px-5">
              <MenuHeader
                isOpen={isOpen}
                onCloseAction={onCloseAction}
                icon={<Truck className="relative h-7 w-7 text-blue-600" />}
              />
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-4">
              <MenuItemsList items={menuItems} onItemClick={handleItemClick} />
            </div>

            <MenuFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
