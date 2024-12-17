import { IpcMainEvent, Menu, MenuItem } from "electron"
import { createNote, deleteNote } from "../modules/note";
import { createFolder, deleteFolder } from "../modules/folder";
import Channels from "../../shared/constants/channels";

export const contextFolderListener = (event: IpcMainEvent, payload?: ContextFolderPayload) => {
  const folderId = payload?.folderId;
  const menu = new Menu();
  
  const newNoteMenuItem = new MenuItem({
    label: "New Note",
    click: async () => {
      await createNote(payload);
      // TODO: notify renderer to fetch notes and folder;
    }
  });
  menu.append(newNoteMenuItem);

  const newFolderMenuItem = new MenuItem({
    label: "New Folder",
    click: async () => {
      const data = { parentId: folderId || null };
      await createFolder(data);
      // TODO: notify renderer to fetch folders;
    }
  });
  menu.append(newFolderMenuItem);

  if (folderId) {
    menu.append(new MenuItem({ type: "separator" }));

    const renameMenuItem = new MenuItem({
      label: "Rename",
      click: () => event.sender.send(Channels.renameFolderFromContextFolder, { folderId })
    });
    menu.append(renameMenuItem);

    const deleteMenuItem = new MenuItem({
      label: "Delete",
      click: async () => {
        await deleteFolder(folderId);
        // TODO: notify renderer to fetch folders;
      }
    });
    menu.append(deleteMenuItem);
  }

  menu.popup();
}

export const contextNoteListener = (event: IpcMainEvent, payload: ContextNotePayload) => {
  const noteId = payload.noteId;
  const menu = new Menu();

  const deleteMenuItem = new MenuItem({
    label: "Delete",
    click: async () => {
      await deleteNote(noteId);
    }
  });
  menu.append(deleteMenuItem);

  menu.popup();
}