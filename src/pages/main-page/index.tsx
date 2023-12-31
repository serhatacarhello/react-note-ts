import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import Header from "../../components/Heading";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import ReactSelect from "react-select";
import { Tag } from "../../Types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type NoteType = {
  tags: Tag[];
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
};

type PropsTypes = {
  notes: NoteType[];
  availableTags: Tag[];
};

export default function MainPage(props: PropsTypes) {
  const { notes, availableTags } = props;

  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, title, selectedTags]);

  return (
    <>
      <Container>
        {/* heading field */}
        <Stack
          direction="horizontal"
          className="justify-content-between flex-wrap mb-3 shadow-sm  "
        >
          <Header Tag="h1" title="Notlar" />
          <Stack direction="horizontal" className="flex-wrap">
            <Link to={"/new-note"}>
              <Button variant="outline-primary" className="me-1 mb-1" size="sm">
                Yeni Not Oluştur
              </Button>
            </Link>
          </Stack>
        </Stack>
        {/* form field */}
        <Form>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              controlId="validationFormik101"
              className="position-relative "
            >
              <Form.Label>Başlığa göre ara</Form.Label>
              <Form.Control
                type="text"
                name="title"
                required
                placeholder="* Javascript ..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Etikete göre ara</Form.Label>

              <ReactSelect
                isMulti
                placeholder={"Etiket seçiniz..."}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: "blue", // option bg color on hover
                    primary: "black", // border color
                    neutral80: "gray", //text color
                    neutral0: "black", // background color
                  },
                })}
              />
            </Form.Group>
          </Row>
        </Form>
        <Container>
          <Row>
            {filteredNotes.map((note) => (
              <Col key={note.id} lg={4} md={6} sm={8} xs={12} className="mb-2">
                <Card
                  className="bg-body-tertiary text-muted w-100"
                  // style={{ width: "18rem" }}
                >
                  <Card.Body>
                    <Card.Title className="text-capitalize">
                      {note.title}
                    </Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">
                      Card Subtitle{" "}
                    </Card.Subtitle> */}
                    <Card.Text className="bg-tertiary">
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {note.markdown.length > 50
                          ? note.markdown.substring(0, 50) + " " + "..."
                          : note.markdown}
                      </Markdown>
                    </Card.Text>
                    <Stack
                      direction="horizontal"
                      className="flex-wrap gap-2 my-1"
                    >
                      {note.tags?.map((tag) => (
                        <Badge
                          bg="secondary"
                          className="text-warning opacity-75 px-2 fs-6 fw-light"
                        >
                          {tag.label}
                        </Badge>
                      ))}
                    </Stack>
                    <Link to={`/${note.id}`}>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="mt-2 float-end "
                      >
                        Detaylar
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}
