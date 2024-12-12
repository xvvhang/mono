import prisma from "../modules/prisma";

export const fetchNotesListener = async (): Promise<FetchNotesResponse> => {
  const notes = await prisma.note.findMany();
  return { success: true, data: notes };
}
