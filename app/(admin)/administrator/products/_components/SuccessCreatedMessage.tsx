'use client'
import { useRouter } from "next/navigation";

interface SuccessCreatedMessageProps {
    categories: string[]
    createdProductId: number;
    onClearForm: () => void
}

const SuccessCreatedMessage = ({categories,createdProductId, onClearForm}:SuccessCreatedMessageProps) => {
     const router = useRouter();
  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg w-full max-w-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-lime-400 font-medium">Product created successfully!</p>
                </div>
                <div className="flex gap-2">
                    <button
                    onClick={()=>router.push(`/catalog/${categories[0]}/${createdProductId}`)}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-purple-400 text-sm cursor-pointer"
                    >
                        View
                    </button>
                    <button
                    onClick={onClearForm}
                    className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-500 text-sm cursor-pointer"
                    >
                        Add another
                    </button>
                </div>
            </div>
        </div>
  )
}

export default SuccessCreatedMessage