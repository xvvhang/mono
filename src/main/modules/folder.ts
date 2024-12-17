import { Folder } from "@prisma/client";
import prisma from "./prisma";

interface CreateFolderPayload {
  name?: string;
  parent: string;
}

export const createFolder = async (payload: CreateFolderPayload): Promise<Folder> => {
  return await prisma.folder.create({ data: { name: payload.name, parentId: payload.parent } });
}

// export const deleteFolder = async (folder: string): Promise<boolean> => {}

// interface UpdateFolderPayload {}

// export const updateFolder = async (folder: string, payload: UpdateFolderPayload): Promise<Folder> => {}

export const fetchFolders = async (): Promise<Folder[]> => {
  return await prisma.folder.findMany();
}