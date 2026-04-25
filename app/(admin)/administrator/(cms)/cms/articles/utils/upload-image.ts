import { Editor } from "@tiptap/react";
import { UploadResult } from "../types";

export const validateImageFile =(file: File):string | null=>{
    const allowedTypes = ["image/jpg","image/jpeg", "image/png", "image/webp"];
    if(!allowedTypes.includes(file.type.toLowerCase())){
        return `File type ${file.type} is not allowed. Allowed types: JPG, JPEG, PNG, WEBP.`;
    }

    const maxSize = 5 * 1024 * 1024;
    if(file.size > maxSize){
        return `File size is too large. Max size is 5MB`;
    }
    return null
}

export const uploadToServer = async (file: File):Promise<UploadResult> => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("/administrator/cms/api/articles/upload/temp-image", {
      method: "POST",
      body: formData,
    });
    if(!response.ok){
        const errorText = await response.text();
        throw new Error(`Upload error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if(!data.success){
        throw new Error(data.error || 'Unknown error');
    }
    return {
        url: data.url,
        filename: data.filename,
        originalName: data.originalName
    }
};


const getInsertPosition = (editor: Editor):number=>{
    const {from, to} = editor.state.selection;

    if(from !== to){
      return  Math.max(from, to);
    }
    return from
}

const insertImageToEditor= (
    editor: Editor,
    src: string,
    alt: string,
    title?: string
)=>{
    const insertPos = getInsertPosition(editor);

    const imageNode = {
        type: "image" as const,
        attrs: {
            src,
            alt,
            title: title || alt,
        },
    };

    editor.chain().insertContentAt(insertPos, imageNode).focus().run();

    setTimeout(()=>{
        editor.commands.setTextSelection(insertPos + 1);
    },10)
    
}



export const handleImageUpload = async(
file: File,
editor: Editor
):Promise<void>=>{
    const validationError = validateImageFile(file);

    if(validationError){
        alert(validationError);
        return;
    }

    try {
        
        const serverResult = await uploadToServer(file);

        insertImageToEditor(
            editor,
            serverResult.url,
            serverResult.filename,
            serverResult.originalName
        )
    } catch (error) {
        console.error("Image upload error:", error);
        alert("Image upload error");

        const reader = new FileReader()
        reader.onload=(e)=>{
            insertImageToEditor(
                editor,
                e.target?.result as string,
                file.name,
                file.name
            )
        };
        reader.readAsDataURL(file)
    }
}

export const handleImageUrl = (editor: Editor): void=>{
    const url = prompt("Enter image URL:", "https://");
    if(url && editor){
        if(!url.match(/\.(jpg|jpeg|png|webp)(\?.*)?$/i)){
            alert("Invalid image URL. Allowed types: JPG, JPEG, PNG, WEBP");
            return;
        }
        const filename = url.split("/").pop() || "Image";
        insertImageToEditor(editor, url, filename);
    }
}