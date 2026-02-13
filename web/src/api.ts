import type { Note } from "./types";

const API_URL = "http://localhost:3005/api";

export async function getAllNotes(): Promise<Note[]> {
  try {
    const response = await fetch(`${API_URL}/notes`);
    if (!response.ok) {
      console.error("getAllNotes: server error");
      return [];
    }
    const data = (await response.json()) as Note[];
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknown error", error);
    }
    return [];
  }
}
