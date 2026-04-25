import { useEffect, useState } from "react";
import { ToolbarGroup } from "../types";
import { CONFIG_GROUPS } from "../utils/CONFIG_TOOLBAR";

export const useToolbarOrder = () => {
    const [groups, setGroups] = useState<ToolbarGroup[]>(()=>{
        try {
            const saved = localStorage.getItem('toolbar-order');
            if(saved){
                const parsed = JSON.parse(saved);
                return Array.isArray(parsed) ? parsed : CONFIG_GROUPS;
            }
          
        } catch (error) {
            console.error('Error loading components order', error);
        }
          return CONFIG_GROUPS;
    });


    useEffect(()=>{
        try {
            localStorage.setItem('toolbar-order', JSON.stringify(groups));
        } catch (error) {
            console.error('Error saving components order', error);
        }
    },[groups]);

    const moveGroup = (fromIndex:number, toIndex:number)=>{
        if(fromIndex === toIndex) return;
       
        setGroups((prevGroups)=>{
            const newGroups = [...prevGroups];
            const [movedGroup] = newGroups.splice(fromIndex, 1);
            newGroups.splice(toIndex, 0, movedGroup);
            return newGroups;
        });
    };
    
    return {
        groups,
        moveGroup
    }
};