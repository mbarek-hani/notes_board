import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

export default function useNotesContext() {
	const notesContext = useContext(NotesContext);
	if (!notesContext) {
		throw new Error(
			"useNotesContext must be used in a component that is a child of NotesContextProvider",
		);
	}
	return notesContext;
}
