import { useOutletContext } from "react-router-dom";
import { NoteType } from "../Types";

export function useNote() {
  return useOutletContext<NoteType>();
}
