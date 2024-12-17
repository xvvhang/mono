import { fetchFolders } from "../modules/folder";

export const fetchFoldersListener = async (): Promise<FetchFoldersResponse> => {
  const folders = await fetchFolders();
  return { success: true, data: folders };
}
