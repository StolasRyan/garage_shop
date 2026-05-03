import ScrollToTopButton from "@/app/components/ScrollToTopButton";
import BlogSearch from "./_components/BlogSearch";
import BlogShareButtons from "./_components/BlogShareButtons";


export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
            <BlogSearch/>
            </div>
            {children}
            <BlogShareButtons/>
            <ScrollToTopButton appearPosition={300}/>
        </div>
    )
}