import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Trash from "./icons/Trash";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils.js";
import type { Note, Position, Colors } from "../types.js";

type NoteCardProps = {
  note: Note;
};

function NoteCard({ note }: NoteCardProps) {
  const colors: Colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);

  const [position, setPositon] = useState<Position>(JSON.parse(note.position));

  const mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
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
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
  re;
}

export default NoteCard;
