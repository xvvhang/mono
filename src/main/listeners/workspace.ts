import prisma from "../modules/prisma";

export const fetchNotesListener = async (): Promise<InvokeResponse> => {
  const notes = await prisma.note.findMany();
  return { success: true, data: notes };
}

export const fetchTasksListener = async (): Promise<InvokeResponse> => {
  const tasks = await prisma.task.findMany();
  return { success: true, data: tasks };
}