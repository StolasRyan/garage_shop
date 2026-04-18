'use client'
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SidebarMenu from "./sidebarMenu/SidebarMenu";

export default function CMSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const path = usePathname();

    const isCMSRoot = path === '/administrator/cms'
    return (
        <>
        {!isCMSRoot && (
            <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-17 right-6 z-100 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 duration-300 cursor-pointer"
            >
                <Menu className="w-5 h-5"/>
            </button>
        )}
        <main className="min-h-screen bg-gray-50 p-6 w-full mx-auto rounded-lg">
            {children}
        </main>
        <SidebarMenu isOpen={isSidebarOpen} onCloseAction={() => setIsSidebarOpen(false)}/>
        </>
    )
} 