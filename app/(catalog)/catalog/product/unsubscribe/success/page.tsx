import { Home } from "lucide-react";
import Link from "next/link";


export default function UnsubscribeSuccess(){
    return(
        <div className="max-w-md mx-auto p-6 text-center mt-20">
            <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <h1 className="text-2xl font-bold mb-2"> 
                    Unsubscribe completed
                </h1>
                <p>
                    You are successfully unsubscribed from coast checking.
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