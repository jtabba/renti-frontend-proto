import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Map } from "../components/map/Map";
import { useState } from "react";
import { DEFAULT_ZOOM } from "../constants/mapData";

export const SearchResults = () => {
	const [mapZoom, setMapZoom] = useState<number>(DEFAULT_ZOOM);
	const ZOOM_OPTIONS = [5, 10, 25, 50];

	const handleZoom = (zoomValue: number) => {
		setMapZoom(zoomValue);
	};

	return (
		<Flex
			w={"100%"}
			h={"100%"}
			justifyContent={"space-evenly"}
			flexDirection={"row"}
		>
			<VStack h={"100%"}>
				<VStack>
					<Text>Select search radius</Text>
					<HStack>
						{ZOOM_OPTIONS.map((zoomValue) => (
							<Button
								value={zoomValue}
								onClick={({ currentTarget }) =>
									handleZoom(Number(currentTarget.value))
								}
							>
								{zoomValue}
							</Button>
						))}
					</HStack>
				</VStack>
				<Text color={"primary.white"}>Search Results</Text>
			</VStack>
			<Map mapZoom={mapZoom} />
		</Flex>
	);
};
