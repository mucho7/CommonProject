import { useState,  } from "react"
import { Link, useLocation } from "react-router-dom"
import { commentDelete, commentUpdate } from "../../api/community"
import { useCookies } from 'react-cookie'

import { Card, Button, CardContent, Typography, Grid, ButtonGroup, TextField } from "@mui/material"

function Comments(props) {
    const location = useLocation()
    const [ updateFlag, setUpdateFlag ] = useState(false)
    const [ updateComment, setUpdateComment ] = useState("")
    const [ updateTarget, setUpdateTarget ] = useState("")
    
    // const [userInfo, setUesrInfo] = useState([])
    const [cookie, ] = useCookies(["userInfo"])

    const date = new Date()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')

    async function onDeleteClick(params) {
        const commentInfo = {
            pk: params.id,
            board_id:location.state.id,
            'Authorization': cookie.userInfo.jwt_token,
            'refreshToken': cookie.userInfo.refresh_token,
        }
        await commentDelete(
            commentInfo,
            () => {
                props.isRenderNeeded()
                alert("삭제 완료!")
            },
        )
    }

    const onTypingHandler = (e) => {
        setUpdateComment(e.target.value)  
    }

    async function onUpdateClick(params) {
        const commentInfo = {
            pk: params.id,
            content: updateComment,
            board_id:location.state.id,
            'Authorization': cookie.userInfo.jwt_token,
            'refreshToken': cookie.userInfo.refresh_token,
        }
        await commentUpdate(
            commentInfo,
            (data) => {
                setUpdateFlag(false)
                setUpdateTarget("")
                props.isRenderNeeded()
                alert("수정 완료!")
            },
        )
    }

    const flagClickHandler = (params) => {
        if (updateFlag) {
            onUpdateClick(params)

        }  else {
            setUpdateComment(params.content)
            setUpdateTarget(params.id)
            setUpdateFlag(true)
        }
    }


    return (
        <>{props.comments.content.map(comment => {
            const createdAt = comment.createdAt

            return (
                <Card sx={{ width: '100%', height: 'auto', margin: '4px'}} key={comment.id}>
                    <CardContent>
                        <Grid container style={{display: "flex", alignItems: "center"}}>
                            <Grid item xs={2} textAlign="center">
                                <Link to={`/useri/${comment.writer}`} style={{textDecoration: "none"}} >
                                    <Typography>{comment.writer}</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={7}>
                                {updateTarget !== comment.id ? <Typography style={{overflowWrap: "break-word"}}>{comment.content}</Typography> : <TextField onChange={onTypingHandler} value={updateComment} size="small" fullWidth/>}
                            </Grid>
                            <Grid item xs={1} textAlign="center">
                                {/* 오늘 /  이번 년 / 그 외 */}
                                {createdAt.slice(5, 7) === month
                                    ? createdAt.slice(8, 10) === day 
                                        ? parseInt(createdAt.slice(11, 13)) + 9 === parseInt(hour) 
                                            ? createdAt.slice(14, 16) === minute
                                                ? "방금 전"
                                            : parseInt(minute) - parseInt(createdAt.slice(14, 16)) + "분 전"
                                        : parseInt(hour) - parseInt(createdAt.slice(11, 13)) - 9 + "시간 전"
                                    : createdAt.slice(5, 10)
                                : createdAt.slice(5, 10)
                                }
                            </Grid>
                            <Grid item xs={2} textAlign="center">
                                {localStorage.getItem("userId") === comment.writer
                                ?   <ButtonGroup >
                                        {updateFlag === false ? <Button onClick={() => flagClickHandler(comment)} style={{color: "#FCA311", border: "solid 1px #FCA311"}}><b>수정</b></Button> : <Button variant="outlined" style={{color: "red", border: "solid 1px red"}} onClick={() => {setUpdateFlag(false); setUpdateTarget("");}}>취소</Button>}
                                        {updateFlag === false ? <Button onClick={() => onDeleteClick(comment)} style={{color: "red", border: "solid 1px red"}}><b>삭제</b></Button> : <Button variant="contained" style={{background: "#FCA311", border: "solid 1px #FCA311"}} onClick={() => flagClickHandler(comment)}>완료</Button> }
                                    </ButtonGroup>
                                : <></>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                )
        })}</>
    )
}

export default Comments