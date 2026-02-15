import AddButton from "./AddButton";
import allColors from "../assets/colors.json";
import Color from "./Color";
import LogoutButton from "./LogoutButton";

const Controls = () => {
	return (
		<div id="controls">
			<AddButton />
			{allColors.map((colors) => (
				<Color key={colors.id} colors={colors} />
			))}
			<LogoutButton />
		</div>
	);
};

export default Controls;
