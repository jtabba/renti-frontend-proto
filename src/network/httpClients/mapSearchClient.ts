import { MAP_SEARCH_API_URL } from "../../constants/apiKeys";
import { InterceptorBase } from "./httpClientBase";

export class MapSearchClient extends InterceptorBase {
	private static mapSearchClientInstance: MapSearchClient;

	private constructor() {
		super(MAP_SEARCH_API_URL);
	}

	public static getInstance(): MapSearchClient {
		if (!MAP_SEARCH_API_URL) {
			throw new Error(
				"Cannot create instance - MAP_SEARCH_API_URL is not defined"
			);
		}

		if (!MapSearchClient.mapSearchClientInstance) {
			MapSearchClient.mapSearchClientInstance = new MapSearchClient();
		}

		return MapSearchClient.mapSearchClientInstance;
	}

	public async get<T>(endpoint: string): Promise<T[]> {
		const response = await this.axiosInstance({
			method: "GET",
			url: endpoint
		});

		if (response.status < 200 || response.status >= 300) {
			throw new Error(
				`GET request to ${endpoint} failed with status ${response.status}}`
			);
		}

		return response.data;
	}

	public async post<T, K>(endpoint: string, data: K): Promise<T> {
		const response = await this.axiosInstance({
			method: "POST",
			data: data ?? undefined,
			url: endpoint
		});

		if (response.status < 200 || response.status >= 300) {
			throw new Error(
				`POST request to ${endpoint} failed with status ${response.status}}`
			);
		}

		return response.data;
	}
}
