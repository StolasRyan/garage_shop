export type UserRole = 'user' | 'admin' | 'manager'

export type UserData = {
    id: string;
    name: string;
    surname:string;
    email: string;
    phoneNumber: string;
    role:UserRole;
    emailVerified: boolean;
    phoneNumberVerified: boolean;
    gender: string;
    birthdayDate: string;
    location?: string;
    region?: string;
    card?:string;
    hasCard:boolean;
    createdAt:string;
    updatedAt:string;
};

export type UserDataOrNull = UserData | null;