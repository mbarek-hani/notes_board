import Plus from "./icons/Plus";
import colors from "../assets/colors.json";
import { useRef } from "react";
import useNotesContext from "../hooks/useNotesContext";
import { addNote as addNoteApi } from "../api";

const AddButton = () => {
	const { setNotes } = useNotesContext();
	const startingPos = useRef(10);

	const addNote = async () => {
		const payload = {
			position: JSON.stringify({
				x: startingPos.current,
				y: startingPos.current,
			}),
			colors: JSON.stringify(colors[0]),
			body: "",
		};

		startingPos.current += 10;

		const response = await addNoteApi(payload);
		if (!response) return;
		setNotes((prevState) => [response, ...prevState]);
	};

	return (
		<div id="add-btn" onClick={addNote}>
			<Plus />
		</div>
	);
};

export default AddButton;
