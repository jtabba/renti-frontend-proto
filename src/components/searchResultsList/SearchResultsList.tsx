import { VStack, Text, Grid, Img, Box, Divider, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { ButtonGroup } from "../reusableComponents/ButtonGroup";
import { SAMPLE_DATA } from "../../constants/mapData";
import { formatInspectionData } from "../../utils/formatInspectionData";
import { ScrollContainer } from "./styles";
import { PhoneIcon } from "@chakra-ui/icons";
import {
	BsFillTelephoneFill,
	PiToiletFill,
	IoIosBed,
	BiSolidTimeFive,
	FaDollarSign
} from "react-icons/bs";

interface ISearchResultsList {
	handleZoom: (value: number) => void;
}

export const SearchResultsList: FC<ISearchResultsList> = ({ handleZoom }) => {
	const ZOOM_OPTIONS = [5, 10, 25, 50];

	return (
		<VStack maxH={"100%"} w={"100%"} alignItems={"center"}>
			<VStack margin={8}>
				<Text color={"primary.white"}>Select search radius</Text>
				<ButtonGroup
					dataArray={ZOOM_OPTIONS}
					onClickFunction={handleZoom}
				/>
			</VStack>

			<ScrollContainer>
				{SAMPLE_DATA.map((inspection) => {
					const { inspectionDateStart, inspectionDateEnd } =
						formatInspectionData(inspection);

					return (
						<Box key={inspection.id} margin={"0px 40px"}>
							<Grid
								borderRadius={8}
								bg={"primary.white"}
								templateColumns={"1fr 1fr"}
								margin={"0px 0px 32px 0px"}
								textAlign={"left"}
							>
								<Flex
									justifyContent={"flex-start"}
									flexDirection={"column"}
									gap={4}
									margin={8}
								>
									<Text
										color={"primary.dark"}
										fontWeight={600}
									>
										{inspection.geocode.formattedAddress}
									</Text>
									<Text>
										Inspection start: {inspectionDateStart}
									</Text>
									<Text>
										Inspection end: {inspectionDateEnd}
									</Text>
									<Text>
										Agent number: {inspection.agentNumber}
									</Text>
									<Text>Bedrooms: {inspection.bedrooms}</Text>
									<Text>
										Bathrooms: {inspection.bathrooms}
									</Text>
									<Text>
										Price: ${inspection.weeklyPrice}
									</Text>
								</Flex>
								<Img
									objectFit={"cover"}
									borderRadius={"0px 8px 8px 0px"}
									src={inspection.image}
								/>
							</Grid>
							<Divider margin={"0px 0px 32px 0px"} />
						</Box>
					);
				})}
			</ScrollContainer>
		</VStack>
	);
};
