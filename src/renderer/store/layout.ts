import { atom } from "jotai";

export enum LeftSidebarPanel {
  Note = 'Note',
  Task = 'Task'
}

interface Layout {
  leftSidebarOpen: boolean;
  leftSidebarWidth: number;
  leftSidebarMinWidth?: number;
  leftSidebarPanel?: LeftSidebarPanel
  rightSidebarOpen: boolean;
  rightSidebarWidth: number;
  rightSidebarMinWidth?: number;
}

export const layoutAtom = atom<Layout>({
  leftSidebarOpen: true,
  leftSidebarWidth: 320,
  leftSidebarMinWidth: 240,
  leftSidebarPanel: LeftSidebarPanel.Note,
  rightSidebarOpen: true,
  rightSidebarWidth: 320,
  rightSidebarMinWidth: 240,
});