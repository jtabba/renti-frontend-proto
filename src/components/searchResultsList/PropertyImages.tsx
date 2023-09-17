import { Box, Flex, Grid, Img } from "@chakra-ui/react";
import { FC } from "react";

interface IPropertyImages {
	images: string[];
}

export const PropertyImages: FC<IPropertyImages> = ({ images }) => (
	<Grid
		gridTemplateColumns={"4fr 2fr"}
		gap={4}
		borderRadius={"0px 0px 0px 8px"}
	>
		<Box
			maxW={"100%"}
			height={"auto"}
			background={`url(${encodeURI(images[0])})`}
			backgroundSize={"cover"}
			backgroundPosition={"center"}
			backgroundRepeat={"no-repeat"}
			borderRadius={"0px 0px 0px 8px"}
		/>
		<Flex flexWrap={"wrap"} maxH={"100%"} maxW={"100%"}>
			<Img
				maxW={"50%"}
				src="https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
			/>
			<Img
				maxW={"50%"}
				src="https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
			/>
			<Img
				borderRadius={"0px 0px 8px 0px"}
				src="https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
			/>
		</Flex>
	</Grid>
);
