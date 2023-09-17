import {
	GoogleMap,
	InfoWindowF,
	MarkerF,
	useJsApiLoader
} from "@react-google-maps/api";
import { FC, useMemo, useState } from "react";
import { SYDNEY_CENTRE } from "../../constants/mapData";
import { GOOGLE_API_KEY } from "../../constants/apiKeys";
import { Box, Flex, Img, Spinner, Text } from "@chakra-ui/react";
import { Geocode, PropertySearchData } from "./types";
import { formatInspectionTime } from "../../utils/formatInspectionTime";
// import { BsRecordCircle } from "react-icons/bs";

interface ISearchResultsMap {
	mapZoom: number;
	properties: PropertySearchData[];
}

export const SearchResultsMap: FC<ISearchResultsMap> = ({
	mapZoom,
	properties
}) => {
	const { isLoaded: isGoogleMapsLoaded } = useJsApiLoader({
		googleMapsApiKey: GOOGLE_API_KEY,
		id: "google-map"
	});
	const [selectedMarker, setSelectedMarker] = useState<{
		geocode: Geocode;
		markerId: string;
	} | null>(null);
	const [mapCentre, setMapCentre] = useState(SYDNEY_CENTRE);

	const center = useMemo(() => mapCentre, [mapCentre]);
	const mapContainerStyle = {
		height: "100%",
		width: "100%"
	};

	const handleMarkerClick = (geocode: Geocode, markerId: string) => {
		setMapCentre({
			...geocode
		});
		setSelectedMarker({ geocode, markerId });
	};

	if (!GOOGLE_API_KEY) {
		return (
			<Box>
				<Text>Error - Google API key is undefined</Text>
			</Box>
		);
	}

	if (!isGoogleMapsLoaded) {
		return <Spinner />;
	}

	return (
		<Box h={"100vh"} w={"120%"}>
			<GoogleMap
				zoom={mapZoom}
				center={center}
				mapContainerStyle={mapContainerStyle}
			>
				{properties.length > 0 ? (
					properties.map((property) => {
						const { inspectionDateStart, inspectionDateEnd } =
							formatInspectionTime(property);

						return (
							<MarkerF
								// icon={{ url: require(BsRecordCircle) }}
								key={property.id}
								position={property.geocode}
								onClick={() =>
									handleMarkerClick(
										property.geocode,
										property.id
									)
								}
							>
								{selectedMarker &&
									selectedMarker.markerId === property.id && (
										<InfoWindowF
											onCloseClick={() =>
												setSelectedMarker(null)
											}
										>
											<Flex
												flexDirection={"column"}
												alignItems={"left"}
												justifyContent={"space-evenly"}
												gap={4}
											>
												<Text fontWeight={400}>
													{property.formattedAddress}
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
													{property.agentNumber}
												</Text>
												<Text>
													Bedrooms:{" "}
													{property.bedrooms}
												</Text>
												<Text>
													Bathrooms:{" "}
													{property.bathrooms}
												</Text>
												<Text>
													Price: $
													{property.weeklyPrice}
												</Text>
												<Img src={property.image} />
											</Flex>
										</InfoWindowF>
									)}
							</MarkerF>
						);
					})
				) : (
					<></>
				)}
			</GoogleMap>
		</Box>
	);
};
