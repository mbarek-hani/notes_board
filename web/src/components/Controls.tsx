import AddButton from "./AddButton";
import allColors from "../assets/colors.json";
import Color from "./Color";

const Controls = () => {
	return (
		<div id="controls">
			<AddButton />
			{allColors.map((colors) => (
				<Color key={colors.id} colors={colors} />
			))}
		</div>
	);
};

export default Controls;
