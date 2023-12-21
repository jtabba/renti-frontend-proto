import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import SearchResultsMap from "../components/searchResultsMap/SearchResultsMap";
import { useState } from "react";
import { DEFAULT_ZOOM } from "../constants/mapData";
import { SearchResultsList } from "../components/searchResultsList/SearchResultsList";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { getSearchProperties } from "../network/requests/getSearchProperties";

export const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const [mapZoom, setMapZoom] = useState<number>(DEFAULT_ZOOM);
	const { suburb, lat, lng } = Object.fromEntries([...searchParams]);
	const geocode = { lat: Number(lat), lng: Number(lng) };

	const handleZoom = (zoomValue: number) => {
		setMapZoom(zoomValue);
	};

	const {
		isLoading,
		isError,
		isFetching,
		isRefetching,
		refetch: getNewSearchResults,
		data: searchResults
	} = useQuery(
		["searchResults", ...searchParams],
		async () => await getSearchProperties(suburb),
		{
			refetchOnWindowFocus: false
		}
	);

	if (isLoading || isFetching || isRefetching) {
		return <Spinner />;
	}

	if (isError || searchResults instanceof AxiosError) {
		return (
			<Box>
				<Text color={"theme.white"}>
					An unexpected error has occurred. Please try again
				</Text>
			</Box>
		);
	}

	return (
		<Grid
			w={"100%"}
			h={"100%"}
			maxHeight={"100%"}
			maxWidth={"100%"}
			templateColumns={"1.5fr 2fr"}
		>
			<SearchResultsList
				handleZoom={handleZoom}
				properties={searchResults}
				suburb={suburb}
			/>
			<SearchResultsMap
				mapZoom={mapZoom}
				properties={searchResults}
				getNewSearchResults={getNewSearchResults}
				geocode={geocode}
				searchParams={searchParams}
			/>
		</Grid>
	);
};
