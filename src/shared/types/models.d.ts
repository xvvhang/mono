/// <reference types="@prisma/client" />

import { Folder } from "@prisma/client";

declare global {
  interface FolderWithSubFoldersAndNotes extends Folder {
    subFolders: Folder[];
    notes: Note[];
  }
}

export {}