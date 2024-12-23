import { API_REQUESTS } from "../api-services/apiRequests";
import { httpService } from "../api-services/httpService";
import Stores from "../components/Stores";

export interface IStore {
  slug: string;
  name: string;
  image_background: string;
  games: { slug: string; name: string; added: number }[];
}

const StoresPage = async () => {
  let stores: IStore[] = [];
  try {
    const data = await httpService(API_REQUESTS.GET_STORES);
    stores = data.results;
  } catch (error) {
    console.error("Error fetching stores:", error);
  }

  return <Stores stores={stores} />;
};

export default StoresPage;
