export function getColorFromName(name: string){
    const colors = [
        'from-blue-500 to-cyan-500',
        'from-green-500 to-lime-500',
        'from-yellow-500 to-amber-500',
        'from-red-500 to-rose-500',
        'from-pink-500 to-fuchsia-500',
        'from-fuchsia-500 to-violet-500',
        'from-violet-500 to-indigo-500',
        'from-indigo-500 to-blue-500',
        'from-blue-500 to-cyan-500',
        'from-cyan-500 to-teal-500',
    ];

    const hash = name.split('').reduce((acc, char)=>{
        return char.charCodeAt(0) + ((acc << 5) - acc);
    },0)

    return colors[Math.abs(hash) % colors.length];
}