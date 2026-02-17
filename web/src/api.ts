import type { Note, Stats, User } from "./types";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3005/api";
// admin
//const TOKEN = "Barze eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OTEwYTAyZjZiYjg0MThiNmJiYjcwZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzcxMTE0MTQ1LCJleHAiOjE3NzEyMDA1NDV9.2TyOKp5B05PJN241mn87YRlcF34tYkVqskfY5S7mPFc"
// user
const TOKEN =
  "Barze eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OTFjMTZiODIzMWEyMjdkN2E4MGY0NyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzExNTk5MTUsImV4cCI6MTc3MTI0NjMxNX0.FvjRJsX02PoEFClIoynHMu9kSd44R3F9MBGm4QBNkLs";

export async function getAllNotes(): Promise<Note[]> {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
    });
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
        Authorization: `${TOKEN}`,
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
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
        Authorization: `${TOKEN}`,
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

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/dashboard/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Couldn't load users");
    }
    const data = (await response.json()) as User[];
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

export async function getNotesCreatedLast7Days(): Promise<
  { _id: string; createdAt: string }[]
> {
  try {
    const response = await fetch(`${API_URL}/dashboard/notes/last-seven-days`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
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
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Error: " + error.message);
    } else {
      toast.error("Unknown error occured");
    }
    return [];
  }
}

export async function getStats(): Promise<Stats> {
  try {
    const response = await fetch(`${API_URL}/dashboard/notes/stats`);
    if (!response.ok) {
      throw new Error("Couldn't load stats");
    }
    const data = (await response.json()) as Stats;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Error: " + error.message);
    } else {
      toast.error("Unknown error occured");
    }
    return {
      total: 0,
      createdThisWeek: 0,
      createdToday: 0,
      updatedToday: 0,
      withBody: 0,
      emptyBody: 0,
    };
  }
}
