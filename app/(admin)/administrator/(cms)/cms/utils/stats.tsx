import { BarChart3, FileText, Folder, Search } from "lucide-react";

export const stats = [
    {
        title: 'Published',
        value: '0',
        color: 'blue',
        icon: <FileText className="w-5 h-5"/> 
    },
    {
        title: 'Categories',
        value: '0',
        color: 'green',
        icon: <Folder className="w-5 h-5"/> 
    },
    {
        title: 'Key words',
        value: '0',
        color: 'purple',
        icon: <Search className="w-5 h-5"/> 
    },
    {
        title: 'Views',
        value: '0',
        color: 'orange',
        icon: <BarChart3 className="w-5 h-5"/> 
    },
]