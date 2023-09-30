import { Navigate, Outlet, useParams } from "react-router-dom";
import { NoteType } from "../Types";

type PropsTypes = {
  notes: NoteType[];
};

export default function Layout(props: PropsTypes) {
  const { notes } = props;

  const params = useParams();
  console.log("🚀 ~ file: Layout.tsx:11 ~ Layout ~ params:", params);
  const currentNoteId = params?.id;
  console.log(
    "🚀 ~ file: Layout.tsx:13 ~ Layout ~ currentNoteId:",
    currentNoteId
  );

  //find note
  const currentNote = notes.find((note) => note.id === currentNoteId);
  console.log("🚀 ~ file: Layout.tsx:20 ~ Layout ~ currentNote:", currentNote);

  if (!currentNote) return <Navigate to={"/"} replace={true} />;

  return <Outlet context={currentNote} />;
}

//in utils folder
// export function useNote (){
//     return useOutletContext<NoteType>()
// }
