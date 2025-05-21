import React, { useState } from "react";
import { usePosts } from "../context/PostContext";

const Comment = ({ comment, postId }) => {
  const { currentUser } = usePosts();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  const formattedDate = new Date(comment.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    // In a real app, this would send the reply to an API
    console.log("Reply submitted:", {
      postId,
      parentCommentId: comment.id,
      text: replyText
    });
    
    setReplyText("");
    setIsReplying(false);
  };

  const MAX_COMMENT_LENGTH = 200;
  const isLongComment = comment.text.length > MAX_COMMENT_LENGTH;
  const displayText = showFullText 
    ? comment.text 
    : `${comment.text.slice(0, MAX_COMMENT_LENGTH)}${isLongComment ? "..." : ""}`;

  return (
    <div className="pl-4 border-l-2 border-gray-100 mb-4">
      <div className="flex items-start space-x-3">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          {comment.user?.avatar ? (
            <img
              src={comment.user.avatar}
              alt={`${comment.user.name}'s avatar`}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
              {comment.user?.name?.charAt(0) || "?"}
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-grow">
          <div className="bg-gray-50 rounded-lg px-4 py-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm text-gray-900">
                {comment.user?.name || "Anonymous"}
              </span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
            
            <p className="text-sm text-gray-700">{displayText}</p>
            
            {isLongComment && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="text-blue-600 text-xs mt-1 hover:underline"
              >
                {showFullText ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          {/* Comment Actions */}
          <div className="flex items-center space-x-4 mt-1 ml-1">
            <button 
              className="text-xs text-gray-500 hover:text-blue-600 flex items-center"
              onClick={() => setIsReplying(!isReplying)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="14" height="14"><rect width="256" height="256" fill="none"/><polyline points="80 144 112 112 144 144 176 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-1">Reply</span>
            </button>
            <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="14" height="14"><rect width="256" height="256" fill="none"/><line x1="40" y1="192" x2="112" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="128" x2="96" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M192,144a24,24,0,0,1,48,0c0,32-48,56-48,56s-48-24-48-56a24,24,0,0,1,48,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-1">Like</span>
            </button>
            {comment.user?.id === currentUser?.id && (
              <button className="text-xs text-gray-500 hover:text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="14" height="14"><rect width="256" height="256" fill="none"/><path d="M96.44,156c2.54,11.35,15.7,20,31.56,20,17.67,0,32-10.75,32-24,0-32-62.22-20-62.22-48,0-13.25,12.55-24,30.22-24,13.25,0,23.63,6,28,14.66" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M214,146.69A48,48,0,0,1,146.69,214,88.07,88.07,0,0,1,42,109.31,48,48,0,0,1,109.31,42,88.07,88.07,0,0,1,214,146.69Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-1">Delete</span>
              </button>
            )}
          </div>

          {/* Reply Form */}
          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-3 flex items-start space-x-2">
              <div className="flex-shrink-0">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="Your avatar"
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    {currentUser?.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="2"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsReplying(false);
                      setReplyText("");
                    }}
                    className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;