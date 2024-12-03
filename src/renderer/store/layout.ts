import { atom } from "jotai";

interface Layout {
  leftSidebarOpen: boolean;
  leftSidebarWidth: number;
  leftSidebarPanel: "note" | "todo";
  rightSidebarOpen: boolean;
  rightSidebarWidth: number;
}

export const layoutAtom = atom<Layout>({
  leftSidebarOpen: true,
  leftSidebarWidth: 240,
  leftSidebarPanel: "note",
  rightSidebarOpen: true,
  rightSidebarWidth: 240,
});