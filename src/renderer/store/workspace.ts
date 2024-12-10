import { Note, Task } from "@prisma/client";
import { atom } from "jotai";

export const noteListAtom = atom<Note[]>([]);

export const taskListAtom = atom<Task[]>([]);