import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { commentCreate } from "../../api/community"
import { useCookies } from 'react-cookie'

import styled from "styled-components"
import { Button, TextField } from "@mui/material"

function CommentForm(params) {
    const location = useLocation()
    
    const board_id = params.board_id
    const [ comment, setComment ] = useState("")
    // const [userInfo, setUesrInfo] = useState([])
    const [cookie, ] = useCookies(["userInfo"])

    const onTypingHandler = (e) => {
        setComment(e.target.value)
    }

    function onSubmitClickHandler() {
        if (comment === undefined){
            alert("댓글 내용이 없습니다!")
        } else if (comment.trim() === "") {
            alert("댓글엔 공백이 아닌 문자가 있어야 합니다!!")
        } else if (comment.length > 255) {
            alert("댓글의 길이는 최대 255자 까지입니다.")
        } else {
            commentCreate(
                {
                    content: comment,
                    board_id: board_id,
                    writer: localStorage.userId,
                    'Authorization': cookie.userInfo.jwt_token,
                    'refreshToken': cookie.userInfo.refresh_token,
                },
                () => {
                    setComment("")
                    params.isRenderNeeded()
                    alert("댓글 작성 완료")
                },
            )
        }
    }


    return (
        <CommentFormBox>
            <TextField value={comment} onChange={onTypingHandler} size="small" style={{width: "60%"}} />
            <Link to={location.pathname} state={{id: board_id}} style={{textDecoration: "none"}}>
                <Button onClick={onSubmitClickHandler} style={{background: "blue", marginLeft: "10px"}} variant="contained" >작성</Button>
            </Link>
        </CommentFormBox>
    )    
}

const CommentFormBox = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 30px;
`

export default CommentForm