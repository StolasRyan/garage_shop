import { AlertCircle, AlertTriangle, Check, CheckCheckIcon, Home, ShoppingBag, TruckIcon } from "lucide-react";

export const CUSTOMER_STATUSES  = [
    {value: 'pending', icon: ShoppingBag, label: 'New'},
    {value: 'collected', icon: Check, label: 'Collected'},
    {value: 'delivering', icon: TruckIcon, label: 'Delivering'},
    {value: 'confirmed', icon: CheckCheckIcon, label: 'Confirmed'},
    {value: 'cancelled', icon: AlertCircle, label: 'Not Confirmed'},
    {value: 'refund', icon: AlertTriangle, label: 'Refund'},
    {value: 'returned', icon: Home, label: 'Returned'}
] 