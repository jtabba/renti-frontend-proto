import { Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
	const navigate = useNavigate();

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

				<HStack w={"100%"} justifyContent={"center"}>
					<Input width={"60%"} placeholder="Search..." />

					<Button onClick={() => navigate("/search-results")}>
						Search
					</Button>
				</HStack>
			</VStack>
		</Flex>
	);
};
