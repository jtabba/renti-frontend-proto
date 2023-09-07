export type GeocodeData = {
	formattedAddress: string;
	latitude: number;
	longitude: number;
	country: null;
	city: string;
	stateCode: string;
	zipcode: string;
	streetName: string;
	streetNumber: null;
	countryCode: string;
	provider: string;
};

export type MapGeocode = {
	lat: number;
	lng: number;
};

export type MapData = {
	geocode: GeocodeData;
	image: string;
	bathrooms: number;
	bedrooms: number;
	size: string;
	id: string;
	state: string;
	inspectionTime: string;
	weeklyPrice: number;
	inspectionTimeEnd: string;
	agentNumber: string;
};
