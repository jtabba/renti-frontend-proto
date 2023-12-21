import { Flex, Grid, Img } from "@chakra-ui/react";
import { FC } from "react";
import { themeDarkGreen } from "../../theme/theme";

interface IPropertyImages {
	images: string[];
}

export const PropertyImages: FC<IPropertyImages> = ({ images }) => (
	<Grid gridTemplateColumns={"4fr 2fr"}>
		<Img
			src={images[0]}
			borderRadius={"0px 0px 0px 8px"}
			borderTop={`2px solid ${themeDarkGreen}`}
			referrerPolicy="no-referrer"
		/>
		<Flex
			flexWrap={"wrap"}
			borderLeft={`2px solid ${themeDarkGreen}`}
			borderTop={`2px solid ${themeDarkGreen}`}
			maxH={"100%"}
			maxW={"100%"}
		>
			{images.slice(0, 6).map((image, index) => (
				<Img
					key={image}
					maxW={"50%"}
					borderRadius={index === 5 ? "0px 0px 8px 0px" : 0}
					src={image}
					referrerPolicy="no-referrer"
				/>
			))}
		</Flex>
	</Grid>
);

{
	/* <Box
	maxW={"100%"}
	height={"auto"}
	background={`url(${encodeURI(images[0])})`}
	backgroundSize={"cover"}
	backgroundPosition={"center"}
	backgroundRepeat={"no-repeat"}
	borderRadius={"0px 0px 0px 8px"}
/> */
}
