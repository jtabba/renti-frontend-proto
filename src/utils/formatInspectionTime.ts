import { PropertySearchData } from "../components/searchResultsMap/types";

export const formatInspectionTime = (property: PropertySearchData) => {
	const inspectionTimeOpen = new Date(
		property["inspection_open_time"]
	).toLocaleString("en-AU", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});

	const inspectionTimeClose = new Date(
		property["inspection_close_time"]
	).toLocaleString("en-AU", {
		hour: "2-digit",
		minute: "2-digit"
	});

	return {
		inspectionTimeOpen,
		inspectionTimeClose
	};
};
