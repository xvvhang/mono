import { fetchNotes } from "../modules/note";

export const fetchNotesListener = async (): Promise<FetchNotesResponse> => {
  const notes = await fetchNotes();
  return { success: true, data: notes };
}
