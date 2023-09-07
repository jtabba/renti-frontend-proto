import { VStack, Text, Grid, Img } from "@chakra-ui/react";
import { FC } from "react";
import { ButtonGroup } from "../reusableComponents/ButtonGroup";
import { SAMPLE_DATA } from "../../constants/mapData";
import { formatInspectionData } from "../../utils/formatInspectionData";

interface ISearchResultsList {
	handleZoom: (value: number) => void;
}

export const SearchResultsList: FC<ISearchResultsList> = ({ handleZoom }) => {
	const ZOOM_OPTIONS = [5, 10, 25, 50];

	return (
		<VStack h={"100%"} w={"100%"} alignItems={"center"} overflowY={"auto"}>
			<VStack>
				<Text>Select search radius</Text>
				<ButtonGroup
					dataArray={ZOOM_OPTIONS}
					onClickFunction={handleZoom}
				/>
			</VStack>

			<Text color={"primary.white"}>Search Results</Text>

			<VStack>
				{SAMPLE_DATA.map((inspection) => {
					const { inspectionDateStart, inspectionDateEnd } =
						formatInspectionData(inspection);

					return (
						<Grid templateColumns={"1fr 1fr"}>
							<VStack alignItems={"left"}>
								<Text fontWeight={400}>
									{inspection.geocode.formattedAddress}
								</Text>
								<Text>Inspection end: {inspectionDateEnd}</Text>
								<Text>
									Agent number: {inspection.agentNumber}
								</Text>
								{/* <Text>
									Inspection start: {inspectionDateStart}
								</Text>
								<Text>Bedrooms: {inspection.bedrooms}</Text>
								<Text>Bathrooms: {inspection.bathrooms}</Text>
								<Text>Price: ${inspection.weeklyPrice}</Text> */}
							</VStack>
							{/* <Img src={inspection.image} /> */}
						</Grid>
					);
				})}
			</VStack>
		</VStack>
	);
};
