import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const themeDark = "#242424";
export const themeGrey = "#717171";
export const themeGreen = "#23C629";
export const themeDarkGreen = "#07910C";
export const themeWhite = "#F0F0F0";

export const customTheme = extendTheme({
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				bg: mode("#242424", "#242424")(props)
			}
		})
	},
	colors: {
		primary: {
			white: themeWhite,
			dark: themeDark,
			grey: themeGrey,
			main: themeGreen,
			secondary: themeDarkGreen,
			500: themeDark
		}
	},
	textStyles: {
		header: {
			fontSize: ["md", "lg", "xl", "2xl"],
			fontWeight: "bold"
			// margin: "30px"
		},
		body: {
			fontSize: ["sm", "md", "lg", "xl"],
			margin: "15px",
			color: "primary.white"
		},
		description: {
			fontSize: ["sm", "md", "lg", "xl"]
		},
		caption: {
			fontSize: ["smaller", "sm", "md"],
			margin: 0,
			color: "primary.dark"
			// fontWeight: "500"
		},
		error: {
			fontSize: ["xs", "smaller", "sm", "md"],
			margin: 0,
			color: "primary.white",
			borderBottom: "1px solid red"
		}
	}
});
