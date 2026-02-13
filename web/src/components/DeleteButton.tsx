import Trash from "./icons/Trash";
import type { Note } from "../types";
import { deleteNote } from "../api";

type DeleteButtonProps = {
	noteId: string;
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

function DeleteButton({ noteId, setNotes }: DeleteButtonProps) {
	async function handleDelete() {
		await deleteNote(noteId);
		setNotes((prevState) => prevState.filter((note) => note._id !== noteId));
	}

	return (
		<div onClick={handleDelete}>
			<Trash />
		</div>
	);
}

export default DeleteButton;
