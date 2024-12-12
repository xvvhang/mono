import prisma from "../modules/prisma";

export const fetchFoldersListener = async (): Promise<FetchFoldersResponse> => {
  const folders = await prisma.folder.findMany({
    include: { subFolders: true, notes: true }
  });
  return { success: true, data: folders };
}

export const fetchNotesListener = async (): Promise<FetchNotesResponse> => {
  const notes = await prisma.note.findMany();
  return { success: true, data: notes };
}
