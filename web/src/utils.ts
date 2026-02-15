import type { Position } from "./types";

export function setNewOffset(
	card: HTMLDivElement,
	mouseMoveDir: Position = { x: 0, y: 0 },
): Position {
	const offsetLeft = card.offsetLeft - mouseMoveDir.x;
	const offsetTop = card.offsetTop - mouseMoveDir.y;

	return {
		x: offsetLeft < 0 ? 0 : offsetLeft,
		y: offsetTop < 0 ? 0 : offsetTop,
	};
}

export function autoGrow(
	textAreaRef: React.RefObject<HTMLTextAreaElement | null>,
) {
	const { current } = textAreaRef;
	if (!current) return;
	current.style.height = "auto"; // Reset the height
	current.style.height = current.scrollHeight + "px"; // Set the new height
}

export function setZIndex(selectedCard: HTMLDivElement | null) {
	if (!selectedCard) return;
	selectedCard.style.zIndex = "999";

	const cards = Array.from(
		document.getElementsByClassName("card"),
	) as HTMLDivElement[];
	cards.forEach((card) => {
		if (card !== selectedCard) {
			card.style.zIndex = String(Number(selectedCard.style.zIndex) - 1);
		}
	});
}

export function bodyParser(value: string): string {
	try {
		JSON.parse(value);
		return JSON.parse(value);
	} catch {
		return value;
	}
}

export function initialsFromEmail(email?: string) {
	const s = (email ?? "").trim();
	if (!s) return "GU";
	const left = s.split("@")[0] ?? s;
	const parts = left.split(/[._\- ]+/).filter(Boolean);
	const a = (parts[0]?.[0] ?? left[0] ?? "G").toUpperCase();
	const b = (parts[1]?.[0] ?? left[1] ?? "U").toUpperCase();
	return `${a}${b}`;
}
