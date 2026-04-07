import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/userData';
import React, { useEffect, useState } from 'react'
import { tableStyles } from '../../styles';
import MiniLoader from '@/app/components/Header/MiniLoader';
import { getRoleLabel, getRoleStyles } from '@/utils/admin/rolesUtils';

interface RoleProps{
    initialRole: string;
    userId: string;
}

const Role = ({initialRole, userId}:RoleProps) => {

    const [isChanging, setIsChanging] = useState(false);
    const [localRole, setLocalRole] = useState<UserRole>(initialRole as UserRole);
    const { user:currentUser} = useAuthStore();

    const isAdmin = currentUser?.role === 'admin';
    const canChangeRole = isAdmin;

    useEffect(()=>{
        setLocalRole(initialRole as UserRole)
    },[initialRole]);

    const handleRoleChange=async(newRole:UserRole)=>{
        if(newRole === localRole || !canChangeRole)return;

        setIsChanging(true);

        try {
            const response = await fetch(`/api/admin/users/${userId}/role`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({role:newRole})
            });

            if(!response.ok){
                throw new Error("Failed to change role.")
            }
            const data = await response.json();
            if(data.success){
                setLocalRole(newRole)
            }else{
                throw new Error(data.error || "Unknown error")
            }
        } catch (error) {
            console.error('Failed to change role:', error);
            setLocalRole(initialRole as UserRole)
        }finally{
            setIsChanging(false)
        }
    }



  return (
    <div className={`border-b border-gray-300 md:border-b-0 order-6 flex flex-row gap-x-3 ${tableStyles.colSpans.role} ${tableStyles.border.right}`}>
        <div className='text-xs font-semibold md:hidden'>Role:</div>
        {isChanging ? (
            <div className='text-xs text-gray-500'><MiniLoader/></div>
        ): localRole === 'admin' ?
         (
            <div className={`inline-flex justify-center items-center h-8 md:flex-1 w-35 md:w-30 rounded font-medium px-3 md:px-1 lg:px-3 py-2 text-xs md:text-[10px] lg:text-xs ${getRoleStyles(localRole)}`}>
                {getRoleLabel(localRole)}
            </div>
        ) : canChangeRole ? (
            <select
            value={localRole}
            onChange={(e)=>handleRoleChange(e.target.value as UserRole)}
            className={`inline-flex justify-center items-center h-8 md:flex-1 w-35 ma:w-30 px-3 md:px-1 lg:px-3 py-2 rounded text-xs md:text-[10px] lg:text-xs font-medium cursor-pointer outline-none ${getRoleStyles(localRole)}`}
            disabled={isChanging}
            >
                <option value="user">User</option>
                <option value="manager">Manager</option>
            </select>
        ):(<div
          className={`inline-flex justify-center items-center h-8 md:flex-1 w-35 md:w-30 rounded font-medium px-3 md:px-1 lg:px-3 py-2 text-xs md:text-[10px] lg:text-xs ${getRoleStyles(localRole)}`}
        >
          {getRoleLabel(localRole)}
        </div>)}
    </div>
  )
}

export default Role