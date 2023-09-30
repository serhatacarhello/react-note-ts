import { Badge, Button, Card, Container, Stack } from "react-bootstrap";
import { useNote } from "../../utils/UseNote";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

type PropsTypes = {
  deleteNote: (id: string) => void;
};

export default function NoteDetail(props: PropsTypes) {
  const { deleteNote } = props;
  const navigate = useNavigate();
  const note = useNote();
  console.log("🚀 ~ file: index.tsx:8 ~ NoteDetail ~ note:", note);

  return (
    <>
      <Container className="d-flex flex-column">
        <Card>
          <Card.Header>
            <Card.Title className="d-flex justify-content-between  align-items-center flex-wrap ">
              <Stack direction="horizontal" className="flex-wrap  ">
                <h3 className="font-monospace">Note Başlığı:</h3>
                <Header
                  title={note?.title}
                  Tag="h3"
                  design="text-capitalize ms-1"
                />
              </Stack>
              {/* buttons */}
              <Stack direction="horizontal" gap={2}>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("edit")}
                >
                  Düzenle
                </Button>

                <Button variant="danger" onClick={() => deleteNote(note.id)}>
                  Sil
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/")}
                >
                  Geri
                </Button>
              </Stack>
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <Card.Text>
              <Stack className="flex-wrap gap-2 my-1">
                <Header
                  title="Note İçerigi:"
                  Tag="h3"
                  design="fw-lighter fs-5 font-monospace"
                />
                <Markdown>{note.markdown}</Markdown>
              </Stack>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Stack
              direction="horizontal"
              className="flex-wrap gap-2 my-1 align-items-center"
            >
              <Header
                title="Etiketler:"
                Tag="h5"
                design="fw-norma font-monospace mt-1"
              />
              {note.tags?.map((tag) => (
                <Badge
                  bg="secondary"
                  className="text-warning  opacity-75 bg-opacity-25 px-2 fs-6 fw-light"
                >
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}
