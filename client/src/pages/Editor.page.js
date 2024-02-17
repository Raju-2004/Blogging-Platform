import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import UploadForm from "../Components/UploadForm";
import EditorJS from "@editorjs/editorjs";
import BlogEditor from "../Components/Editor.component";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext(blogStructure);

const Editor = () => {
  const [blog, setBlog] = useState(blogStructure); // Provide default value for blog state

  const { userAuth, setUserAuth } = useContext(UserContext);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor , setTextEditor] = useState({isReady : false})
  console.log(userAuth);

  return (
    <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState,textEditor, setTextEditor }}>
      {editorState === "editor" ? <BlogEditor /> : <UploadForm/> }
    </EditorContext.Provider>
  );
};

export default Editor;
