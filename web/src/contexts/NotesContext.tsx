import { useState, useEffect, createContext } from "react";
import Spinner from "../components/icons/Spinner";
import { getAllNotes } from "../api";
import type { Note } from "../types";

type NotesContextType = {
	notes: Note[];
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
	selectedNote: Note | null;
	setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
} | null;

export const NotesContext = createContext<NotesContextType>(null);

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState<Note[]>([]);

	async function init() {
		const data = await getAllNotes();
		setNotes(data);
		setLoading(false);
	}

	useEffect(() => {
		init();
	}, []);

	const contextData = { notes, setNotes, selectedNote, setSelectedNote };

	return (
		<NotesContext.Provider value={contextData}>
			{loading ? (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
					}}
				>
					<Spinner size="100" />
				</div>
			) : (
				children
			)}
		</NotesContext.Provider>
	);
};

export default NotesProvider;
