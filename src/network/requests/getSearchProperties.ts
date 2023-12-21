import { MapSearchClient } from "../httpClients/mapSearchClient";
import { v1MapSearchApiEndpoints } from "../../constants/endpoints";
import { PropertySearchData } from "../../components/searchResultsMap/types";
import { AxiosError } from "axios";

export const getSearchProperties = async (
	suburb: string
): Promise<PropertySearchData[] | AxiosError> => {
	const mapSearchClient = MapSearchClient.getInstance();

	try {
		const res: PropertySearchData[] = await mapSearchClient.get(
			`${v1MapSearchApiEndpoints.FindProperties}?type=rent&suburb=${suburb}`
		);

		console.log(
			`${v1MapSearchApiEndpoints.FindProperties}?type=rent&suburb=${suburb}`
		);

		console.log(res);

		if (!res) {
			throw new Error("Unable to fetch properties");
		}

		return res;
	} catch (error) {
		console.error(error);

		return error as AxiosError;
	}
};
