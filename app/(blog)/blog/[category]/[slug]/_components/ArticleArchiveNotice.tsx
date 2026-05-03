import { AlertCircle, Clock } from "lucide-react";

const ArticleArchiveNotice = ({
  message = "Article is archived. Information can be not actual",
  className = "",
  updatedAt = "Unknown",
}: {
  message?: string;
  className?: string;
  updatedAt?: string;
}) => {
  return (
    <div
      className={`flex items-start gap-x-3 mb-4 p-3 rounded text-sm bg-yellow-50 border border-yellow-200 text-yellow-600 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <div>
        <p className="mt-1">{message}</p>
        <div className="flex items-center gap-x-2 mt-2 text-sm opacity-75">
          <Clock className="w-3 h-3" />
          <span>
            Last update:{" "}
            {updatedAt
              ? new Date(updatedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : "unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleArchiveNotice;
