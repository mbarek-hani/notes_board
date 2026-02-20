import type { Note, Stats, User } from "./types";

export const API_URL = "http://localhost:3005/api";

async function apiFetch(url: string, options: RequestInit = {}) {
	const res = await fetch(`${API_URL}${url}`, {
		...options,
		credentials: "include",
	});
	if (res.status === 401) {
		throw new Error("Unauthorized");
	}
	return res;
}

export async function getAllNotes(): Promise<Note[]> {
	const response = await apiFetch("/notes", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error("Couldn't load notes");
	}
	const data = (await response.json()) as Note[];
	return data;
}

export async function updateNote(id: string, payload: any) {
	const response = await apiFetch(`/notes/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	if (!response.ok) {
		throw new Error("Couldn't update the note");
	}
}

export async function deleteNote(id: string) {
	const response = await apiFetch(`/notes/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error("Couldn't delete note");
	}
}

export async function addNote(payload: {
	position: string;
	colors: string;
}): Promise<Note | null> {
	const response = await apiFetch(`/notes`, {
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
}

export async function getAllUsers(): Promise<
	(User & { totalNotes: number })[]
> {
	const response = await apiFetch(`/dashboard/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error("Couldn't load users");
	}
	const data = (await response.json()) as (User & { totalNotes: number })[];
	return data;
}

export async function getNotesCreatedLast7Days(): Promise<
	{ _id: string; createdAt: string }[]
> {
	const response = await fetch(`/dashboard/notes/last-seven-days`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error("Couldn't load notes");
	}
	const data = (await response.json()) as {
		_id: string;
		createdAt: string;
	}[];
	return data;
}

export async function getStats(): Promise<Stats> {
	const response = await apiFetch(`/dashboard/notes/stats`);
	if (!response.ok) {
		throw new Error("Couldn't load stats");
	}
	const data = (await response.json()) as Stats;
	return data;
}

export async function loginUser(data: {
	email: string;
	password: string;
}): Promise<{ success: boolean; user: User }> {
	const response = await apiFetch("/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error("Failed to log in");
	}
	const json = await response.json();
	return json;
}

export async function registerUser(data: {
	userName: string;
	email: string;
	password: string;
}): Promise<{ success: boolean; user: User }> {
	const response = await apiFetch("/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error("Failed to register user");
	}
	const json = (await response.json()) as { success: boolean; user: User };
	return json;
}

export async function logoutUser() {
	const response = await apiFetch("/auth/logout");
	if (!response.ok) {
		throw new Error("Failed to logout user");
	}
}
