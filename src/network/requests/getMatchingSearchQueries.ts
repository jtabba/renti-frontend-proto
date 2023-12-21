import { MapSearchClient } from "../httpClients/mapSearchClient";
import { v1MapSearchApiEndpoints } from "../../constants/endpoints";
import { MatchingSuburbs } from "../../components/searchResultsMap/types";
import { AxiosError } from "axios";

export const getMatchingSuburbs = async (
	searchQuery: string
): Promise<MatchingSuburbs[] | AxiosError> => {
	const mapSearchClient = MapSearchClient.getInstance();

	try {
		const res: MatchingSuburbs[] = await mapSearchClient.get(
			`${
				v1MapSearchApiEndpoints.FindMatchingSuburbs
			}?search-query=${searchQuery.replace(" ", "-")}`
		);

		console.log(res);

		if (!res) {
			throw new Error("Unable to fetch matching suburbs");
		}

		return res;
	} catch (error) {
		console.error(error);

		return error as AxiosError;
	}
};
