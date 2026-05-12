import { CommentItemProps, UserRole } from "@/app/(blog)/blog/types";
import { useEffect, useState } from "react";
import CommentHeader from "./CommentHeader";
import { useAuthStore } from "@/store/authStore";
import { getDeleteButtonTitle } from "../../../../utils/getDeleteButtonTitle";
import CommentEditForm from "./CommentEditForm";
import CommentActions from "./CommentActions";
import CommentsForm from "./CommentsForm";
import CommentReplies from "./CommentReplies";

const CommentItem = ({ articleId, comment, onCommentChange, depth}: CommentItemProps) => {
  const { user } = useAuthStore();
  const currentUserId = user?.id || user?._id;
  const currentUserRole = (user?.role as UserRole) || "user";

  const [currentContent, setCurrentContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(
    currentUserId ? comment.likes.includes(currentUserId) : false,
  );
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const [liking, setLiking] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    setCurrentContent(comment.content);
    setIsLiked(currentUserId ? comment.likes.includes(currentUserId) : false);
  }, [comment.content, comment.likes, currentUserId]);

  const isAdminOrManager =
    currentUserRole === "admin" || currentUserRole === "manager";

  const canDelete =
    Boolean(currentUserId && currentUserId === comment.authorId) ||
    isAdminOrManager;
  const canEdit = currentUserId === comment.authorId;
  const canReply = depth < 3;

  const handleDelete = async () => {
    if (!canDelete || deleting) return;
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      setDeleting(true);
      const response = await fetch(`/api/comments/${comment._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onCommentChange();
      }
    } catch (error) {
      console.error("Error deleting comment", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleEditSuccess = (newContent: string, editedAt: string) => {
    setCurrentContent(newContent);
    comment.content = newContent;
    comment.isEdited = true;
    comment.editedAt = editedAt;
    setIsEditing(false);
  };

  const handleLike = async () => {
    if (!currentUserId || liking) return;
    try {
      setLiking(true);
      const response = await fetch(`/api/comments/${comment._id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likeCount);
        setIsLiked(data.liked);
      }
    } catch (error) {
      console.error("Error liking comment", error);
    } finally {
      setLiking(false);
    }
  };

  const handleReplySuccess = ()=>{
    onCommentChange();
    setShowReplyForm(false);
  }

  return (
    <div
      className={`${depth > 0 ? "ml-4 md:ml-8 pl-4 border-l-2 border-gray-200" : ""}`}
    >
      <div className="bg-white rounded p-4 mb-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ">
        <CommentHeader
          comment={comment}
          canEdit={canEdit}
          canDelete={canDelete}
          isEditing={isEditing}
          deleting={deleting}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
          deleteButtonTitle={getDeleteButtonTitle(
            currentUserId!,
            currentUserRole,
            comment.authorId,
          )}
        />
        <div className="mb-3">
          {isEditing ? (
            <CommentEditForm
              commentId={comment._id}
              initialContent={currentContent}
              userId={currentUserId || ""}
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap wrap-break-word">
              {currentContent}
            </p>
          )}
        </div>
        <CommentActions
          isLiked={isLiked}
          likeCount={likeCount}
          onLike={handleLike}
          liking={liking}
          currentUserId={currentUserId}
          canReply={canReply}
          onReply={() => setShowReplyForm(!showReplyForm)}
        />
      </div>
      {showReplyForm && canReply && (
          <div className="mb-4 ml-4"> 
                <CommentsForm
                articleId={articleId}
                parentId={comment._id}
                onSuccess={handleReplySuccess}
                placeholder={`Reply to ${comment.authorName}...`}
                />
          </div>
      )}
      <CommentReplies
        replies={comment.replies}
        articleId={articleId}
        depth={depth}
        onCommentChange={onCommentChange}
      />
    </div>
  );
};

export default CommentItem;
