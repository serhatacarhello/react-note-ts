import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./pages/new-note";
import { useMemo } from "react";
import { NoteDataType, RawNote, Tag } from "./Types";
import { useLocaleStorage } from "./utils/UseLocaleStorage";
import { v4 as uuidv4 } from "uuid";
import MainPage from "./pages/main-page";
import Layout from "./components/Layout";
import EditNote from "./pages/edit-note";
import NoteDetail from "./pages/note-detail";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  function onCreateNote({ tags, ...data }: NoteDataType) {
    setNotes((prev) => {
      return [
        ...prev,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
    console.log(data, tags);
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
    console.log("add tag calsıtı", tag);
  }

  const noteWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);
  console.log(
    "🚀 ~ file: App.tsx:34 ~ noteWithTags ~ noteWithTags:",
    noteWithTags
  );

  const deleteNote = (id: string) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    console.log("note silindi", id);
  };

  const updateNote = (id: string, { tags, ...data }: NoteDataType) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        // if note in
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      })
    );
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={noteWithTags} availableTags={tags} />}
        />
        <Route
          path="/new-note"
          element={
            <NewNote
              onSubmit={onCreateNote}
              availableTags={tags}
              addTag={addTag}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          <Route index element={<NoteDetail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                updateNote={updateNote}
                addTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;
