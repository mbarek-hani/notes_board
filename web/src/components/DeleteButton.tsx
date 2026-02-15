import Trash from "./icons/Trash";
import { deleteNote } from "../api";
import useNotesContext from "../hooks/useNotesContext";
import { toast } from "react-toastify";

type DeleteButtonProps = {
	noteId: string;
};

function DeleteButton({ noteId }: DeleteButtonProps) {
	const { setNotes } = useNotesContext();

	async function handleDelete() {
		await deleteNote(noteId);
		setNotes((prevState) => prevState.filter((note) => note._id !== noteId));
		toast.success("the note was deleted successfully!");
	}

	return (
		<div onClick={handleDelete}>
			<Trash />
		</div>
	);
}

export default DeleteButton;
