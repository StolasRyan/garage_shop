interface LoaderProps {
  text?: string;
  className?: string;
}
 
export const Loader = ({ text = "", className = "" }: LoaderProps) => (
  <div className={`flex flex-col items-center justify-center gap-3 min-h-20 ${className}`}>
    <div className="relative w-12 h-12">
      <div className="w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin absolute"></div>
      <div className="w-full h-full border-4 border-primary border-b-transparent rounded-full animate-spin-reverse absolute"></div>
    </div>
    {text && <p className="text-(--color-primary)">Loading {text}...</p>}
  </div>
);