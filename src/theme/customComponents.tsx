import {
	Box,
	BoxProps,
	Button,
	ButtonProps,
	StackProps,
	VStack,
	forwardRef
} from "@chakra-ui/react";
import { themeDarkGreen, themeGreen, themeWhite } from "./theme";

export const ButtonGreen = forwardRef<ButtonProps, "div">((props, ref) => (
	<Button
		sx={{
			"&:active": { bg: themeDarkGreen, color: themeWhite }
		}}
		ref={ref}
		{...props}
	/>
));

export const DropDownListContainer = forwardRef<StackProps, "div">(
	(props, ref) => (
		<VStack
			position={"absolute"}
			minWidth={"100%"}
			top={"48px"}
			alignItems={"left"}
			borderRadius={4}
			outline={`1px solid ${themeGreen}`}
			bg={"primary.dark"}
			zIndex={1}
			ref={ref}
			{...props}
		/>
	)
);

export const DropDownListSegment = forwardRef<BoxProps, "div">((props, ref) => (
	<Box
		width={"100%"}
		sx={{
			"&:hover": {
				backgroundColor: themeDarkGreen,
				cursor: "pointer"
			}
		}}
		padding={"4px 12px"}
		ref={ref}
		{...props}
	/>
));
