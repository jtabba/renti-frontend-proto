import { FC, FormEvent } from "react";
import { Text, Spinner } from "@chakra-ui/react";
import { getMatchingSuburbs } from "../../network/requests/getMatchingSearchQueries";
import { useQuery } from "@tanstack/react-query";
import {
	DropDownListContainer,
	DropDownListSegment
} from "../../theme/customComponents";
import { createSearchParams, useNavigate } from "react-router-dom";
import { SearchParams } from "../searchResultsMap/types";

interface IDropDownList {
	searchSuburb: string;
}

export const DropDownList: FC<IDropDownList> = ({ searchSuburb }) => {
	const navigate = useNavigate();
	const {
		isLoading,
		isError,
		isFetching,
		isRefetching,
		data: matchingSuburbs
	} = useQuery(
		["matchingSuburbs", searchSuburb],
		async () => await getMatchingSuburbs(searchSuburb),
		{
			refetchOnWindowFocus: false
		}
	);

	const handleSearch = async (
		event: MouseEvent | FormEvent,
		searchParams: SearchParams
	) => {
		event.stopPropagation();

		try {
			navigate({
				pathname: "/search-results",
				search: `?${createSearchParams(searchParams)}`
			});
		} catch (err: unknown) {
			console.log(err);
		}
	};

	if (isError || matchingSuburbs instanceof Error) {
		return (
			<DropDownListContainer>
				<Text>An unexpected error has occurred. Please try again</Text>
			</DropDownListContainer>
		);
	}

	if (
		!matchingSuburbs ||
		matchingSuburbs.length === 0 ||
		searchSuburb === ""
	) {
		return null;
	}

	if (isLoading || isFetching || isRefetching) {
		return (
			<DropDownListContainer>
				<Spinner
					alignSelf={"center"}
					margin={8}
					size={"md"}
					color="primary.white"
				/>
			</DropDownListContainer>
		);
	}

	return (
		<DropDownListContainer>
			{matchingSuburbs.map((suburb) => (
				<DropDownListSegment
					key={`${suburb["suburb"]}-${suburb["state"]}-${suburb["postcode"]}`}
					onClick={(event) =>
						handleSearch(event, {
							suburb: `${suburb["suburb"]}-${suburb["state"]}-${suburb["postcode"]}`.toLowerCase(),
							lat: suburb["geocode"]["lat"].toString(),
							lng: suburb["geocode"]["lng"].toString()
						})
					}
				>
					<Text
						textStyle={"body"}
						key={suburb["suburb"]}
						color={"primary.white"}
					>
						{suburb["suburb"].replace("-", " ")}, {suburb["state"]}{" "}
						{suburb["postcode"]}
					</Text>
				</DropDownListSegment>
			))}
		</DropDownListContainer>
	);
};
