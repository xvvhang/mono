import { Workspace } from "@prisma/client";
import prisma from "./prisma";

let cached = false;
let cachedWorkspace: Workspace[] = [];

export const fetchWorkspaces = async (): Promise<Workspace[]> => {
  if (cached) return cachedWorkspace;
  cachedWorkspace = await prisma.workspace.findMany();
  cached = true;
  return cachedWorkspace;
}

export const createWorkspace = async (name: string): Promise<Workspace> => {
  cached = false;
  const workspace = await prisma.workspace.create({ data: { name } });
  cachedWorkspace = await fetchWorkspaces();
  return workspace;
}

export const deleteWorkspace = async (workspace: string): Promise<boolean> => {
  cached = false;
  await prisma.workspace.delete({ where: { id: workspace } });
  cachedWorkspace = await fetchWorkspaces();
  return true;
}

export const updateWorkspace = async (workspace: string, data: { name: string }): Promise<Workspace> => {
  cached = false;
  const updated = await prisma.workspace.update({ where: { id: workspace }, data });
  cachedWorkspace = await fetchWorkspaces();
  return updated;
}