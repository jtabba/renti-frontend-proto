import { Box, BoxProps, forwardRef } from "@chakra-ui/react";
import { themeDarkGreen, themeGrey, themeWhite } from "../../theme/theme";

export const ScrollContainer = forwardRef<BoxProps, "div">((props, ref) => (
	<Box
		h={"100%"}
		maxH={"100%"}
		w={"100%"}
		overflowY={"auto"}
		sx={{
			"&::-webkit-scrollbar": {
				width: "16px",
				borderRadius: "8px",
				backgroundColor: themeGrey,
				outline: `1px solid ${themeWhite}`
			},
			"&::-webkit-scrollbar-thumb": {
				backgroundColor: themeDarkGreen,
				borderRadius: "8px"
			}
		}}
		ref={ref}
		{...props}
	/>
));
