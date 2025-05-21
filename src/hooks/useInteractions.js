import { useState, useCallback } from "react";
import { usePosts } from "../context/PostContext";

/**
 * Custom hook for handling post interactions such as liking, commenting, and sharing
 * 
 * @returns {Object} An object containing interaction methods and state
 */
const useInteractions = () => {
  const { 
    toggleLike, 
    addComment, 
    sharePost, 
    hasUserLiked,
    currentUser 
  } = usePosts();
  
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [interactionLoading, setInteractionLoading] = useState({
    liking: false,
    commenting: false,
    sharing: false
  });
  
  /**
   * Handles liking/unliking a post with loading state
   * 
   * @param {string} postId - The ID of the post to like/unlike
   */
  const handleLikePost = useCallback(async (postId) => {
    try {
      setInteractionLoading(prev => ({ ...prev, liking: true }));
      // In a real app, you might want to add some artificial delay
      // to ensure the loading state is visible
      await new Promise(resolve => setTimeout(resolve, 300));
      toggleLike(postId);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setInteractionLoading(prev => ({ ...prev, liking: false }));
    }
  }, [toggleLike]);

  /**
   * Handles submitting a comment on a post
   * 
   * @param {string} postId - The ID of the post to comment on
   * @returns {Object|null} The created comment object or null if submission fails
   */
  const handleCommentSubmit = useCallback(async (postId) => {
    if (!commentText.trim()) return null;
    
    try {
      setInteractionLoading(prev => ({ ...prev, commenting: true }));
      await new Promise(resolve => setTimeout(resolve, 300));
      const newComment = addComment(postId, commentText);
      setCommentText("");
      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
      return null;
    } finally {
      setInteractionLoading(prev => ({ ...prev, commenting: false }));
    }
  }, [addComment, commentText]);

  /**
   * Handles sharing a post
   * 
   * @param {string} postId - The ID of the post to share
   * @param {string} [shareText] - Optional text to include with the share
   */
  const handleSharePost = useCallback(async (postId, shareText = "") => {
    try {
      setInteractionLoading(prev => ({ ...prev, sharing: true }));
      await new Promise(resolve => setTimeout(resolve, 300));
      sharePost(postId);
      setShareModalOpen(false);
      
      // In a real app, you might want to show a toast notification here
      console.log(`Post ${postId} shared${shareText ? " with text: " + shareText : ""}`);
    } catch (error) {
      console.error("Error sharing post:", error);
    } finally {
      setInteractionLoading(prev => ({ ...prev, sharing: false }));
    }
  }, [sharePost]);

  /**
   * Gets the appropriate icon class for like button based on liked status
   * 
   * @param {string} postId - The ID of the post
   * @returns {Object} Object containing icon class and text color class
   */
  const getLikeStatusDisplay = useCallback((postId) => {
    const isLiked = hasUserLiked(postId);
    
    return {
      iconFilled: isLiked,
      textClass: isLiked ? "text-blue-600" : "text-gray-600",
      buttonClass: isLiked ? "bg-blue-50" : ""
    };
  }, [hasUserLiked]);

  /**
   * Formats interaction counts for display (e.g., "1.2K" instead of "1200")
   * 
   * @param {number} count - The raw count number
   * @returns {string} The formatted count for display
   */
  const formatCount = useCallback((count) => {
    if (count === 0) return "0";
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K`;
    return `${(count / 1000000).toFixed(count % 1000000 === 0 ? 0 : 1)}M`;
  }, []);

  return {
    // State
    commentText,
    isCommenting,
    shareModalOpen,
    interactionLoading,
    currentUser,
    
    // Setters
    setCommentText,
    setIsCommenting,
    setShareModalOpen,
    
    // Action handlers
    handleLikePost,
    handleCommentSubmit,
    handleSharePost,
    
    // Helper functions
    getLikeStatusDisplay,
    formatCount,
    hasUserLiked
  };
};

export default useInteractions;