import { useEffect, useRef } from "react";
import Trash from "./icons/Trash";

type Note = {
  _id: string;
  body: string;
  colors: string;
  position: string;
};

type NoteCardProps = {
  note: Note;
};

function NoteCard({ note }: NoteCardProps) {
  let position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  function autoGrow(textAreaRef: React.RefObject<HTMLTextAreaElement | null>) {
    const { current } = textAreaRef;
    if (!current) return;
    current.style.height = "auto"; // Reset the height
    current.style.height = current.scrollHeight + "px"; // Set the new height
  }

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
