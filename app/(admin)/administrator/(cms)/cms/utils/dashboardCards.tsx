import { FileText, FolderTree, Plus, Tags } from "lucide-react";
import { DashboardCard } from "../types/dashboard";


 export const dashboardCards:DashboardCard[] = [
        {
            id:'new-article',
            title:'New Article',
            description:'Create a new article',
            icon:<Plus className="w-6 h-6"/>,
            color:'blue',
            path:'/administrator/blog/editor',
            actionText:'Create'
        },
        {
            id:'all-articles',
            title:'All Articles',
            description:'Articles managment controls',
            icon:<FileText className="w-6 h-6"/>,
            color:'indigo',
            path:'/administrator/cms',
            actionText:'Create'
        },
        {
            id:'categories',
            title:'Categories',
            description:'Blogs managment controls',
            icon:<FolderTree className="w-6 h-6"/>,
            color:'green',
            path:'/administrator/cms/categories',
            actionText:'Manage'
        },
        {
            id:'semantic-core',
            title:'Semantic Core',
            description:'Keywords and SEO',
            icon:<Tags className="w-6 h-6"/>,
            color:'purple',
            path:'/administrator/cms/semantic-core',
            actionText:'Tune'
        },
    ]