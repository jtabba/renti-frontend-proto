import {
	GoogleMap,
	InfoWindowF,
	MarkerF,
	useJsApiLoader
} from "@react-google-maps/api";
import { FC, useMemo, useState } from "react";
import { SAMPLE_DATA, SYDNEY_CENTRE } from "../../constants/mapData";
import { GOOGLE_API_KEY } from "../../constants/apiKeys";
import { Box, Flex, Img, Spinner, Text } from "@chakra-ui/react";
import { MapGeocode } from "./types";
import { formatInspectionData } from "../../utils/formatInspectionData";
// import { BsRecordCircle } from "react-icons/bs";

interface ISearchResultsMap {
	mapZoom: number;
}

export const SearchResultsMap: FC<ISearchResultsMap> = ({ mapZoom }) => {
	const [selectedMarker, setSelectedMarker] = useState<{
		geocode: MapGeocode;
		markerId: string;
	} | null>(null);
	const [mapCentre, setMapCentre] = useState<MapGeocode>(SYDNEY_CENTRE);
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: GOOGLE_API_KEY,
		id: "google-map"
	});

	const center = useMemo(() => mapCentre, [mapCentre]);
	const mapContainerStyle = {
		height: "100%",
		width: "100%"
	};

	const handleMarkerClick = (geocode: MapGeocode, markerId: string) => {
		setMapCentre(geocode);
		setSelectedMarker({ geocode, markerId });
	};

	// const currentDate = new Date(Date.now() + 8 * 86400000);
	// const newDateOptions = {
	// 	year: "numeric",
	// 	month: "2-digit",
	// 	day: "2-digit"
	// };

	if (!GOOGLE_API_KEY) {
		return (
			<Box>
				<Text>Error - Google API key is undefined</Text>
			</Box>
		);
	}

	if (loadError) {
		return (
			<Box>
				<Text>Map cannot be loaded right now, sorry.</Text>
			</Box>
		);
	}

	return (
		<>
			{isLoaded ? (
				<Box h={"100vh"}>
					<GoogleMap
						zoom={mapZoom}
						center={center}
						mapContainerStyle={mapContainerStyle}
					>
						{SAMPLE_DATA.map((inspection) => {
							const {
								geocode,
								inspectionDateStart,
								inspectionDateEnd
							} = formatInspectionData(inspection);

							return (
								<MarkerF
									// icon={{ url: require(BsRecordCircle) }}
									key={inspection.id}
									position={geocode}
									onClick={() =>
										handleMarkerClick(
											geocode,
											inspection.id
										)
									}
								>
									{selectedMarker &&
										selectedMarker.markerId ===
											inspection.id && (
											<InfoWindowF
												onCloseClick={() =>
													setSelectedMarker(null)
												}
											>
												<Flex
													flexDirection={"column"}
													alignItems={"left"}
													justifyContent={
														"space-evenly"
													}
													gap={4}
												>
													<Text fontWeight={400}>
														{
															inspection.geocode
																.formattedAddress
														}
													</Text>
													<Text>
														Inspection start:{" "}
														{inspectionDateStart}
													</Text>
													<Text>
														Inspection end:{" "}
														{inspectionDateEnd}
													</Text>
													<Text>
														Agent number:{" "}
														{inspection.agentNumber}
													</Text>
													<Text>
														Bedrooms:{" "}
														{inspection.bedrooms}
													</Text>
													<Text>
														Bathrooms:{" "}
														{inspection.bathrooms}
													</Text>
													<Text>
														Price: $
														{inspection.weeklyPrice}
													</Text>
													<Img
														src={inspection.image}
													/>
												</Flex>
											</InfoWindowF>
										)}
								</MarkerF>
							);
						})}
					</GoogleMap>
				</Box>
			) : (
				<Spinner />
			)}
		</>
	);
};
