import Trash from "./icons/Trash";
import { deleteNote } from "../api";
import useNotesContext from "../hooks/useNotesContext";

type DeleteButtonProps = {
	noteId: string;
};

function DeleteButton({ noteId }: DeleteButtonProps) {
	const { setNotes } = useNotesContext();

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
