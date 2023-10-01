import { NoteDataType, Tag } from "../../Types";
import Header from "../../components/Heading";
import NoteForm from "../../components/form/NoteForm";

export type NewNotePropsTypes = {
  onSubmit: (data: NoteDataType) => void;
  availableTags: Tag[];
  addTag: (tag: Tag) => void;
} & Partial<NoteDataType>;
// Partial type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
// Make all properties in T optional

export default function NewNote(props: NewNotePropsTypes) {
  const { onSubmit, availableTags, addTag } = props;
  return (
    <>
      <Header title="Yeni Not Ekle" Tag="h1" />
      <NoteForm
        onSubmit={onSubmit}
        availableTags={availableTags}
        addTag={addTag}
      />
    </>
  );
}
