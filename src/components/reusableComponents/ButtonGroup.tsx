import { HStack } from "@chakra-ui/react";
import { FC } from "react";
import { ButtonGreen } from "../../theme/customComponents";

interface IButtonGroup {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dataArray: any[];
	onClickFunction: (value: number) => void;
}

export const ButtonGroup: FC<IButtonGroup> = ({
	dataArray,
	onClickFunction
}) => (
	<HStack>
		{dataArray.map(({ optionTitle, zoom }, index) => (
			<ButtonGreen
				key={`${optionTitle}-${index}`}
				value={zoom}
				size={"lg"}
				onClick={({ currentTarget }) =>
					onClickFunction(Number(currentTarget.value))
				}
			>
				{optionTitle}
			</ButtonGreen>
		))}
	</HStack>
);
