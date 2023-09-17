export type GeoJson = {
	type: "Point";
	coordinates: number[];
};

export type Geocode = {
	lat: number;
	lng: number;
};

export type PropertySearchData = {
	geocode: Geocode;
	locaton: GeoJson;
	image: string;
	bathrooms: number;
	bedrooms: number;
	size: string;
	id: string;
	inspectionTime: string;
	weeklyPrice: number;
	inspectionTimeEnd: string;
	agentNumber: string;
	formattedAddress: string;
	country: null;
	city: string;
	stateCode: string;
	zipcode: string;
	streetName: string;
	streetNumber: null;
	countryCode: string;
};
