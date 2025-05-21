// Sample users data
export const sampleUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTJCcGljdHVyZSUyQm9mJTJCSm9obnxlbnwwfHx8fDE3NDc4NTE5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Frontend developer | Coffee enthusiast | React lover",
    followers: 1234,
    following: 567
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTJCcGljdHVyZSUyQm9mJTJCSmFuZXxlbnwwfHx8fDE3NDc4NTE5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "UX Designer | Travel photographer | Coffee addict",
    followers: 2345,
    following: 432
  },
  {
    id: "user-3",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTJCcGljdHVyZSUyQm9mJTJCTWlrZXxlbnwwfHx8fDE3NDc4NTE5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Product Manager | Tech enthusiast | Gamer",
    followers: 876,
    following: 654
  },
  {
    id: "user-4",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTJCcGljdHVyZSUyQm9mJTJCU2FyYWh8ZW58MHx8fHwxNzQ3ODUxOTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Digital artist | Cat lover | Netflix binger",
    followers: 3456,
    following: 234
  }
];

// Sample posts data
export const samplePosts = [
  {
    id: "post-1",
    userId: "user-2",
    content: "Just finished my latest UI design project! What do you think about this new dashboard layout? #uidesign #userexperience",
    media: "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMkJkYXNoYm9hcmQlMkJVSSUyQmRlc2lnbnxlbnwwfHx8fDE3NDc4NTE5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    timestamp: "2023-11-15T09:23:00Z",
    likes: 342,
    likedBy: ["user-1", "user-3", "user-4"],
    comments: [
      {
        id: "comment-1",
        userId: "user-1",
        text: "This looks amazing! Love the color scheme.",
        timestamp: "2023-11-15T09:25:00Z",
        user: sampleUsers.find(u => u.id === "user-1")
      },
      {
        id: "comment-2",
        userId: "user-4",
        text: "The layout is so clean and intuitive. Great work! 👏",
        timestamp: "2023-11-15T09:30:00Z",
        user: sampleUsers.find(u => u.id === "user-4")
      }
    ],
    shares: 56,
    user: sampleUsers.find(u => u.id === "user-2")
  },
  {
    id: "post-2",
    userId: "user-1",
    content: "Just discovered this amazing new React hook that simplifies state management. Who wants to see a tutorial about it? 🚀 #reactjs #webdev",
    timestamp: "2023-11-15T08:15:00Z",
    likes: 234,
    likedBy: ["user-2", "user-3"],
    comments: [
      {
        id: "comment-3",
        userId: "user-3",
        text: "Yes please! Would love to learn more about it.",
        timestamp: "2023-11-15T08:20:00Z",
        user: sampleUsers.find(u => u.id === "user-3")
      }
    ],
    shares: 28,
    user: sampleUsers.find(u => u.id === "user-1")
  },
  {
    id: "post-3",
    userId: "user-4",
    content: "Check out my latest digital art piece! Created this using Procreate. Let me know what you think! 🎨 #digitalart #illustration",
    media: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyQmRpZ2l0YWwlMkJpbGx1c3RyYXRpb258ZW58MHx8fHwxNzQ3ODUxOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    timestamp: "2023-11-15T07:45:00Z",
    likes: 567,
    likedBy: ["user-1", "user-2"],
    comments: [
      {
        id: "comment-4",
        userId: "user-2",
        text: "The colors are stunning! What brushes did you use?",
        timestamp: "2023-11-15T07:50:00Z",
        user: sampleUsers.find(u => u.id === "user-2")
      }
    ],
    shares: 89,
    user: sampleUsers.find(u => u.id === "user-4")
  },
  {
    id: "post-4",
    userId: "user-3",
    content: "Excited to announce that our product just hit 1 million users! 🎉 Thanks to everyone who has been part of this journey. #milestone #startup",
    timestamp: "2023-11-15T06:30:00Z",
    likes: 892,
    likedBy: ["user-1", "user-2", "user-4"],
    comments: [
      {
        id: "comment-5",
        userId: "user-1",
        text: "Congratulations! Well deserved! 🎉",
        timestamp: "2023-11-15T06:35:00Z",
        user: sampleUsers.find(u => u.id === "user-1")
      },
      {
        id: "comment-6",
        userId: "user-2",
        text: "This is huge! Can't wait to see what's next!",
        timestamp: "2023-11-15T06:40:00Z",
        user: sampleUsers.find(u => u.id === "user-2")
      }
    ],
    shares: 145,
    user: sampleUsers.find(u => u.id === "user-3")
  },
  {
    id: "post-5",
    userId: "user-1",
    content: "Beautiful morning coding session at my favorite coffee shop! ☕️ #coding #coffeetime",
    media: "https://images.unsplash.com/photo-1501492673258-2bcfc17241fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMkJhbmQlMkJjb2ZmZWUlMkJjdXAlMkJvbiUyQndvb2RlbiUyQnRhYmxlfGVufDB8fHx8MTc0Nzg1MTk0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    timestamp: "2023-11-15T05:15:00Z",
    likes: 423,
    likedBy: ["user-2", "user-4"],
    comments: [
      {
        id: "comment-7",
        userId: "user-4",
        text: "That's my kind of morning! Which coffee shop is this?",
        timestamp: "2023-11-15T05:20:00Z",
        user: sampleUsers.find(u => u.id === "user-4")
      }
    ],
    shares: 34,
    user: sampleUsers.find(u => u.id === "user-1")
  }
];