"use client";
import { initialProductData } from "@/constants/addProductFormData";
import {  AddProductFormData, ImageUploadResponse } from "@/types/addProductTypes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Title from "../../_components/Title";
import Sku from "../../_components/Sku";
import Description from "../../_components/Description";
import BasePrice from "../../_components/BasePrice";
import Discount from "../../_components/Discount";
import Quantity from "../../_components/Quantity";
import Weight from "../../_components/Weight";
import Brand from "../../_components/Brand";
import Manufacturer from "../../_components/Manufacturer";
import Categories from "../../_components/Categories";
import Tags from "../../_components/Tags";
import CheckboxGroup from "../../_components/CheckboxGroup";
import ImageUploadSection from "../../_components/ImageUploadSection";
import { useParams } from "next/navigation";
import { ProductCardProps } from "@/types/product";
import MiniLoader from "@/app/components/Header/MiniLoader";

const EditProductPage = () => {
   const params = useParams();
   const productId = params.id as string;

  const [formData, setFormData] =
    useState<AddProductFormData>(initialProductData);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string>('');
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);


  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const response = await fetch(`/api/products/${productId}`);

        if(!response.ok){
          if(response.status === 404){
            setError("Product not found")
          }else{
            setError("Failed to fetch product")
          }
          setIsLoadingProduct(false);
          return;
        }
        
        const product:ProductCardProps = await response.json();

        setFormData({
          title: product.title || '',
          sku: product.sku || '',
          description: product.description || '',
          basePrice: product.basePrice.toString() || '0',
          discountPercent: product.discountPercent?.toString() || '0',
          quantity: product.quantity.toString() || '0',
          weight: product.weight?.toString() || '0',
          brand: product.brand || '',
          manufacturer: product.manufacturer || '',
          categories: product.categories || [],
          tags: product.tags || [],
          isHealthyFood: product.isHealthyFood || false,
          isNonGMO: product.isNonGMO || false
        });
        setExistingImage(product.img || ''); 

      } catch (error) {
        console.error("Error while fetching product", error);
        setError("Failed to fetch product")
        
      }finally{
        setIsLoadingProduct(false);
      }
    }

    if(productId){
      fetchProduct();
    }
  },[productId])


  const uploadImage = async(
    imageFile: File | null,
   
  ):Promise<boolean>=>{
    if(!imageFile) return false ;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("imageId", productId);

    try {
        const response = await fetch("/api/upload-image",{
            method:"POST",
            body: formData
        });

        const data:ImageUploadResponse = await response.json();
       return data.success
    } catch (error) {
        console.error("Error while uploading image", error);
        return false
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
       

        if(image){
            const uploadResult = await uploadImage(image);
            if(!uploadResult){
            
                alert("Failed to upload image");
                setLoading(false);
                return;
            }
        }

        const response = await fetch("/api/update-product",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                ...formData,
                id: parseInt(productId),
                basePrice: Number(formData.basePrice),
                discountPercent: Number(formData.discountPercent),
                weight: Number(formData.weight),
                quantity: Number(formData.quantity),
                isHealthyFood: formData.isHealthyFood,
                isNonGMO: formData.isNonGMO
            })
        });
 
        const result = await response.json();
      
        if(response.ok && result.success){
            alert("Product updated successfully");
        }else{
          alert('Failed to update product' + (result.error || 'Unknown error'))
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

  if(isLoadingProduct){
    <MiniLoader/>
  }
 
  if(error){
    return(
      <div className="container flex flex-col items-center px-4 py-8 mx-auto">
        <div className="text-red-600 texxt-lg mb-4">{error}</div>
        <Link
        href={`/administrator/products-list`}
        className="bg-primary text-white py-2 px-4 rounded"
        >
          <ArrowLeft size={20}/> Back to products list
        </Link>
      </div>
    )
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
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
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
        existingImage={existingImage}
        />
        <button
        type="submit"
        disabled={loading || uploading}
        className="w-full bg-primary hover:shadow-button-default active:shadow-button-active text-white py-3 px-4 mb-5 rounded disabled:opacity-50 cursor-pointer font-bold"
        >
            {loading 
            ? 'Updating...'
            : 'Update'
            }
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
