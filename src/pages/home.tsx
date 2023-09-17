import { Flex, Text, VStack } from "@chakra-ui/react";
import { Search } from "../components/Search";

export const Home = () => {
	return (
		<Flex
			w={"50%"}
			h={"30%"}
			alignItems={"center"}
			bg={"primary.blue"}
			borderRadius={15}
		>
			<VStack spacing={14} w={"100%"}>
				<Text fontSize={"3xl"} fontWeight={600} color={"primary.white"}>
					Search for home inspections around you
				</Text>
				<Search width={"60%"} />;
			</VStack>
		</Flex>
	);
};
