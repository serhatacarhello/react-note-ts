import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as yup from "yup";
import ReactSelect from "react-select/creatable";
import { Stack } from "react-bootstrap";
import { NoteDataType, Tag } from "../../Types";
import { NewNotePropsTypes } from "../../pages/new-note";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
// import MarkdownEditor from "@uiw/react-markdown-editor";

interface ValidationSchema {
  [key: string]: yup.StringSchema<string>;
}

function NoteForm(props: NewNotePropsTypes) {
  const {
    onSubmit,
    availableTags,
    addTag,
    title = "",
    markdown = "",
    tags = [],
  } = props;
  console.log(
    "🚀 ~ file: NoteForm.tsx:27 ~ NoteForm ~ availableTags:",
    availableTags
  );

  // tags added for  initial value
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  // const [markdownArea, setMarkdownArea] = useState(markdown);
  const navigate = useNavigate();
  console.log(
    "🚀 ~ file: NoteForm.tsx:27 ~ NoteForm ~ selectedTags:",
    selectedTags
  );

  const initialValues: NoteDataType = {
    title,
    markdown,
    tags: [],
  };

  const schema: ValidationSchema = {
    title: yup.string().required("Title is required"),
    // tags: yup
    //   .array()
    //   .of(yup.string()) // Etiketlerin birer dize olduğunu belirtiyoruz
    //   .min(1, "En az bir etiket girmelisiniz.")
    //   .required("Bu alan zorunludur."),

    markdown: yup.string().required("Text is required"),
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape(schema),
    onSubmit: (values, { setSubmitting }) => {
      const updatedValues = { ...values, tags: [...selectedTags] };
      onSubmit(updatedValues);
      console.log("values", updatedValues);
      console.log("selectedTags", selectedTags);
      setSubmitting(false);

      navigate(-1);
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="6"
          controlId="validationFormik101"
          className="position-relative"
        >
          <Form.Label>Başlık</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.title && formik.touched.title}
            //
            defaultValue={title}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="6"
          controlId="validationFormik102"
          className="position-relative"
        >
          <Form.Label>Etiketler</Form.Label>

          <ReactSelect
            isMulti
            placeholder={"Etiket ekleyiniz..."}
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
                tags.map((tag) => ({ label: tag.label, id: tag.value }))
              )
            }
            onCreateOption={(label) => {
              const newTag: Tag = { id: uuidv4(), label };
              console.log("newTag", newTag);
              addTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary25: "hotpink",
                primary: "black", // border color
                neutral80: "gray", //text color
                neutral0: "black", // background color
              },
            })}
            isClearable={availableTags.some((v) => !v.label)}
          />
          {formik.touched.tags && formik.errors.tags && (
            <Form.Control.Feedback type="invalid">
              {typeof formik.errors.tags === "string" && formik.errors.tags}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="12"
          controlId="validationFormik103"
          className="position-relative"
        >
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            className="position-relative "
            rows={12}
            maxLength={340}
            as="textarea"
            type="text"
            placeholder="Text here..."
            name="markdown"
            value={formik.values.markdown}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.markdown && formik.touched.markdown}
          />

          <Form.Control.Feedback type="invalid">
            {formik.errors.markdown}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      {/* <MarkdownEditor
        value={markdown}
        height="200px"
        onChange={(value, viewUpdate) => setMarkdownArea(value)}
      /> */}
      <Stack direction="horizontal" gap={2} className="float-end">
        <Button type="submit">Kaydet</Button>
        <Button onClick={() => navigate(-1)} type="button" variant="secondary">
          İptal
        </Button>
      </Stack>
    </Form>
  );
}

export default NoteForm;
