import type { Note } from "./types";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3005/api";

export async function getAllNotes(): Promise<Note[]> {
	try {
		const response = await fetch(`${API_URL}/notes`);
		if (!response.ok) {
			throw new Error("Couldn't load notes");
		}
		const data = (await response.json()) as Note[];
		return data;
	} catch (error) {
		if (error instanceof Error) {
			toast.error("Error: " + error.message);
		} else {
			toast.error("Unknown error occured");
		}
		return [];
	}
}

export async function updateNote(id: string, payload: any) {
	try {
		const response = await fetch(`${API_URL}/notes/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			throw new Error("Couldn't update the note");
		}
	} catch (error) {
		if (error instanceof Error) {
			toast.error("Error: " + error.message);
		} else {
			toast.error("Unknown error occured");
		}
	}
}

export async function deleteNote(id: string) {
	try {
		const response = await fetch(`${API_URL}/notes/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Couldn't delete note");
		}
	} catch (error) {
		if (error instanceof Error) {
			toast.error("Error: " + error.message);
		} else {
			toast.error("Unknown error occured");
		}
	}
}

export async function addNote(payload: {
	position: string;
	colors: string;
}): Promise<Note | null> {
	try {
		const response = await fetch(`${API_URL}/notes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			throw new Error("Couldn't add note");
		}
		const data = (await response.json()) as Note;
		return data;
	} catch (error) {
		if (error instanceof Error) {
			toast.error("Error: " + error.message);
		} else {
			toast.error("Unknown error occured");
		}
		return null;
	}
}
