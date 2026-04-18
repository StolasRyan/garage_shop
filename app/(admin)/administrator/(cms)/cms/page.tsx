'use client'
import { useEffect, useState } from "react";
import Header from "./_components/Header";
import DashboardCardsGrid from "./_components/DashboardCardsGrid";
import StatsSection from "./_components/StatsSection";
 

export default function AdminDashboardPage(){
    
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    },[]);

   if(!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <Header title="Administration Panel" description="Blogs content and SEO management"/>
            <DashboardCardsGrid/>
            <StatsSection/>
            </div>
        </div>
    )
}