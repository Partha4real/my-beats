import { Grid, InputLabel } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function TextEditor({
  half,
  label,
  value,
  handleEditorChange,
  required,
  hasErrors,
  formState,
}) {
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      <InputLabel required={required}>{label}</InputLabel>
      <QuillNoSSRWrapper
        value={value}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        theme="snow"
      />
      {hasErrors && hasErrors("image") ? (
        <FormHelperText style={{ color: "red" }}>
          {hasErrors && (hasErrors(name) ? formState?.errors[name][0] : null)}
        </FormHelperText>
      ) : null}
    </Grid>
  );
}
