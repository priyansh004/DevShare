# DevShare 🚀

**DevShare** is a modern social platform built for developers to discover, share, and curate high-quality learning resources. Whether it's the latest JavaScript framework tutorial, a hidden gem GitHub repository, or an insightful tech article, DevShare provides a focused stream of knowledge for the coding community.

It’s designed to feel like your favorite social media feed—fast, infinite, and interactive—but 100% focused on developer growth.

---

## ✨ Key Features

### 🔍 Discovery & Feed
- **Infinite Scroll**: A seamless, high-performance feed that loads more content as you scroll. Powered by `SWR` and `IntersectionObserver`.
- **Smart Formatting**: Automatically fetches and displays Open Graph metadata (images, titles, descriptions) for any link you share.
- **Advanced Filtering**: Instantly filter resources by type (Video, Article, Course, etc.) or sort by Newest/Oldest.
- **Search**: Real-time search by title, description, or author.

### 🤝 Social Interactions
- **Sharing**: One-click copy-to-clipboard functionality to share resources externally.
- **User Profiles**: A dedicated profile page showing your stats and all the resources you've shared.
- **Trending Sidebar**: A "What's Happening" widget that pulls live trending content from Reddit's r/popular.

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with a bottom navigation bar for small screens and a robust sidebar for desktop.
- **Premium Aesthetics**: Built with **Tailwind CSS v4**, featuring glassmorphism, subtle gradients, and a clean, clutter-free layout.
- **Animations**: Smooth transitions and loading skeletons for a polished feel.

### 🛡️ Secure & Scalable
- **Authentication**: Secure Google Sign-In powered by **NextAuth.js**.
- **Database**: High-performance MongoDB backend.
- **Type Safety**: Full TypeScript integration from database to UI.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Forms**: React Hook Form + Zod
- **Icons**: Heroicons

---

## 🚀 Getting Started

Follow these steps to run DevShare locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/devshare.git
cd devshare
```

### 2. Install dependencies
```bash
pnpm install
# or npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your credentials:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:
```env
# App URL
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here

# OAuth Providers (Google Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devshare
```

### 4. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

---

## 📖 Usage Guide

### Seeding Dummy Data (Developer Mode)
Want to see the feed in action without manually posting 100 links? We've built a seeding tool just for you.
1. Sign in to the app.
2. Visit **`http://localhost:3000/api/seed`** in your browser.
3. This will instantly generate **100 diverse resources** (React, Rust, AWS, etc.) assigned to your account.
4. Go back to the dashboard and enjoy the infinite scroll!

### Posting a Resource
- Click the **"Post"** button in the sidebar (or bottom bar on mobile).
- Paste a link. The app will validate it.
- Choose a type (Video, Article, etc.).
- Add a title and description (or let the global metadata fill it in mentally... actually you perform the typing!).
- Hit "Post Resource".

### Editing & Deleting
- You can manage your own resources directly from the feed or your profile.
- Look for the options button or edit icon on cards you own.

---

*Built with ❤️ by Developer, for Developers.*
