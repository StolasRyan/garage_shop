export const SEO_LIMITS ={
    name:{
        min:2,
        max:60,
        message:"Name must be between 2 and 60 characters"
    },
    slug:{
        min:2,
        max:60,
        message:"Slug must be between 2 and 60 characters"
    },
    description:{
        min:10,
        max:160,
        message:"Description must be between 10 and 160 characters"
    },
    keywords:{
        maxCount:10,
        maxLength:200,
        message:"10 keywords max, separated by commas and no more than 200 characters "
    },
    imageAlt:{
        min:2,
        max:125,
        message:"Description must be between 2 and 125 characters (optimal for SEO)"
    }
}