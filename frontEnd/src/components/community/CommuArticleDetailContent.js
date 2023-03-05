/* eslint-disable */
import React, { useState, useEffect,  } from "react";

import MonacoEditor from "@monaco-editor/react"
// import * as monaco from "monaco-editor"

import styled from "styled-components";
import { Typography,  } from "@mui/material";

import myInlineDecoration from "./CommuArticleDetailContent.css"


function CommuArticleDetailContent(params) {
    const [ hoverTarget, setHoverTarget ] = useState([-1, -1])
    const [ target, setTarget ] = useState({isActive: false, key:-2, startIndex: -2, endIndex: -2})
    const [ monacoId, setMonacoId ] = useState(-2)
    const [editor, setEditor] = useState(null);

    const code = (params.content.code)
    const content = (params.content.content)

    const onEditorDidMount = (editor, monaco) => {
        setEditor(editor);
    };
    
    const onMouseEnterHandler = (startIndex, endIndex, uniqueKey) => {
        if (startIndex === -1){
            setHoverTarget({isActive: false, key:uniqueKey, startIndex: startIndex, endIndex: endIndex})
        } else {
            setHoverTarget({isActive: true, key: uniqueKey, startIndex: startIndex, endIndex: endIndex})
        }
    }
    const onMouseLeaveHandler = (startIndex, endIndex, uniqueKey) => {
        setHoverTarget({isActive: false, key:uniqueKey, startIndex: startIndex, endIndex: endIndex})
    }
    
    const onContentBlockClickHandler = (startIndex, endIndex, uniqueKey) => {
        if (startIndex === -1){
            setTarget({...target, isActive: false, key:uniqueKey})
        } else {
            setTarget({isActive: true, key: uniqueKey, startIndex: startIndex, endIndex: endIndex})
        }
    }   
    
    useEffect(() => {
        if (target.key === -2) return
        // const editor = monaco.editor.getModels()[0];
        if (target.isActive) {
            editor.deltaDecorations(monacoId, [])
            // editorRef.current.editor.setScrollPosition(target.startIndex)
            editor.revealLineInCenter(target.startIndex);
            setMonacoId(editor.deltaDecorations(
                [], 
                [{
                    range: new monaco.Range(target.startIndex + 1, 0, target.endIndex + 1, 0),
                    options: {
                        isWholeLine: true,
                        inlineClassName: 'myInlineDecoration'
                    }
                }],
            ))
        } else {
            editor.deltaDecorations(monacoId, [])
        }
    }, [target])

    return (
        <>
            <ContentSection >
                {content.map((item, uniqueKey) => {
                    return(
                        <StyeldCard 
                            onClick={() => onContentBlockClickHandler(item.startIndex, item.endIndex, uniqueKey)} onMouseEnter={() => onMouseEnterHandler(item.startIndex, item.endIndex, uniqueKey)} onMouseLeave={onMouseLeaveHandler} 
                            istarget={target.isActive && uniqueKey == target.key} ishovering={uniqueKey == hoverTarget.key && hoverTarget.isActive} key={uniqueKey}
                        >
                            {item.content.map((string, uniqueKey) => {
                                return(
                                    string === "" ? <br key={uniqueKey}/>  : <Typography key={uniqueKey}>{string}</Typography>
                                )
                            })}
                        </StyeldCard>
                    )
                })}
            </ContentSection>
            <Vr/>
            <CodeSection>
                <MonacoEditor language="java" onMount={onEditorDidMount} value={code} lineNumbers="on" options={{ readOnly: true }} theme="vs"/>
            </CodeSection>
        </>
    )
}

const ArticleContent = `
    width: 45%;
    height: auto;

    padding-top: 15px;
`
const ContentSection = styled.section`
    ${ArticleContent}
    overflow-y: scroll;

`
const CodeSection = styled.section`
    ${ArticleContent}   
    margin-top: 15px;
`
const Vr = styled.div`
    width: 1px;
    height: 100%;

    background: gray;
`

const StyeldCard = styled.div`
    margin: 15px 0 0 0;
    padding-left: 10px;
    border-radius: 10px;
    background-color: ${props => {if (props.ishovering) {return '#E5E5E5'} else if (props.istarget) {return "rgba(252, 163, 17, 0.5);"} else { return 'white'} }};
`

export default CommuArticleDetailContent
