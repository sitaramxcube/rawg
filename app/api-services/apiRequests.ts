import { apiEndPoints } from "./apiEndPoints";
// Object containing predefined API request configurations
export const API_REQUESTS = {
    // Configuration for fetching a list of games
    GET_GAMES: {
        METHOD: 'GET',
        URL: apiEndPoints.paths.games,
        PARAMS: { key: apiEndPoints.host_api.apiKey },
        PAYLOAD: {}
    },
    // Configuration for fetching details of a specific game
    GET_GAME_DETAILS: {
        METHOD: 'GET',
        URL: '',
        PARAMS: { key: apiEndPoints.host_api.apiKey },
        PAYLOAD: {}
    },
    // Configuration for fetching a list of stores
    GET_STORES: {
        METHOD: 'GET',
        URL: apiEndPoints.paths.stores,
        PARAMS: { key: apiEndPoints.host_api.apiKey },
        PAYLOAD: {}
    },
    // Configuration for fetching a list of creators
    GET_CREATORS: {
        METHOD: 'GET',
        URL: apiEndPoints.paths.creators,
        PARAMS: { key: apiEndPoints.host_api.apiKey },
        PAYLOAD: {}
    },
}