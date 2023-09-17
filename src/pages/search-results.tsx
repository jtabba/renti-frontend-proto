import { Box, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import { SearchResultsMap } from "../components/searchResultsMap/SearchResultsMap";
import { useState } from "react";
import { DEFAULT_ZOOM } from "../constants/mapData";
import { SearchResultsList } from "../components/searchResultsList/SearchResultsList";
import { MapSearchClient } from "../httpClients/mapSearchClient";
import { v1MapSearchApiEndpoints } from "../constants/endpoints";
import { useQuery } from "@tanstack/react-query";
import { PropertySearchData } from "../components/searchResultsMap/types";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { Search } from "../components/Search";

export const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const [mapZoom, setMapZoom] = useState<number>(DEFAULT_ZOOM);
	const { lat, lng } = Object.fromEntries([...searchParams]);

	const handleZoom = (zoomValue: number) => {
		setMapZoom(zoomValue);
	};

	const getSearchProperties = async (): Promise<
		PropertySearchData[] | AxiosError
	> => {
		const mapSearchClient = MapSearchClient.getInstance();

		try {
			const res: PropertySearchData[] = await mapSearchClient.get(
				`${v1MapSearchApiEndpoints.FindProperties}?lat=${lat}&lng=${lng}`
			);

			if (!res) {
				throw new Error("Unable to fetch properties");
			}

			return res;
		} catch (error) {
			console.error(error);

			return error as AxiosError;
		}
	};

	const {
		isLoading,
		isError,
		isFetching,
		isRefetching,
		data: searchResults
	} = useQuery(
		["searchResults", `$lng=${lng}&lat=${lat}`],
		async () => await getSearchProperties()
	);

	if (isLoading || isFetching || isRefetching) {
		return <Spinner />;
	}

	if (isError || searchResults instanceof AxiosError) {
		return (
			<Box>
				<Text>An unexpected error has occurred. Please try again</Text>
			</Box>
		);
	}

	return (
		// <Flex
		// 	maxH={"100vh"}
		// 	flexDirection={"column"}
		// 	justifyContent={"space-between"}
		// >
		// 	<Flex w={"60%"} alignItems={"center"}>
		// 		<Search />
		// 	</Flex>

		<HStack
			w={"100%"}
			h={"100%"}
			maxHeight={"100%"}
			justifyContent={"space-between"}
		>
			<SearchResultsList
				handleZoom={handleZoom}
				properties={searchResults}
			/>
			<SearchResultsMap mapZoom={mapZoom} properties={searchResults} />
		</HStack>
		// </Flex>
	);
};
