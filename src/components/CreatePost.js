import React, { useState, useRef } from "react";
import { usePosts } from "../context/PostContext";

const CreatePost = () => {
  const { addPost, currentUser } = usePosts();
  const [postContent, setPostContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim() && !mediaFile) return;

    try {
      setIsSubmitting(true);

      // In a real app, you would upload the media file to a server here
      // and get back a URL. For this demo, we'll create a temporary URL
      const mediaUrl = mediaFile ? URL.createObjectURL(mediaFile) : null;

      await addPost(postContent, mediaUrl);

      // Reset form
      setPostContent("");
      setMediaPreview(null);
      setMediaFile(null);
      setIsExpanded(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setMediaPreview(e.target.result);
      reader.readAsDataURL(file);
      setMediaFile(file);
    } else {
      alert("Please select an image file");
    }
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setMediaFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {currentUser?.name?.charAt(0) || "?"}
              </div>
            )}
          </div>

          {/* Post Input Area */}
          <div className="flex-grow">
            <textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => {
                setPostContent(e.target.value);
                if (!isExpanded && e.target.value) {
                  setIsExpanded(true);
                }
              }}
              onClick={() => setIsExpanded(true)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={isExpanded ? 4 : 2}
            />

            {/* Media Preview */}
            {mediaPreview && (
              <div className="relative mt-2">
                <img
                  src={mediaPreview}
                  alt="Post preview"
                  className="max-h-60 rounded-lg object-contain bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleRemoveMedia}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-1 hover:bg-opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="88" y="88" width="80" height="80" rx="12"/></svg>
                </button>
              </div>
            )}

            {/* Action Buttons */}
            {isExpanded && (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex space-x-2">
                  {/* Add Photo */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M128,128V24a64,64,0,0,1,50,104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,128H24A64,64,0,0,1,128,78" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,128V232A64,64,0,0,1,78,128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,128H232a64,64,0,0,1-104,50" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span>Photo</span>
                  </button>

                  {/* Add Emoji */}
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M168,152c-8.3,14.35-22.23,24-40,24s-31.7-9.65-40-24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="92" cy="108" r="16"/><circle cx="164" cy="108" r="16"/></svg>
                    <span>Emoji</span>
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      setPostContent("");
                      setMediaPreview(null);
                      setMediaFile(null);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || (!postContent.trim() && !mediaFile)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;