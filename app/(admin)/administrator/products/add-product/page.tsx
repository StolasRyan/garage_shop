"use client";
import { initialProductData } from "@/constants/addProductFormData";
import { AddProductApiResponse, AddProductFormData, ImageUploadResponse } from "@/types/addProductTypes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import Title from "../_components/Title";
import Sku from "../_components/Sku";
import Description from "../_components/Description";
import BasePrice from "../_components/BasePrice";
import Discount from "../_components/Discount";
import Quantity from "../_components/Quantity";
import Weight from "../_components/Weight";
import Brand from "../_components/Brand";
import Manufacturer from "../_components/Manufacturer";
import Categories from "../_components/Categories";
import Tags from "../_components/Tags";
import CheckboxGroup from "../_components/CheckboxGroup";
import ImageUploadSection from "../_components/ImageUploadSection";
import SuccessCreatedMessage from "../_components/SuccessCreatedMessage";

const AddProductPage = () => {
   
  const [formData, setFormData] =
    useState<AddProductFormData>(initialProductData);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [createdProductId, setCreatedProductId] = useState<number | null>(null);

  const generateProductId = useCallback(() => {
    return Math.floor(Math.random() * 1000000000000000);
  }, []);

  const uploadImage = async(
    imageFile: File | null,
    id: number | null
  ):Promise<{img: string, id: number} | null>=>{
    if(!imageFile || !id) return null;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("imageId", id.toString());

    try {
        const response = await fetch("/api/upload-image",{
            method:"POST",
            body: formData
        });

        const data:ImageUploadResponse = await response.json();
        if(data.success && data.product){
            return {img: data.product.img, id: data.product.id};
        }
        return null
    } catch (error) {
        console.error("Error while uploading image", error);
        return null
    }finally{
        setUploading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(
        hasActionTag &&
        (!formData.discountPercent || formData.discountPercent === '0')
    ){
        alert("Please enter discount percent");
        return;
    }
    setLoading(true);

    try {
        const productId = generateProductId();

        let imagePath: string | null = null;

        if(image){
            const uploadResult = await uploadImage(image, productId);
            if(uploadResult){
                imagePath = uploadResult.img;
            }else{
                alert("Failed to upload image");
                setLoading(false);
                return;
            }
        }

        const response = await fetch("/api/add-product",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                ...formData,
                img: imagePath,
                id: productId,
                basePrice: Number(formData.basePrice),
                discountPercent: Number(formData.discountPercent),
                weight: Number(formData.weight),
                quantity: Number(formData.quantity),
                isHealthyFood: formData.isHealthyFood,
                isNonGMO: formData.isNonGMO
            })
        });

        const result: AddProductApiResponse = await response.json();
      
        if(response.ok && result.success){
            setCreatedProductId(productId);
        }

    } catch (error) {
        alert(`Error ${error instanceof Error ? error.message : "Unknown error"}`)
    }finally{
        setLoading(false);
    }

  };

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const hasActionTag = formData.tags.includes("actions");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
    });
  };

  const handleTagsChange = (tags: string[])=>{
    setFormData((prev)=>({...prev, tags}))
  }

  const clearForm = ()=>{
    setFormData(initialProductData);
    setImage(null);
    setCreatedProductId(null);
  }

  return (
    <div className="container flex flex-col items-center px-4 py-8 text-gray-600 mx-auto">
      <Link
        href={`/administrator`}
        className="hover:underline mb-3 lg:mb-4 flex flex-row items-center gap-3 text-sm lg:text-base"
      >
        <ArrowLeft className="h-4 w-4 ml-1" />
        Back to Panel
      </Link>
      <h1 className="text-3xl font-bold mb-8">Add Product</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Title title={formData.title} onChangeAction={handleInputChange} />
          <Sku sku={formData.sku} onChangeAction={handleInputChange} />
        </div>
        <Description
          description={formData.description}
          onChangeAction={handleInputChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BasePrice
            basePrice={formData.basePrice}
            onChangeAction={handleInputChange}
          />
          <Discount
            discount={formData.discountPercent}
            onChangeAction={handleInputChange}
            required={hasActionTag}
          />
          <Quantity
            quantity={formData.quantity}
            onChangeAction={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Weight weight={formData.weight} onChangeAction={handleInputChange} />
          <Brand brand={formData.brand} onChangeAction={handleInputChange} />
          <Manufacturer
            manufacturer={formData.manufacturer}
            onChangeAction={handleInputChange}
          />
        </div>
        <Categories
          selectedCategories={formData.categories}
          onCategoriesChange={(categories) =>
            setFormData((prev) => ({ ...prev, categories }))
          }
        />
        <Tags
        selectedTags={formData.tags}
        onTagsChange={handleTagsChange}
        hasActionsTag={hasActionTag}
        />
        <CheckboxGroup
        items={[{
            name: 'isHealthyFood',
            label: 'Healty food',
            checked: formData.isHealthyFood
        }, {name: 'isNonGMO', label: "GMO Free", checked: formData.isNonGMO}]}
        onChange={handleInputChange}
        />
        <ImageUploadSection
        onImageChange={handleImageChange}
        uploading={uploading}
        loading={loading}
        />
        <button
        type="submit"
        disabled={loading || uploading}
        className="w-full bg-primary hover:shadow-button-default active:shadow-button-active text-white py-3 px-4 mb-5 rounded disabled:opacity-50 cursor-pointer font-bold"
        >
            {loading 
            ? 'Adding...'
            : 'Add'
            }
        </button>
      </form>
      {createdProductId &&(
        <SuccessCreatedMessage categories={formData.categories} createdProductId={createdProductId} onClearForm={clearForm}/>
      )}
    </div>
  );
};

export default AddProductPage;
