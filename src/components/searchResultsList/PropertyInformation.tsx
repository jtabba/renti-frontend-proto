import { FC } from "react";
import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { PropertySearchData } from "../searchResultsMap/types";
import { BiSolidTimeFive } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { PiToiletFill } from "react-icons/pi";
import { IoIosBed } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";
import { formatInspectionTime } from "../../utils/formatInspectionTime";

interface IPropertyInformation {
	property: PropertySearchData;
}

export const PropertyInformation: FC<IPropertyInformation> = ({ property }) => {
	const { inspectionDateStart, inspectionDateEnd } =
		formatInspectionTime(property);

	return (
		<Flex justifyContent={"flex-start"} flexDirection={"column"} gap={4}>
			<HStack justifyContent={"flex-start"}>
				<HStack>
					<Icon color={"primary.main"} as={FaDollarSign} />
					<Text textStyle={"caption"} fontWeight={"bold"}>
						{property.weeklyPrice}
					</Text>
				</HStack>
				<HStack>
					<Icon color={"primary.main"} as={PiToiletFill} />
					<Text textStyle={"caption"} fontWeight={"bold"}>
						{property.bathrooms}
					</Text>
				</HStack>
				<HStack>
					<Icon color={"primary.main"} as={IoIosBed} />
					<Text textStyle={"caption"} fontWeight={"bold"}>
						{property.bedrooms}
					</Text>
				</HStack>
			</HStack>
			<HStack>
				<Icon color={"primary.main"} as={BiSolidTimeFive} />
				<Text textStyle={"caption"} fontWeight={"bold"}>
					{inspectionDateStart} - {inspectionDateEnd}
				</Text>
			</HStack>
			<HStack>
				<Icon color={"primary.main"} as={BsFillTelephoneFill} />
				<Text textStyle={"caption"} fontWeight={"bold"}>
					{property.agentNumber}
				</Text>
			</HStack>
		</Flex>
	);
};
