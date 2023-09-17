import { Button, HStack, Input } from "@chakra-ui/react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Geocode from "react-geocode";
// import { Geocode as TGeocode } from "./searchResultsMap/types";
import { GOOGLE_API_KEY } from "../constants/apiKeys";
import { useState, MouseEvent, FC } from "react";

Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("au");
Geocode.enableDebug();

interface ISearch {
	width: string;
}

type SearchParams = {
	[key: string]: string;
};

export const Search: FC<ISearch> = ({ width }) => {
	const [searchSuburb, setSearchSuburb] = useState<SearchParams>({});
	const navigate = useNavigate();

	const handleSearchChange = (key: string, value: string) => {
		setSearchSuburb({ ...searchSuburb, [key]: value });
	};

	const handleSearch = async (event: MouseEvent) => {
		event.preventDefault();

		console.log("Suburb", searchSuburb);

		try {
			const geocodeRes = await Geocode.fromAddress(searchSuburb.suburb);
			const { lat, lng } = geocodeRes.results[0].geometry.location;

			const searchParams = {
				...searchSuburb,
				lat: lat,
				lng: lng
			};

			navigate({
				pathname: "/search-results",
				search: `?${createSearchParams(searchParams)}`
			});
		} catch (err: unknown) {
			console.log(err);
		}
	};

	return (
		<HStack w={"100%"} justifyContent={"center"}>
			<Input
				width={width}
				placeholder="Search..."
				id="suburb"
				onChange={({ currentTarget: { id, value } }) =>
					handleSearchChange(id, value)
				}
				sx={{ color: "primary.white", fontSize: "lg" }}
			/>

			<Button onClick={async (event) => handleSearch(event)}>
				Search
			</Button>
		</HStack>
	);
};
