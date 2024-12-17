import { Folder } from "@prisma/client";
import prisma from "./prisma";

interface CreateFolderPayload {
  name?: string;
  parentId?: string;
}

export const createFolder = async (payload: CreateFolderPayload): Promise<Folder> => {
  try {
    const { name, parentId } = payload;

    if (parentId) {
      const folder = await prisma.folder.findUnique({
        where: { id: parentId },
      });

      if (!folder) {
        throw new Error(`Folder with id ${parentId} not found`);
      }
    }

    return await prisma.folder.create({
      data: {
        name: name || "Untitled Folder",
        parentId: parentId || null
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteFolder = async (folder: string): Promise<boolean> => {
  try {
    await prisma.folder.delete({
      where: { id: folder }
    });

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const fetchFolders = async (): Promise<Folder[]> => {
  return await prisma.folder.findMany();
}