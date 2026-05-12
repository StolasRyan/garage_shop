import { acceptRules, checkRulesAccepted } from "@/actions/acceptRules";
import { CommentFormProps, UserRole } from "@/app/(blog)/blog/types";
import { useAuthStore } from "@/store/authStore";
import { AlertCircle, Loader2, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import RulesModal from "./RulesModal";

const CommentsForm = ({
  articleId,
  parentId,
  onSuccess,
  placeholder = "Leave a comment...",
}: CommentFormProps) => {
  const { user } = useAuthStore();
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = user?.id || user?._id;
  const userName = `${user?.name} ${user?.surname}`;
  const userRole = (user?.role as UserRole) || "user";

  useEffect(()=>{
    async function checkRules(){
        if(userId){
            const accepted = await checkRulesAccepted(userId);
            setRulesAccepted(accepted);
        }
        setLoading(false)
    }
    checkRules()
  },[userId]);

  const handleAcceptRules = async ()=>{
    if(!userId) return;

    const result = await acceptRules(userId);
    if(result.success){
        setRulesAccepted(true);
        setShowRulesModal(false);
    }else{
        setError("Failed to accept rules. Please try again.");
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId || !userName) {
      setError("You must be logged in to leave a comment");
      return;
    }
    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    if(!rulesAccepted){
        setShowRulesModal(true);
        return
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          parentId,
          content: content.trim(),
          authorId: userId,
          authorName: userName,
          authorRole: userRole,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit comment");
      }

      const newComment = await response.json();
      onSuccess(newComment);
      setContent("");
    } catch (error) {
      console.error("Error submitting comment", error);
      setError(
        error instanceof Error ? error.message : "Failed to submit comment",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!userId) {
    return (
      <div className="text-center py-4 text-gray-600">
        <Link
          href="/login"
          className="text-lime-600 hover:text-lime-800 font-medium"
        >
          Login
        </Link>{" "}
        to leave comment
      </div>
    );
  }

    if (loading) {
      return <div className="text-center py-4 text-gray-600">Loading...</div>;
    }

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm  text-red-700">
          {error}
        </div>
      )}
      {!rulesAccepted &&(
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-700">
            <p className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4"/>
                To leave a comment, you must accept our{' '}
                <button
                type="button"
                onClick={()=>setShowRulesModal(true)}
                className="text-green-600 hover:text-green-800 font-medium cursor-pointer underline"
                >
                    rules
                </button>
            </p>
        </div>
      )}
      {rulesAccepted && (
        <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-700 ">
            <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4"/>
                Rules accepted. Thank you!
            </p>
        </div>
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none transition-all resize-none"
        rows={3}
        maxLength={2000}
        disabled={submitting}
      />
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {content.length} / 2000 characters
        </div>
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="px-6 py-2 bg-lime-600 text-white rounded hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer duration-300 flex items-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send
            </>
          )}
        </button>
      </div>
    </form>
    <RulesModal
    isOpen={showRulesModal}
    onClose={() => setShowRulesModal(false)}
    onAccept={handleAcceptRules}
    />
    </>
    
  );
};

export default CommentsForm;
