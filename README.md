# RAWG App - Web App Project with Next.js 15, TypeScript, Tailwind CSS, and Social Login using Google OAuth

This project displays a list of top games, stores, and creators. It allows users to explore the games they are known for, and follow them for updates.

## Features

### 1. SEO Optimization
- Implemented SEO best practices by adding relevant meta tags such as title, description, and keywords for improved search engine visibility.
- Added Open Graph tags for better social media sharing compatibility.
- Optimized the app for search engines with robots meta tags (index, follow).

### 2. Responsive Design
- The application is fully responsive, adapting seamlessly across devices, from desktop to mobile views.
- Tailwind CSS was used to ensure a mobile-first approach with media queries for various screen sizes.

### 3. Google Login Integration
- Implemented social login using Google OAuth, allowing users to sign in easily via their Google account.

### 4. Diamond Management Feature
- Implemented a Diamond Management System using React Context API, enabling users to collect diamonds.
- The diamond count is saved to and retrieved from localStorage, ensuring persistence across sessions.
- Added a "Get Diamond" button and diamond count badge, enhancing user engagement and interactivity.

### 5. Hosting Setup
- The application can now be hosted on a server using the `server.js` file, making it ready for deployment.

### 6. Lighthouse Score
- The app has been optimized for performance, with a Lighthouse score of 90%, which reflects good performance, accessibility, and SEO optimization.

### 7. Infinite Scrolling
- The list of creators supports infinite scrolling, automatically loading more data as the user scrolls down the page.


## Installation and Project Setup

### Prerequisites:

- Node.js (version 20 or higher)
- npm or yarn
- A [Google Cloud](https://cloud.google.com/) account with OAuth credentials set up.

### Clone the repository:

```bash
$ git clone https://github.com/sitaramxcube/rawg.git
$ cd rawg
```

### Configure Environment Variables:

Create a `.env.local` file in the root of your project and add the following environment variables.

```plaintext
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_next_auth_secret
```

### Install the dependencies:
Installs the required node modules to run the application.


```bash
npm install
```

### Run the Application:

Runs the app in the development mode.

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build the Application:
```bash
npm run build
```
### Run the Production build:
```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Page Routes

### `/`
- Displays a grid view of games.
- Includes lazy loading for improved performance.

### `/games/[slug]`
- Dynamic route(SSR Page) for individual game details.
- Fetches and displays detailed information about a game.

### `/creators`
- SSR page with list of game creators and relevant details.
- Provides insights into the creators behind games.

### `/stores`
- Lists game stores with relevant details.
- while clicking on popular items, it will redirect to the game details.

## Assumptions during development
- Based on requirements, need to show the games page, game details page, stores page and creators page.
- To maintain the diamonds count in local storage, I have implemented using context instead of Redux state management, because as per the current requirement, only one variable(diamonds) value has to be persisted in local storage.

##  To be implemented:
- Performance can be improved further till 100%. It is above 90% on an average currently.
- Error handling - Implement proper logging for server-side errors using tools like Sentry or LogRocket.
- Google or any relevant Analytics tool need to be integrated.
- UI/UX improvements if needed.
