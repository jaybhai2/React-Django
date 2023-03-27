import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor(props) {
  const [value, setValue] = React.useState(props.initialValue);

  function handleChange(newValue) {
    setValue(newValue);
    if (props.onChange) {
      props.onChange(newValue);
    }
  }

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, {'font': []}],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ]
      }}
      placeholder={props.placeholder}
    />
  );
}

export default TextEditor;
