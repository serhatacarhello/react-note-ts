export type Tag = {
  label: string;
  id: string;
};

export type NoteDataType = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type NoteType = {
  id: string;
} & NoteDataType;


//localStorage notes type
export type RawNote ={
    id:string
} &RawNoteData

export type RawNoteData ={
    title:string;
    markdown:string;
    tagIds:string[]
}