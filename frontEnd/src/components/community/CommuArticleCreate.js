import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import MonacoEditor from "@monaco-editor/react"

import { articleCreate } from "../../api/community"

import styled from "styled-components"
import { Button, TextField, Select, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ArticleCreate() {
    const navigate = useNavigate()
    const [ cookie ] = useCookies(["userInfo"])
    const [inputTitle, setInputTitle ] = useState()
    const [inputContent, setInputContent ] = useState()
    const [inputCode, setInputCode] = useState()
    const [inputImg, setInputImg] = useState(null)
    const [ monacoLang, setMonacoLang ] = useState("java")
    
    // 로그인 안했다면 퇴장
    useEffect(() => {
        if (cookie?.userInfo === undefined || localStorage.getItem("userId") === null) {
            navigate('/useri/login')
            alert("로그인이 필요한 서비스입니다.")
        }
    }, [cookie, navigate])

    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'title':
                setInputTitle(e.target.value)
                break
            case 'content':
                setInputContent(e.target.value)
                break
            default:
                // nothing
        }
    }

    const onCodeTypingHandler = (e) => {
            setInputCode(e)
    }

    const onSelectHandler = (e) => {
        setMonacoLang(e.target.value)
    }

    const onImageChangeHandler = (e) => {
        setInputImg(e.target.files[0])
    }

    const newArticle ={
        title: inputTitle,
        content: inputContent,
        code: inputCode,
        writer: window.localStorage.getItem("userId"),
        profile_img: inputImg, 
        jwt_token: cookie.userInfo?.jwt_token,
        refresh_token: cookie.userInfo?.refresh_token
    }
    
    async function onClickHandler() {
        if (inputTitle === undefined || inputContent === undefined || inputCode === undefined){
            alert("제목이나 내용은 필수 입력입니다!!")
        } else if (inputTitle.trim() === "" || inputContent.trim() === "" || inputCode.trim() === "") {
            alert("제목이나 내용엔 공백이 아닌 문자가 있어야 합니다!!")
        } else if (newArticle.title.length > 255) {
            alert("제목의 길이는 최대 255자 까지입니다.")
        } else if (newArticle.content.length > 10000) {
            alert("본문의 길이는 최대 10,000자 까지입니다.")
        } else if (newArticle.code.length > 10000) {
            alert("코드의 길이는 최대 10,000자 까지입니다.")
        } else {
            await articleCreate(
                newArticle,
                // 성공 시에 해당 글로 navigate 해야함, response에 따라 좀 달라질듯
                () => {
                    alert("작성완료")
                    navigate("/community")
                }
            )
        }
    }

    return (
        <>
            <TitleSection>
                <TextField onChange={onTypingHandler} id="title" autoFocus label="제목" fullWidth />
            </TitleSection>
            <hr/>
            <ArticleSection>
                <ContentSection >
                    <TextField onChange={onTypingHandler} id="content" placeholder="Content" minRows={18} fullWidth multiline style={{maxHeight: 450, overflowY: "auto"}} />
                </ContentSection>
                <Vr/>
                <CodeSection >
                    <MonacoEditor id="editor" height="430px" language={monacoLang} onChange={onCodeTypingHandler} />
                    <Select style={{position: "absolute", right: "13%", top: "590px"}} size="small" value={monacoLang} onChange={onSelectHandler}>
                        <MenuItem value={"java"}>java</MenuItem>
                        <MenuItem value={"javascript"}>javascript</MenuItem>
                        <MenuItem value={"python"}>python</MenuItem>
                        <MenuItem value={"csharp"}>C</MenuItem>
                        <MenuItem value={"cpp"}>C++</MenuItem>
                    </Select>
                </CodeSection>
            </ArticleSection>
            <hr/>
            <TitleSection>
                <TextField type="file" accept="image/*" onChange={onImageChangeHandler}
                InputProps={{
                    startAdornment: <CloudUploadIcon style={{marginRight: "15px"}} />,
                    
                }} />
                <Button onClick={onClickHandler} style={{background: "#FCA311"}} variant="contained">작성 완료</Button>
            </TitleSection>
            <hr/>
        </>
    )
}


const TitleSection = styled.section`
    width: 100%;

    padding-top: 15px;
    margin-bottom: 25px;

    display: flex;
    justify-content: space-between;
`
const ArticleSection = styled.section`
    width: 100%;
    height: 490px;

    display: flex;
    justify-content: space-around;
`
const ContentSection = styled.section`
    width: 45%;
    height: auto;

    padding-top: 15px;
`
const CodeSection = styled.section`
    width: 45%;
    height: auto;
    border: solid 1px black;
    border-radius: 5px;

    padding-top: 15px;
    margin-top: 15px;
    margin-bottom: 25px;

`
const Vr = styled.div`
    width: 1px;
    height: 100%;

    background: gray;
`
export default ArticleCreate