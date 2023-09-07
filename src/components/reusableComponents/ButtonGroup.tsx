import { Button, HStack } from "@chakra-ui/react";
import { FC } from "react";

interface IButtonGroup {
	dataArray: number[];
	onClickFunction: (value: number) => void;
}

export const ButtonGroup: FC<IButtonGroup> = ({
	dataArray,
	onClickFunction
}) => (
	<HStack>
		{dataArray.map((value, index) => (
			<Button
				key={`${value}-${index}`}
				value={value}
				onClick={({ currentTarget }) =>
					onClickFunction(Number(currentTarget.value))
				}
			>
				{value}
			</Button>
		))}
	</HStack>
);
