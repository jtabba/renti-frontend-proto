import { Grid } from "@chakra-ui/react";
import { SearchResultsMap } from "../components/searchResultsMap/SearchResultsMap";
import { useState } from "react";
import { DEFAULT_ZOOM } from "../constants/mapData";
import { SearchResultsList } from "../components/searchResultsList/SearchResultsList";

export const SearchResults = () => {
	const [mapZoom, setMapZoom] = useState<number>(DEFAULT_ZOOM);

	const handleZoom = (zoomValue: number) => {
		setMapZoom(zoomValue);
	};

	return (
		<Grid templateColumns={"1fr 1.5fr"} gap={2} w={"100%"}>
			<SearchResultsList handleZoom={handleZoom} />
			<SearchResultsMap mapZoom={mapZoom} />
		</Grid>
	);
};
