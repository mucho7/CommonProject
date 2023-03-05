import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { onChangeCode } from "../../../store/compileSlice";
import { useDispatch, useSelector } from "react-redux";
import Compiler from "./Compiler";

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco'
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import { useEffect } from "react";


function Ide(props) {
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const isCompileButtonOn = useSelector((state) => state.toolBarAction.isCompileButtonOn);
  
  const dispatch = useDispatch();
  
    
  // WebRTC
  const editorRef = useRef(null);
  const providerRef = useRef(null);
  const docRef = useRef(null);
  const bindingRef = useRef(null);
  const { roomId } = useParams();
  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    docRef.current = new Y.Doc();
    providerRef.current = new WebrtcProvider(`monaco-${roomId}`, docRef.current);
    const yText = docRef.current.getText("monaco");

    bindingRef.current = new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      providerRef.current.awareness
    );
  }

  useEffect(() => {
    return () => {
      providerRef.current?.disconnect();
      docRef.current?.destroy();
    }
  }, [])

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <Editor 
        id="editor"
        options={{fontSize: 16, minimap: { enabled: false }, scrollbar: { vertical: "auto", horizontal: "auto" }}}
        width="100%"
        height={isCompileButtonOn ? "calc(100% - 300px)" : "100%"}
        language={userLanguage}
        theme={userTheme}
        defaultValue="# 코드를 입력하세요."
        value={userCode}
        onChange={(value) => {
          setUserCode(value)
          dispatch(onChangeCode(value))
        }}
        sx={{ m: 0, flexGrow: 1 }}
        onMount={handleEditorDidMount}
      />
      {isCompileButtonOn && <Compiler />}
    </Box>
  );
}

export default Ide;