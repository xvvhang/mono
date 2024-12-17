import { Note } from "@prisma/client";
import prisma from "./prisma";

interface CreateNotePayload {
  title?: string;
  folderId?: string;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  try {
    const { title, folderId } = payload;

    if (folderId) {
      const folder = await prisma.folder.findUnique({
        where: { id: folderId },
      });

      if (!folder) {
        throw new Error(`Folder with id ${folderId} not found`);
      }
    }

    return await prisma.note.create({
      data: {
        title: title || "Untitled Note",
        folderId: folderId || null
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteNote = async (noteId: string): Promise<boolean> => {
  try {
    await prisma.note.delete({
      where: { id: noteId }
    });

    return true;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export const fetchNotes = async (): Promise<Note[]> => {
  return await prisma.note.findMany();
}