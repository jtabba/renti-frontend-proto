import { HStack } from "@chakra-ui/react";
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
		<HStack
			w={"100%"}
			h={"100%"}
			maxHeight={"100%"}
			justifyContent={"space-between"}
		>
			<SearchResultsList handleZoom={handleZoom} />
			<SearchResultsMap mapZoom={mapZoom} />
		</HStack>
	);
};
