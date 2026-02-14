import useNotesContext from "../hooks/useNotesContext";
import { updateNote } from "../api";
import type { Colors } from "../types";
import { toast } from "react-toastify";

function Color({ colors }: { colors: Colors }) {
	const { selectedNote, notes, setNotes } = useNotesContext();

	async function changeColor() {
		if (!selectedNote) {
			toast.warn("You must select a note before changing its colors!");
			return;
		}
		const currentNoteIndex = notes.findIndex(
			(note) => note._id === selectedNote._id,
		);

		const updatedNote = {
			...notes[currentNoteIndex],
			colors: JSON.stringify(colors),
		};

		const newNotes = [...notes];
		newNotes[currentNoteIndex] = updatedNote;
		setNotes(newNotes);

		await updateNote(selectedNote._id, {
			colors: JSON.stringify(colors),
		});
	}

	return (
		<div
			onClick={changeColor}
			className="color"
			style={{ backgroundColor: colors.colorHeader }}
		></div>
	);
}

export default Color;
