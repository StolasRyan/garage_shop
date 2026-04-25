import { useCallback, useState } from "react";
import {  UseImageUploadReturn } from "../types";
import { handleImageUpload, handleImageUrl } from "../utils/upload-image";
import { Editor } from "@tiptap/react";

export const useImageUpload = (editor: Editor | null):UseImageUploadReturn=>{
     const [isUploading, setIsUploading] = useState(false);

     const uploadFile = useCallback(
        async(file: File)=>{
        if(!editor) return ;
        setIsUploading(true);
        try {
            await handleImageUpload(file, editor);
        } finally {
            setIsUploading(false);
        }
     },[editor])

     const insertByUrl = useCallback(()=>{
        if(!editor){
            console.error("Editor is not initialized");
            return;
        }
        handleImageUrl(editor);
     },[editor])


     return {isUploading, uploadFile, insertByUrl}
}