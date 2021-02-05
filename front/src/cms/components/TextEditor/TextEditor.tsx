import React, { useContext, useEffect, useState } from "react";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { AppContext } from "../../../context";

import "./TextEditor.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const TextEditor: React.FC = () => {
  const {
    editorContent,
    setEditorContent,
    resetEditorContent,
    setResetEditorContent,
  } = useContext(AppContext);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      // @ts-ignore: Unreachable code error
      ContentState.createFromBlockArray(convertFromHTML(editorContent))
    )
  );

  useEffect(() => {
    if (resetEditorContent) {
      setEditorState(
        EditorState.createWithContent(
          // @ts-ignore: Unreachable code error
          ContentState.createFromBlockArray(convertFromHTML(editorContent))
        )
      );
      setResetEditorContent(false);
    }
  }, [resetEditorContent]);

  const handleonChange = () => {
    setEditorContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <div>
      <Editor
        onChange={() => handleonChange()}
        toolbarClassName="toolbarClass"
        wrapperClassName="wrapperClass"
        editorClassName="editorClass"
        editorState={editorState}
        onEditorStateChange={(editorState) => setEditorState(editorState)}
      />
    </div>
  );
};
