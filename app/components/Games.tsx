import { useEffect, useState } from "react";
import { httpService } from "../api-services/httpService";
import { API_REQUESTS } from "../api-services/apiRequests";
import Image from "next/image";
import Skeleton from "./common/Skeleton";
import { useRouter } from "next/navigation";
import GetDiamond from "./common/GetDiamond";
import MetaHead from "./MetaHead";

type Game = {
    id: number;
    name: string;
    slug: string;
    released: string;
    background_image: string;
    rating: number;
    rating_top: number;
};

type ApiResponse = {
    results: Game[];
    next: string;
};

const Games = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        getGames();
    }, []);

    const handleScroll = () => {
        const isBottom =
            document.documentElement.scrollHeight ===
            document.documentElement.scrollTop + window.innerHeight;
        if (isBottom) {
            getGames(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const getGames = async (isScrollToBottom?: boolean) => {
        setLoading(true);
        try {
            const url = isScrollToBottom && nextPageUrl ? nextPageUrl : API_REQUESTS.GET_GAMES;
            const data: ApiResponse = await httpService(url);
            setGames((prevGames) => [...prevGames, ...data.results]);
            setNextPageUrl(data.next);
        } catch (error) {
            console.error("Error fetching games:", error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToGameDetails = (game: Game) => {
        router.push(`/games/${game.slug}`);
    };

    return (
        <div>
            <MetaHead
                title="Explore Popular Games - New and Trending"
                description="Browse a wide collection of new and trending games with ratings, reviews, and more."
                keywords="games, trending games, new games, game library, game ratings, game reviews"
                ogTitle="Explore Popular Games - New and Trending"
                ogDescription="Browse a wide collection of new and trending games with ratings, reviews, and more."
                twitterTitle="Explore Popular Games - New and Trending"
            />

            <div className="flex justify-between items-center p-10">
                <h2 className="text-xl font-bold text-gray-800">New and Trending</h2>
                <GetDiamond />
            </div>

            {loading && games.length === 0 ? (
                <Skeleton numberOfGrids={8} />
            ) : games.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {games.map((game, index: number) => (
                        <div
                            key={`${game.id}-${index}`}
                            className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-4"
                            onClick={() => navigateToGameDetails(game)}
                        >
                            <Image
                                className="w-full h-48 object-cover"
                                width={400}
                                height={200}
                                placeholder="blur"
                                blurDataURL="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                                src={game.background_image}
                                alt={game.name}
                            />
                            <div className="px-6 py-4">
                                <h2 className="font-bold text-xl text-gray-800">{game.name}</h2>
                                <p className="text-gray-600 text-sm">Released: {game.released}</p>
                                <div className="flex items-center">
                                    <span className="text-yellow-500">{game.rating}</span>
                                    <span className="ml-2 text-gray-500">/ {game.rating_top}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-gray-500 text-xl">No games found. Please try again later.</p>
                </div>
            )}

            {loading && games.length > 0 && <Skeleton numberOfGrids={4} />}
        </div>
    );
};

export default Games;
