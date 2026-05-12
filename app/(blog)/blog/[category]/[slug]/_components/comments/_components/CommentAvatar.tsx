import { CommentAvatarProps } from "@/app/(blog)/blog/types";
import { checkAvatarExists } from "@/utils/avatarUtils";
import { getAvatarByGender } from "@/utils/getAvatarByGender";
import Image from "next/image";
import { useEffect, useState } from "react";

const CommentAvatar = ({authorName,authorId}:CommentAvatarProps) => {
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [authorGender, setAuthorGender] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");

//   useEffect(()=>{
//     const fetchAuthorGender = async()=>{
//         if(!authorId) return;

//         try {
//             const response = await fetch(`/api/blog/user/${authorId}`);
//             if(response.ok){
//                 const data = await response.json();
//                 setAuthorGender(data.gender);
//             }
//         } catch (error) {
//             console.error('Error fetching author data', error);
//         }
//     }
//     fetchAuthorGender();
//   },[authorId])

//   useEffect(()=>{
//     const loadAvatar = async()=>{
//         setAvatarLoading(true);
//         if(authorId){
//             try {
//                 const exists = await checkAvatarExists(authorId);
//                 if(exists){
//                     setAvatarSrc(`/api/auth/avatar/${authorId}`)
//                 }else if(authorGender){
//                     setAvatarSrc(getAvatarByGender(authorGender))
//                 }
//             } catch {
//                 if(authorGender){
//                     setAvatarSrc(getAvatarByGender(authorGender))
//                 }
//             }
//         }
//         setAvatarLoading(false);
//     }
//     if(authorGender || authorId){
//         loadAvatar();
//     }
//   },[authorGender, authorId])

useEffect(() => {
    if (!authorId) return;

    const load = async () => {
        setAvatarLoading(true);
        let gender = '';
        try {
            const res = await fetch(`/api/blog/user/${authorId}`);
             gender = res.ok ? (await res.json()).gender : '';
            setAuthorGender(gender);

            const exists = await checkAvatarExists(authorId);
            if (exists) {
                setAvatarSrc(`/api/auth/avatar/${authorId}`);
            } else if (gender) {
                setAvatarSrc(getAvatarByGender(gender));
            }
        } catch {
             setAvatarSrc(gender ? getAvatarByGender(gender) : '/user.svg');
        } finally {
            setAvatarLoading(false);
        }
    };

    load();
}, [authorId]);

  const handleAvatarError = ()=>{
    if(authorGender){
        setAvatarSrc(getAvatarByGender(authorGender))
    }else{
        setAvatarSrc('/user.svg')
    }
  }

  return (
    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
      {avatarLoading ? (
        <div className="w-full h-full bg-gray-300 animate-pulse" />
      ) : (
        <Image 
            src={avatarSrc}
            alt={authorName}
            width={32}
            height={32}
            className="w-full h-full object-cover"
            onError={handleAvatarError}
        />
      )}
    </div>
  );
};

export default CommentAvatar;
