import { MapData } from "../components/searchResultsMap/types";

export const formatInspectionData = (inspection: MapData) => {
	const geocode = {
		lat: inspection.geocode.latitude,
		lng: inspection.geocode.longitude
	};
	const inspectionDateStart = new Date(
		inspection.inspectionTime
	).toLocaleString("en-AU");
	const inspectionDateEnd = new Date(
		inspection.inspectionTimeEnd
	).toLocaleString("en-AU");

	return {
		geocode,
		inspectionDateStart,
		inspectionDateEnd
	};
};
