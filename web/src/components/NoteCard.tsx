import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import DeleteButton from "./DeleteButton";
import Spinner from "./icons/Spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import type { Note, Position, Colors } from "../types";
import { updateNote } from "../api";

type NoteCardProps = {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

function NoteCard({ note, setNotes }: NoteCardProps) {
  const colors: Colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);

  const [position, setPositon] = useState<Position>(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);

  const mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const keyUpTimer = useRef<number>(null);

  async function handleKeyUp() {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current?.value || "");
    }, 2000);
  }

  function mouseMove(e: MouseEvent) {
    //1 - Calculate move direction
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    //3 - Update card top and left position.
    if (!cardRef.current) return;
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPositon(newPosition);
  }

  function mouseDown(e: ReactMouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).className === "card-header") {
      setZIndex(cardRef.current);
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    if (!cardRef.current) return;
    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  }

  async function saveData(key: string, value: Colors | Position | string) {
    const payload = { [key]: JSON.stringify(value) };
    await updateNote(note._id, payload);
    setSaving(false);
  }

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  return (
    <div
      ref={cardRef}
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
        onMouseDown={mouseDown}
      >
        <DeleteButton noteId={note._id} setNotes={setNotes} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onKeyUp={handleKeyUp}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
