import { Note } from "@prisma/client";
import prisma from "./prisma";

// interface CreateNotePayload {}

// export const createNote = async (payload: CreateNotePayload): Promise<Note> => {}

// export const deleteNote = async (note: string): Promise<boolean> => {}

// interface UpdateNotePayload {}

// export const updateNote = async (note: string, payload: UpdateNotePayload): Promise<Note> => {}

export const fetchNotes = async (): Promise<Note[]> => {
  return await prisma.note.findMany();
}