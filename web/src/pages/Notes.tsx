import { useState, useEffect } from "react";
import type { Note } from "../types";
import NoteCard from "../components/NoteCard";
import { getAllNotes } from "../api";

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  async function init() {
    const data = await getAllNotes();
    setNotes(data);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note._id} />
      ))}
    </div>
  );
}

export default Notes;
