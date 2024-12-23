# RAWG App - Web App Project with Next.js 15, TypeScript, Tailwind CSS, and Google Authentication

# Creators List - Top Game Creators & Influencers

This project displays a list of top game creators and influencers. It allows users to explore their profiles, the games they are known for, and follow them for updates. The app supports infinite scrolling to load more creators dynamically.

## Features

- Display a list of creators with their images, positions, and games they are known for.
- Infinite scrolling to load more creators as the user scrolls.
- Option to follow a creator and add them to a "Diamond" collection.
- SEO optimized with meta tags for better search engine visibility.
- Social login functionality (if implemented in your project).
- Dynamic game links for each creator's associated games.

## Tech Stack

- **Frontend**: React.js, Next.js, Tailwind CSS
- **API calls**: Axios
- **State Management**: React's `useState` and `useEffect`
- **SEO**: Open Graph tags, meta description, and keywords for better SEO performance.

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Routes

### `/`
- Displays a grid view of games.
- Includes lazy loading for improved performance.

### `/games/[slug]`
- Dynamic route for individual game details.
- Fetches and displays detailed information about a game.

### `/creators`
- Lists game creators with relevant details.
- Provides insights into the creators behind games.
