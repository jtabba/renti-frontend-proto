// export type GeoJson = {
// 	type: "Point";
// 	coordinates: number[]; // [long, lat]
// };

export type Geocode = {
	lat: number;
	lng: number;
};

export type PropertySearchData = {
	geocode: Geocode;
	geolocaton: string;
	images: string[];
	baths: number;
	beds: number;
	parking: number;
	agency: Record<string, unknown>;
	id: string;
	suburb_id: number;
	address: string;
	suburb: string;
	country: string;
	state: string;
	postcode: string;
	weekly_price: string;
	property_type: string;
	inspection_open_time: string;
	inspection_close_time: string;
};

export type MatchingSuburbs = {
	id: number;
	suburb: string;
	state: string;
	postcode: string;
	geocode: Geocode;
	geolocation: string;
};

export type SearchParams = {
	[key: string]: string;
};
