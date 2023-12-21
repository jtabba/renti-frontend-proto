import {
	VStack,
	Text,
	Grid,
	Box,
	Divider,
	Flex,
	HStack,
	Img
} from "@chakra-ui/react";
import { FC } from "react";
import { ButtonGroup } from "../reusableComponents/ButtonGroup";
import { ScrollContainer } from "./styles";
import { PropertyInformation } from "./PropertyInformation";
import { PropertyImages } from "./PropertyImages";
import { PropertySearchData } from "../searchResultsMap/types";
import { SearchBar } from "../SearchBar/SearchBar";
import { RADIUS_OPTIONS } from "../../constants/mapData";

interface ISearchResultsList {
	properties: PropertySearchData[];
	suburb: string;
	handleZoom: (value: number) => void;
}

export const SearchResultsList: FC<ISearchResultsList> = ({
	properties,
	handleZoom,
	suburb
}) => {
	return (
		<Flex minH={"100%"} padding={"0px 16px"} flexDirection={"column"}>
			<VStack w={"100%"} margin={"32px 0px"} gap={8}>
				<SearchBar searchBarWidth={"100%"} />

				<VStack>
					<Text color={"primary.white"}>Select search radius</Text>

					<ButtonGroup
						dataArray={RADIUS_OPTIONS}
						onClickFunction={handleZoom}
					/>
				</VStack>

				<Text textStyle={"header"} color="primary.white">
					{properties.length} properties available for rent around{" "}
					{suburb}
				</Text>
			</VStack>

			<ScrollContainer>
				{properties.length > 0 ? (
					properties.map((property, index) => (
						<Box key={property["id"]} paddingRight={"16px"}>
							<Grid
								borderRadius={8}
								bg={"primary.white"}
								templateRows={"auto-fill"}
								marginBottom={"32px"}
							>
								<HStack justifyContent={"space-between"}>
									<Flex
										justifyContent={"flex-start"}
										flexDirection={"column"}
										gap={4}
										margin={8}
									>
										<Text textStyle={"header"}>
											{`${
												property["address"]
											}, ${property["suburb"].replace(
												"-",
												" "
											)} ${property["state"]}`}
										</Text>

										<PropertyInformation
											property={property}
										/>
									</Flex>

									<Flex
										flexDirection={"column"}
										gap={4}
										margin={8}
										textAlign={"center"}
										maxWidth={"30%"}
									>
										<Img
											src={
												property["agency"][
													"brandLogo"
												] as string
											}
										/>

										<Text textStyle={"header"}>
											{
												property["agency"][
													"brandName"
												] as string
											}
										</Text>
									</Flex>
								</HStack>

								<PropertyImages images={property["images"]} />
							</Grid>

							{index !== properties.length - 1 && (
								<Divider margin={"0px 0px 32px 0px"} />
							)}
						</Box>
					))
				) : (
					<Text
						textAlign={"center"}
						textStyle={"header"}
						color={"primary.white"}
					>
						No listings found
					</Text>
				)}
			</ScrollContainer>
		</Flex>
	);
};
