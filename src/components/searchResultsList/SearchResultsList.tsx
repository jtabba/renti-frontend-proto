import { VStack, Text, Grid, Box, Divider, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { ButtonGroup } from "../reusableComponents/ButtonGroup";
import { ScrollContainer } from "./styles";
import { PropertyInformation } from "./PropertyInformation";
import { PropertyImages } from "./PropertyImages";
import { PropertySearchData } from "../searchResultsMap/types";
import { Search } from "../Search";

interface ISearchResultsList {
	properties: PropertySearchData[];
	handleZoom: (value: number) => void;
}

export const SearchResultsList: FC<ISearchResultsList> = ({
	properties,
	handleZoom
}) => {
	const ZOOM_OPTIONS = [5, 10, 25, 50];

	return (
		<Flex
			maxH={"100%"}
			minH={"100%"}
			w={"100%"}
			flexDirection={"column"}
			// justifyContent={"space-between"}
		>
			<VStack w={"100%"} margin={"32px 0px 32px 0px"} gap={8}>
				<Search width={"66%"} />
				<VStack>
					<Text color={"primary.white"}>Select search radius</Text>
					<ButtonGroup
						dataArray={ZOOM_OPTIONS}
						onClickFunction={handleZoom}
					/>
				</VStack>
			</VStack>

			<ScrollContainer>
				{properties.length > 0 ? (
					properties.map((property) => (
						<Box key={property.id} margin={"0px 60px"}>
							<Grid
								borderRadius={8}
								bg={"primary.white"}
								templateRows={"auto-fill"}
								margin={"0px 0px 32px 0px"}
							>
								<Flex
									justifyContent={"flex-start"}
									flexDirection={"column"}
									gap={4}
									margin={8}
								>
									<Text textStyle={"header"}>
										{property.formattedAddress}
									</Text>
									<PropertyInformation property={property} />
								</Flex>
								<PropertyImages images={[property.image]} />
							</Grid>
							{properties.length > 1 && (
								<Divider margin={"0px 0px 32px 0px"} />
							)}
						</Box>
					))
				) : (
					<Text>No results match your crtieria</Text>
				)}
			</ScrollContainer>
		</Flex>
		// </Flex>
	);
};
