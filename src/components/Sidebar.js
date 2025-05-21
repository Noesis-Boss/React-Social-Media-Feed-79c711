import React from "react";
import { usePosts } from "../context/PostContext";

const Sidebar = () => {
  const { currentUser } = usePosts();
  
  // Sample navigation items
  const navItems = [
    { id: 1, name: "Home", icon: "home" },
    { id: 2, name: "Profile", icon: "user" },
    { id: 3, name: "Messages", icon: "message" },
    { id: 4, name: "Notifications", icon: "bell" },
    { id: 5, name: "Bookmarks", icon: "bookmark" },
    { id: 6, name: "Settings", icon: "settings" },
  ];
  
  // Sample friend suggestions
  const friendSuggestions = [
    {
      id: "user-5",
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTJCcGljdHVyZSUyQm9mJTJCRW1tYXxlbnwwfHx8fDE3NDc4NTE1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      mutualFriends: 4
    },
    {
      id: "user-6",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTJCcGljdHVyZSUyQm9mJTJCQWxleHxlbnwwfHx8fDE3NDc4NTE1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      mutualFriends: 2
    },
    {
      id: "user-7",
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTJCcGljdHVyZSUyQm9mJTJCU29waGlhfGVufDB8fHx8MTc0Nzg1MTU2MXww&ixlib=rb-4.1.0&q=80&w=1080",
      mutualFriends: 7
    }
  ];

  return (
    <div className="w-64 bg-white h-screen sticky top-0 p-4 shadow-md hidden md:block overflow-y-auto">
      {/* User Profile Section */}
      <div className="flex items-center mb-6 p-2 rounded-lg hover:bg-gray-100">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {currentUser && currentUser.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-blue-500 flex items-center justify-center text-white rounded-full">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-800">{currentUser?.name || "User"}</p>
          <p className="text-xs text-gray-500">View your profile</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mb-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.name.toLowerCase()}`}
                className="flex items-center p-3 mb-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-600">
                  {item.icon === "home" && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M96.44,156c2.54,11.35,15.7,20,31.56,20,17.67,0,32-10.75,32-24,0-32-62.22-20-62.22-48,0-13.25,12.55-24,30.22-24,13.25,0,23.63,6,28,14.66" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M214,146.69A48,48,0,0,1,146.69,214,88.07,88.07,0,0,1,42,109.31,48,48,0,0,1,109.31,42,88.07,88.07,0,0,1,214,146.69Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>)}
                  {item.icon === "user" && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>)}
                  {item.icon === "message" && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><polyline points="80 144 112 112 144 144 176 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>)}
                  {item.icon === "bell" && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M208,132v76a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h76" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="196" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>)}
                  {item.icon === "bookmark" && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="192 176 127.99 136 64 176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>)}
                  {item.icon === "settings" && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="200" y2="36" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="180.98" y2="49.82" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="188.24" y2="72.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="211.76" y2="72.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="219.02" y2="49.82" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M222.67,112A95.92,95.92,0,1,1,144,33.33" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>)}
                </span>
                <span className="ml-3 text-gray-700">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Friend Suggestions */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">People you may know</h3>
        <div className="space-y-3">
          {friendSuggestions.map((friend) => (
            <div key={friend.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {friend.avatar ? (
                  <img 
                    src={friend.avatar} 
                    alt={friend.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-purple-500 flex items-center justify-center text-white rounded-full">
                    {friend.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="ml-2 flex-grow">
                <p className="text-sm font-medium">{friend.name}</p>
                <p className="text-xs text-gray-500">{friend.mutualFriends} mutual friends</p>
              </div>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Links */}
      <div className="mt-8 text-xs text-gray-500">
        <div className="flex flex-wrap gap-2">
          <a href="#privacy" className="hover:underline">Privacy</a>
          <span>·</span>
          <a href="#terms" className="hover:underline">Terms</a>
          <span>·</span>
          <a href="#advertising" className="hover:underline">Advertising</a>
          <span>·</span>
          <a href="#cookies" className="hover:underline">Cookies</a>
        </div>
        <p className="mt-2">© 2023 React Social Media</p>
      </div>
    </div>
  );
};

export default Sidebar;