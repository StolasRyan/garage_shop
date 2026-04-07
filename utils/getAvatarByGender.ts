export const getAvatarByGender = (gender?: string) => {
    if(gender === 'female') return '/female.png'
    if(gender === 'male') return '/male.png'
    return '/user.svg'
}