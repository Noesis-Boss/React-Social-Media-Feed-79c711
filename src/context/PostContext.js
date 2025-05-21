import React, { createContext, useContext, useState, useReducer, useEffect } from "react";
import { samplePosts, sampleUsers } from "../data/sampleData";

// Create the context
const PostContext = createContext();

// Initial state for the reducer
const initialState = {
  posts: [],
  isLoading: true,
  error: null
};

// Actions
const ACTIONS = {
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_ERROR: "FETCH_POSTS_ERROR",
  ADD_POST: "ADD_POST",
  LIKE_POST: "LIKE_POST",
  UNLIKE_POST: "UNLIKE_POST",
  ADD_COMMENT: "ADD_COMMENT",
  SHARE_POST: "SHARE_POST",
  DELETE_POST: "DELETE_POST"
};

// Reducer function to handle state updates
function postReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
        error: null
      };
    case ACTIONS.FETCH_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ACTIONS.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case ACTIONS.LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId 
            ? { 
                ...post, 
                likes: post.likes + 1, 
                likedBy: [...post.likedBy, action.payload.userId] 
              } 
            : post
        )
      };
    case ACTIONS.UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId 
            ? { 
                ...post, 
                likes: post.likes - 1, 
                likedBy: post.likedBy.filter(id => id !== action.payload.userId) 
              } 
            : post
        )
      };
    case ACTIONS.ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId 
            ? { 
                ...post, 
                comments: [...post.comments, action.payload.comment] 
              } 
            : post
        )
      };
    case ACTIONS.SHARE_POST:
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId 
            ? { 
                ...post, 
                shares: post.shares + 1 
              } 
            : post
        )
      };
    case ACTIONS.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    default:
      return state;
  }
}

// Provider component
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [currentUserId] = useState("user-1"); // Removed unused setter

  // Fetch posts (simulating API call with sample data)
  useEffect(() => {
    // Simulate API delay
    const fetchPosts = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        dispatch({ 
          type: ACTIONS.FETCH_POSTS_SUCCESS, 
          payload: samplePosts 
        });
      } catch (error) {
        dispatch({ 
          type: ACTIONS.FETCH_POSTS_ERROR, 
          payload: "Failed to load posts. Please try again." 
        });
      }
    };

    fetchPosts();
  }, []);

  // Add a new post
  const addPost = (content, mediaUrl = null) => {
    const newPost = {
      id: `post-${Date.now()}`,
      userId: currentUserId,
      content: content,
      media: mediaUrl,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: [],
      shares: 0,
      user: sampleUsers.find(user => user.id === currentUserId)
    };
    
    dispatch({
      type: ACTIONS.ADD_POST,
      payload: newPost
    });

    return newPost;
  };

  // Toggle like on a post
  const toggleLike = (postId) => {
    const post = state.posts.find(post => post.id === postId);
    if (!post) return;

    const hasLiked = post.likedBy.includes(currentUserId);
    
    if (hasLiked) {
      dispatch({
        type: ACTIONS.UNLIKE_POST,
        payload: { postId, userId: currentUserId }
      });
    } else {
      dispatch({
        type: ACTIONS.LIKE_POST,
        payload: { postId, userId: currentUserId }
      });
    }
  };

  // Add comment to a post
  const addComment = (postId, text) => {
    if (!text.trim()) return;
    
    const comment = {
      id: `comment-${Date.now()}`,
      userId: currentUserId,
      text,
      timestamp: new Date().toISOString(),
      user: sampleUsers.find(user => user.id === currentUserId)
    };

    dispatch({
      type: ACTIONS.ADD_COMMENT,
      payload: { postId, comment }
    });

    return comment;
  };

  // Share a post
  const sharePost = (postId) => {
    dispatch({
      type: ACTIONS.SHARE_POST,
      payload: { postId }
    });
  };

  // Delete a post
  const deletePost = (postId) => {
    // Check if current user is the post owner (in a real app)
    dispatch({
      type: ACTIONS.DELETE_POST,
      payload: postId
    });
  };

  // Check if user has liked a specific post
  const hasUserLiked = (postId) => {
    const post = state.posts.find(post => post.id === postId);
    return post ? post.likedBy.includes(currentUserId) : false;
  };

  // Value object to be provided to consumers
  const value = {
    posts: state.posts,
    isLoading: state.isLoading,
    error: state.error,
    currentUser: sampleUsers.find(user => user.id === currentUserId),
    addPost,
    toggleLike,
    addComment,
    sharePost,
    deletePost,
    hasUserLiked
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

// Custom hook for using the context
export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};

export default PostContext;
