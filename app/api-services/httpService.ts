/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { apiEndPoints } from "./apiEndPoints";

// Interface for the API service request structure
interface IApiService {
    METHOD: string; // HTTP method (e.g., GET, POST)
    URL: string; // API endpoint URL
    PARAMS: any; // Query parameters for the request
    PAYLOAD: any; // Payload data for POST requests
}

// Function to handle HTTP service requests
export const httpService = async (request: IApiService | string) => {
    // Object containing methods to handle different HTTP methods
    const httpRequest: any = {
        // Handles GET requests
        GET: async (getRequest: IApiService) => {
            try {
                // Sends a GET request using axios
                const response = await axios.get(`${apiEndPoints.host_api.host}${getRequest.URL}`, {
                    params: {
                        ...(getRequest.PARAMS && getRequest.PARAMS) // Includes params if they exist
                    }
                });
                return response.data; // Returns the response data
            } catch (error) {
                throw error; // Propagates the error
            }
        },
        // Handles POST requests
        POST: async (postRequest: IApiService): Promise<any> => {
            try {
                // Sends a POST request using axios
                const response = await axios.post(
                    `${apiEndPoints.host_api.host}${postRequest.URL}`,
                    postRequest.PAYLOAD || {}, // Includes payload if provided
                    {
                        params: postRequest.PARAMS || {}, // Includes params if provided
                    }
                );
                return response.data; // Returns the response data
            } catch (error) {
                throw error; // Propagates the error
            }
        },
    };

    // Determines the request type and executes the corresponding method
    if (typeof request !== "string" && "METHOD" in request) {
        // If the request object has a METHOD property, execute the respective HTTP method
        return await httpRequest[request.METHOD](request);
    } else {
        // Handles cases where the request is a simple string (URL)
        try {
            const response = await axios.get(request); // Sends a GET request
            return response.data; // Returns the response data
        } catch (error) {
            throw error; // Propagates the error
        }
    }
};