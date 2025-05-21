import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NewsFeed from "./components/NewsFeed";
import Sidebar from "./components/Sidebar";
import { PostProvider } from "./context/PostContext";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulate initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle window resize to close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLoaded) {
    // Loading state
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64" className="text-blue-500 animate-pulse">
              <rect width="256" height="256" fill="none"/>
              <path d="M88,176S32.85,144,40.78,56c0,0,39.66,40,87.22,48V88c0-22,18-40.27,40-40a40.74,40.74,0,0,1,36.67,24H240l-32,32c-4.26,66.84-60.08,120-128,120-32,0-40-12-40-12S72,200,88,176Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Loading SocialApp...</h2>
        </div>
      </div>
    );
  }

  return (
    <PostProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <Header />

        {/* Mobile Menu Toggle (visible on small screens) */}
        <div className="fixed bottom-4 right-4 md:hidden z-40">
          <button
            onClick={toggleMobileMenu}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="88" y="88" width="80" height="80" rx="12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M40,156H76.69a8,8,0,0,1,5.65,2.34l19.32,19.32a8,8,0,0,0,5.65,2.34h41.38a8,8,0,0,0,5.65-2.34l19.32-19.32a8,8,0,0,1,5.65-2.34H216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="76" x2="128" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 108 128 140 160 108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            )}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="pt-16 pb-8 md:flex">
          {/* Sidebar (always visible on md and larger screens) */}
          <div className={`fixed inset-0 z-30 md:static md:z-auto md:h-auto md:w-auto
                          ${isMobileMenuOpen ? "block" : "hidden md:block"}`}>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
              onClick={toggleMobileMenu}
            ></div>
            <div className="fixed bottom-0 left-0 right-0 top-16 w-64 bg-white transform md:relative md:translate-x-0 z-40">
              <Sidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <main className="max-w-7xl mx-auto">
              <NewsFeed />
            </main>
          </div>
          
          {/* Right Sidebar placeholder - Not implemented in the current version */}
          {/* This could contain things like trending topics, ads, etc. */}
          <div className="hidden lg:block w-64 p-4">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-3">Trending Topics</h3>
              <div className="space-y-3">
                {["#ReactJS", "#WebDevelopment", "#SocialMedia", "#TechNews", "#Programming"].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-blue-600 hover:underline cursor-pointer">{topic}</span>
                    <span className="text-xs text-gray-500">{Math.floor(Math.random() * 10) + 1}K posts</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-medium text-gray-900 mb-2">Sponsored</h3>
              <div className="aspect-video bg-gray-200 rounded-lg mb-2">
                <img 
                  src="https://images.unsplash.com/photo-1559613671-dfe2fb6a7680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxhZHZlcnRpc2VtZW50JTJCaW1hZ2V8ZW58MHx8fHwxNzQ3ODUxODc2fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Advertisement for sponsored content"
                />
              </div>
              <p className="text-sm text-gray-700">
                Discover amazing products that match your interests!
              </p>
              <button className="mt-2 text-sm text-blue-600 hover:underline">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Footer - Only on larger screens */}
        <footer className="hidden md:block bg-white py-4 border-t">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} React Social Media App</p>
            </div>
            <div className="mt-2 md:mt-0 flex flex-wrap gap-4 text-sm text-gray-500">
              <a href="#terms" className="hover:text-gray-700">Terms</a>
              <a href="#privacy" className="hover:text-gray-700">Privacy</a>
              <a href="#cookies" className="hover:text-gray-700">Cookies</a>
              <a href="#about" className="hover:text-gray-700">About</a>
              <a href="#help" className="hover:text-gray-700">Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    </PostProvider>
  );
};

export default App;
