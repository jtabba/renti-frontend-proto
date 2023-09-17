import { PropertySearchData } from "../components/searchResultsMap/types";

export const formatInspectionTime = (property: PropertySearchData) => {
	const inspectionDateStart = new Date(property.inspectionTime)
		.toLocaleString("en-AU", {
			hour: "2-digit",
			minute: "2-digit"
		})
		.split(" ")
		.join("");

	const inspectionDateEnd = new Date(property.inspectionTimeEnd)
		.toLocaleString("en-AU", {
			hour: "2-digit",
			minute: "2-digit"
		})
		.split(" ")
		.join("");

	return {
		inspectionDateStart,
		inspectionDateEnd
	};
};
