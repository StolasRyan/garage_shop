import { Home } from "lucide-react";
import Link from "next/link";


export default function UnsubscribeError(){
    return(
        <div className="max-w-md mx-auto p-6 text-center mt-20">
            <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <h1 className="text-2xl font-bold mb-2"> 
                    Unsubscribe Failed
                </h1>
                <p>
                    Maybe unsubscribe link is old or you are alredy unsubscribed.
                </p>
            </div>
            <Link
            href={`/`}
            className="text-gray-600 underline hover:text-blue-600 flex flex-row"
            >
                <Home className="w-4 h-4"/> 
                Back to main page
            </Link>
        </div>
    )
}