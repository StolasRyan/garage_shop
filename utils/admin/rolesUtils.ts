import { UserRole } from "@/types/userData";

export     const getRoleStyles = (role: UserRole)=>{
        switch(role){
            case 'admin':
                return `bg-red-200 text-red-600`;
            case 'manager':
                return `bg-green-200 text-green-600`;
            default:
                return `bg-gray-200 text-gray-600`  
        }
    };

 export   const getRoleLabel =(role: UserRole)=>{
        switch(role){
            case 'admin':
                return "Administrator";
            case 'manager':
                return "Manager";
            default:
                return 'User'
        }
    }