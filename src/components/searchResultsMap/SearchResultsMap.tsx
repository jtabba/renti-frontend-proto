import {
	Circle,
	GoogleMap,
	InfoWindowF,
	MarkerF,
	useJsApiLoader
} from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";
import { GOOGLE_API_KEY } from "../../constants/apiKeys";
import { Box, Flex, Img, Spinner, Text } from "@chakra-ui/react";
import { Geocode, PropertySearchData } from "./types";
import { formatInspectionTime } from "../../utils/formatInspectionTime";
import { SYDNEY_CENTRE } from "../../constants/mapData";
// import { BsRecordCircle } from "react-icons/bs";

interface ISearchResultsMap {
	mapZoom: number;
	properties: PropertySearchData[];
	geocode: Geocode;
	searchParams: URLSearchParams;
	getNewSearchResults: () => void;
}

function SearchResultsMap({
	mapZoom,
	properties,
	geocode
}: // searchParams
// getNewSearchResults
ISearchResultsMap) {
	const { isLoaded: isGoogleMapsLoaded } = useJsApiLoader({
		googleMapsApiKey: GOOGLE_API_KEY,
		id: "google-map"
	});
	const [selectedMarker, setSelectedMarker] = useState<{
		geocode: Geocode;
		markerId: string;
	} | null>(null);

	const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
	const [mapCentre, setMapCentre] = useState({
		...geocode
	});

	const mapContainerStyle = {
		height: "100%",
		width: "100%"
	};

	const handleCenterChange = () => {
		// if (mapRef) {
		const startMapLocation = mapRef?.getCenter()?.toJSON();

		console.log(startMapLocation);

		setTimeout(() => {
			const endMapLocation = mapRef?.getCenter()?.toJSON();
			const hasStoppedDraggingMap =
				startMapLocation?.lat === endMapLocation?.lat &&
				startMapLocation?.lng === endMapLocation?.lng;

			if (hasStoppedDraggingMap) {
				// searchParams.set("lat", String(endMapLocation?.lat));
				// searchParams.set("lng", String(endMapLocation?.lng));
				console.log(true);
				// getNewSearchResults();
				// setMapCentre({
				// 	lat: endMapLocation!.lat,
				// 	lng: endMapLocation!.lng
				// });
			}
		}, 1500);
		// }
	};
	// const onLoad = useCallback((map: google.maps.Map) => {
	// 	// const bounds = new window.google.maps.LatLngBounds(mapCentre);
	// 	// map.fitBounds(bounds);
	// 	setMapRef(map);
	// }, []);

	const onUnmount = useCallback(() => {
		setMapRef(null);
	}, []);

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
		<Box h={"100vh"}>
			<GoogleMap
				// onZoomChanged={}
				// onLoad={onLoad}
				zoom={mapZoom}
				center={mapCentre}
				mapContainerStyle={mapContainerStyle}
				onCenterChanged={handleCenterChange}
				onUnmount={onUnmount}
			>
				<Circle center={SYDNEY_CENTRE} radius={1000} visible={true} />
				{properties.length > 0 ? (
					properties.map((property) => {
						const { inspectionTimeOpen, inspectionTimeClose } =
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
													{property["address"]}
												</Text>
												<Text>
													Inspection start:{" "}
													{inspectionTimeOpen}
												</Text>
												<Text>
													Inspection end:{" "}
													{inspectionTimeClose}
												</Text>
												<Text>
													Bedrooms: {property["beds"]}
												</Text>
												<Text>
													Bathrooms:{" "}
													{property["baths"]}
												</Text>
												<Text>
													Price: $
													{property["weekly_price"]}
												</Text>
												<Img
													src={property["images"][0]}
												/>
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
}

export default memo(SearchResultsMap);
