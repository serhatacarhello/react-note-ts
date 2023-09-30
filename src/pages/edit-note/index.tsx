import { NoteDataType, Tag } from "../../Types";
import Header from "../../components/Header";
import NoteForm from "../../components/form/NoteForm";
import { useNote } from "../../utils/UseNote";

type PropsTypes = {
  updateNote: (id: string, data: NoteDataType) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};
export default function EditNote(props: PropsTypes) {
  const { updateNote, addTag, availableTags } = props;
  const note = useNote();
  console.log("🚀 ~ file: index.tsx:14 ~ EditNote ~ note:", note)
  return (
    <>
      <Header title="Notu Düzenle" Tag="h2" />
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => updateNote(note.id, data)}
        addTag={addTag}
        availableTags={availableTags}
      />
    </>
  );
}
