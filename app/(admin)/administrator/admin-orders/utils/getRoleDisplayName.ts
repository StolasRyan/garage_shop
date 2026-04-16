export const getRoleDisplayName = (role: string) => {
    switch (role) {
        case 'admim':
            return 'Administrator';
        case 'manager':
            return 'Manager';
        case 'courier':
            return 'Courier';
        default:
            return 'User';
    }
};