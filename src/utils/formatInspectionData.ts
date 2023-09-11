import { MapData } from "../components/searchResultsMap/types";

export const formatInspectionData = (inspection: MapData) => {
	const geocode = {
		lat: inspection.geocode.latitude,
		lng: inspection.geocode.longitude
	};
	const inspectionDateStart = new Date(
		inspection.inspectionTime
	).toLocaleString("en-AU", {
		hour: "2-digit",
		minute: "2-digit"
	});
	const inspectionDateEnd = new Date(
		inspection.inspectionTimeEnd
	).toLocaleString("en-AU", {
		hour: "2-digit",
		minute: "2-digit"
	});

	return {
		geocode,
		inspectionDateStart,
		inspectionDateEnd
	};
};
