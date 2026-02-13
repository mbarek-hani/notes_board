import { fakeData as notes } from "../assets/fakeData";
import NoteCard from "../components/NoteCard";

function Notes() {
  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note._id} />
      ))}
    </div>
  );
}

export default Notes;
