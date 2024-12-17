import { fetchNotes } from "../modules/note";

export const fetchNotesListener = async (): Promise<GetNotesResponse> => {
  const notes = await fetchNotes();
  return { success: true, data: notes };
}
