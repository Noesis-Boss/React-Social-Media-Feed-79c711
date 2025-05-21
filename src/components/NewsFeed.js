import React, { useState, useEffect } from "react";
import { usePosts } from "../context/PostContext";
import Post from "./Post";
import CreatePost from "./CreatePost";

const NewsFeed = () => {
  const { posts, isLoading, error } = usePosts();
  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortBy, setSortBy] = useState("recent"); // "recent" or "popular"

  useEffect(() => {
    if (posts) {
      const sorted = [...posts].sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }
        return b.likes - a.likes;
      });
      setSortedPosts(sorted);
    }
  }, [posts, sortBy]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
          <p className="mt-2 text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Create Post Section */}
      <CreatePost />

      {/* Feed Controls */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">News Feed</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSortBy("recent")}
            className={`px-4 py-2 text-sm rounded-full ${
              sortBy === "recent"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`px-4 py-2 text-sm rounded-full ${
              sortBy === "popular"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Most Popular
          </button>
        </div>
      </div>

      {/* Posts List */}
      {isLoading ? (
        // Loading Skeleton
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/5 mt-2"></div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedPosts.length > 0 ? (
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64"><rect width="256" height="256" fill="none"/><circle cx="148" cy="44" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="212" cy="124" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="156" cy="212" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="56" cy="184" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="52" cy="84" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="201.26" y1="140.88" x2="166.74" y2="195.12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160.49" y1="59.62" x2="199.51" y2="108.38" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="70.47" y1="76.31" x2="129.53" y2="51.69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="192.02" y1="124.95" x2="128" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="128" x2="143.37" y2="63.46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="69.31" y1="94.02" x2="128" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="128" x2="149.67" y2="193.02" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="136.74" y1="206.61" x2="75.26" y2="189.39" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="71.79" y1="171.72" x2="128" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="55.2" y1="164.02" x2="52.8" y2="103.98" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No Posts Yet</h3>
          <p className="mt-2 text-gray-500">
            Be the first to share something with your network!
          </p>
          <button 
            onClick={() => document.querySelector("[data-testid='create-post']")?.focus()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Create a Post
          </button>
        </div>
      )}

      {/* Load More Button */}
      {sortedPosts.length >= 10 && (
        <div className="mt-6 text-center">
          <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;