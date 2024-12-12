import prisma from "../modules/prisma";

export const fetchFoldersListener = async (): Promise<FetchFoldersResponse> => {
  const folders = await prisma.folder.findMany();
  return { success: true, data: folders };
}
