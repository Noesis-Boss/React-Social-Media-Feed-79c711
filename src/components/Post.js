import React, { useState } from "react";
import Comment from "./Comment";
import useInteractions from "../hooks/useInteractions";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);

  const {
    handleLikePost,
    handleCommentSubmit,
    handleSharePost,
    commentText,
    setCommentText,
    isCommenting,
    setIsCommenting,
    shareModalOpen,
    setShareModalOpen,
    interactionLoading,
    getLikeStatusDisplay,
    formatCount,
    currentUser
  } = useInteractions();

  // Format timestamp
  const formattedDate = new Date(post.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  // Handle long content
  const MAX_CONTENT_LENGTH = 280;
  const isLongContent = post.content.length > MAX_CONTENT_LENGTH;
  const displayContent = showAllContent ? post.content : post.content.slice(0, MAX_CONTENT_LENGTH);

  const { iconFilled, textClass, buttonClass } = getLikeStatusDisplay(post.id);

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {post.user?.avatar ? (
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-blue-500 flex items-center justify-center text-white rounded-full">
                {post.user?.name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">{post.user?.name}</h3>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
        
        {/* Post Options Menu */}
        {post.userId === currentUser?.id && (
          <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="60" r="16"/><circle cx="128" cy="128" r="16"/><circle cx="128" cy="196" r="16"/></svg>
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 whitespace-pre-line">
          {displayContent}
          {isLongContent && !showAllContent && "..."}
        </p>
        {isLongContent && (
          <button
            onClick={() => setShowAllContent(!showAllContent)}
            className="text-blue-600 text-sm mt-1 hover:underline"
          >
            {showAllContent ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Post Media */}
      {post.media && (
        <div className="mt-2">
          <img
            src={post.media}
            alt="Post content"
            className="w-full object-cover max-h-96"
          />
        </div>
      )}

      {/* Interaction Stats */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex space-x-4">
            <span>{formatCount(post.likes)} likes</span>
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:underline"
            >
              {formatCount(post.comments.length)} comments
            </button>
          </div>
          <span>{formatCount(post.shares)} shares</span>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex items-center justify-around px-4 py-2 border-t border-gray-100">
        <button
          onClick={() => handleLikePost(post.id)}
          disabled={interactionLoading.liking}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${buttonClass} hover:bg-gray-50 ${textClass}`}
        >
          {iconFilled ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="24" x2="176" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="80" y1="24" x2="80" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,120a24,24,0,0,1,48,0c0,32-48,56-48,56s-48-24-48-56a24,24,0,0,1,48,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,80c6.84-16.71,21.81-27.67,40-31.08" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,57.09A54,54,0,0,1,231.67,96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M223.3,136c-5.8,11.65-14.05,22.63-23.3,32.63" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M168,197.49A328.1,328.1,0,0,1,128,224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          )}
          <span>Like</span>
        </button>

        <button
          onClick={() => setIsCommenting(!isCommenting)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="128" y1="88" x2="96" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M66.7,152A80,80,0,1,1,216,112c0,44.18-32,72-64,72s-41.63-21.07-41.63-21.07" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          <span>Comment</span>
        </button>

        <button
          onClick={() => setShareModalOpen(!shareModalOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="176 152 224 104 176 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="192 216 32 216 32 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M72,176a96,96,0,0,1,93-72h59" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          <span>Share</span>
        </button>
      </div>

      {/* Comment Input */}
      {isCommenting && (
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {currentUser?.name?.charAt(0) || "?"}
                </div>
              )}
            </div>
            <div className="flex-grow">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentSubmit(post.id);
                }}
              >
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="2"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCommenting(false);
                      setCommentText("");
                    }}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!commentText.trim() || interactionLoading.commenting}
                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      {showComments && post.comments.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100">
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={post.id} />
          ))}
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share Post</h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="88" y="88" width="80" height="80" rx="12"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleSharePost(post.id)}
                disabled={interactionLoading.sharing}
                className="w-full flex items-center justify-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M168,88H152a24,24,0,0,0-24,24V224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="144" x2="160" y2="144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span>Share to Timeline</span>
              </button>
              {/* Add more share options as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
