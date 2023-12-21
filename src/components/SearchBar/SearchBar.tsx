import { Input, VStack } from "@chakra-ui/react";
import { useState, FC } from "react";
import { DropDownList } from "./DropDownList";

interface ISearchBar {
	searchBarWidth: string;
}

export const SearchBar: FC<ISearchBar> = ({ searchBarWidth }) => {
	const [searchSuburb, setSearchSuburb] = useState<string>("");

	return (
		<VStack position={"relative"} width={searchBarWidth}>
			<Input
				width={"100%"}
				size={"lg"}
				placeholder="Search..."
				id="suburb"
				onChange={({ currentTarget: { value } }) =>
					setSearchSuburb(value)
				}
				focusBorderColor={"primary.white"}
				value={searchSuburb}
				sx={{
					color: "primary.white",
					fontSize: "lg"
				}}
				autoComplete="off"
			/>

			<DropDownList searchSuburb={searchSuburb} />
		</VStack>
	);
};
