import { fileTreeAtom } from "@/renderer/store/files";
import { useAtom } from "jotai";

const NotePanel: React.FC = () => {
  const [fileTree] = useAtom(fileTreeAtom);
  return (
    <div>
      Note Panel
      {
        JSON.stringify(fileTree)
      }
    </div>
  )
}

export default NotePanel;