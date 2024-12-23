"use client";
import { useCallback, useEffect, useState } from "react";
import { httpService } from "../api-services/httpService";
import { API_REQUESTS } from "../api-services/apiRequests";
import Skeleton from "./common/Skeleton";
import Link from 'next/link';
import GetDiamond from "./common/GetDiamond";
import MetaHead from "./MetaHead";

// Define TypeScript interfaces for Creator, Positions, and Games data
interface ICreator {
  id: number;
  name: string;
  image: string;
  image_background: string;
  positions: IPositions[];
  games: IGames[];
}

interface IPositions {
  name: string;
}

interface IGames {
  id: number;
  name: string;
  slug: string;
  added: number;
}

const Creators = () => {
  // State to store creator data, loading status, and pagination URL
  const [creators, setCreators] = useState<ICreator[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState('');

  // Fetch initial list of creators when the component mounts
  useEffect(() => {
    getCreators();
  }, []);

  // Callback to handle infinite scrolling logic
  const handleScroll = useCallback(() => {
    const bottom = document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight;
    if (bottom && nextPageUrl) {
      getCreators(true); // Load more creators when reaching the bottom
    }
  }, [nextPageUrl]);

  // Attach and detach the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Function to fetch creators data (supports pagination)
  const getCreators = async (isScrollToBottom?: boolean) => {
    setLoading(true); // Show loading indicator
    try {
      const data = await httpService(isScrollToBottom ? nextPageUrl : API_REQUESTS.GET_CREATORS); // Fetch data
      if (data?.results) {
        setCreators((prevCreators: ICreator[]) => [...prevCreators, ...data.results]); // Append new creators to the list
        setNextPageUrl(data?.next); // Update next page URL
      } else {
        console.error("No creators found"); // Handle case when no creators are returned
      }
    } catch (error) {
      console.error(error); // Log any errors
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="p-5">
      {/* MetaHead component to define metadata for SEO */}
      <MetaHead
        title="Creators List - Top Game Creators & Influencers"
        description="Explore top game creators and influencers who have contributed to popular gaming content."
        keywords="game creators, game influencers, gaming content, popular creators, top game influencers"
        ogTitle="Top Game Creators"
        ogDescription="Discover the best game creators and influencers, their content, and the games they are known for."
      />

      {/* Header section with a title and diamond component */}
      <div className="flex justify-between items-center p-10">
        <h2 className="text-xl font-bold text-gray-800">Creators</h2>
        <GetDiamond />
      </div>

      {/* Main content: Conditional rendering based on data and loading state */}
      {loading && creators.length === 0 ? (
        <Skeleton numberOfGrids={8} /> // Show skeleton loader while loading initial data
      ) : creators.length > 0 ? (
        // Grid layout to display creators
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {creators.map((creator: ICreator, index: number) => (
            <div
              key={`${creator.id}-${index}`}
              className="w-full md:w-70 bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              style={{
                backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${creator.image_background})`,
              }}
            >
              <div className="p-5">
                {/* Creator profile and details */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-gray-700"
                    style={{ backgroundImage: `url(${creator.image})` }}
                  />
                  <h2 className="mt-4 text-xl font-bold text-white">{creator.name}</h2>
                  <p className="text-gray-400 mt-1 capitalize">
                    {creator.positions.map((pos: IPositions) => pos.name).join(', ')}
                  </p>
                </div>
                {/* Follow button */}
                <div className="flex justify-center">
                  <button
                    className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Follow
                  </button>
                </div>
                {/* Games the creator is known for */}
                <div className="mt-6">
                  <h3 className="text-white text-lg font-semibold mb-2">Known for</h3>
                  <ul className="space-y-2">
                    {creator?.games.slice(0, 3).map((game: IGames) => (
                      <li key={game.id} className="flex justify-between items-center">
                        <Link style={{color: '#c7ccd5'}} href={`/games/${game.slug}`}>
                          {game.name}
                        </Link>
                        <span className="text-gray-400">{game.added.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Display message if no creators are found
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-xl">No creators found. Please try again later.</p>
        </div>
      )}

      {/* Show additional skeleton loaders if loading more data */}
      {loading && creators.length > 0 && <Skeleton numberOfGrids={4} />}
    </div>
  );
};

export default Creators;
