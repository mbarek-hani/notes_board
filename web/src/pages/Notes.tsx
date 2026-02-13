import Controls from "../components/Controls";
import NoteCard from "../components/NoteCard";
import useNotesContext from "../hooks/useNotesContext";

function Notes() {
	const { notes } = useNotesContext();

	return (
		<div>
			{notes.map((note) => (
				<NoteCard note={note} key={note._id} />
			))}
			<Controls />
		</div>
	);
}

export default Notes;
