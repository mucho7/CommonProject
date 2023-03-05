import { useState, useMemo } from "react"
import { useCookies } from "react-cookie"
import { useLocation, Link, useNavigate } from "react-router-dom"

import { CommentForm, Comments, CommuArticleDetailContent } from "./index"
import { boardDetail, articleDelete } from "../../api/community"

import styled from "styled-components"
import { Button, Typography } from "@mui/material"
import CommuCommentPaging from "./CommuCommentPaging"

function CommuArticleDetail() {
    const navigate = useNavigate()
    const [ cookie ] = useCookies(["userInfo"])
    const location = useLocation()
    const pk = location.pathname.slice(-3, location.pathname.length)
    // const hit = location.state.hit

    const [ sival, setSival ] = useState(0)
    const [ pageNumber, setPageNumber ] = useState(1)
    const [ maxPage, setMaxPage ] = useState(5)
    const [article, setArticle ] = useState({
        id: "",
        title:"",
        content: [{content:[""], index: -1},],
        code: "",
        comments: {
            empty: true,
            totalPages: 1,
        },
        // hit: hit
    })
    
    useMemo(() => {
        const getArticlelDetail = async () => {
            await boardDetail(
                {pk: pk, pageNumber: pageNumber},
                (data) => {
                    return data
                },
            ).then((res) => {
                setArticle(res.data)
                setMaxPage(res.data.comments.totalPages)
            })
        }
        getArticlelDetail()
        console.log(`IT RENDERED ${sival} TIME`)
    }, [pk, pageNumber, sival])

    

    async function onClickDeleteHandler(params) {
        await articleDelete(
            {
                pk: pk,
                jwt_token: cookie.userInfo.jwt_token,
                refresh_token: cookie.userInfo.refresh_token,
            },
            () => {
                navigate("/community")
            },
            )
    }

    const onPagingClickHandler = (page) => {
        if (page.target === undefined) {
            setPageNumber(page)
        } else {
            setPageNumber(page.target.value)
        }
    }

    return (
        <>
            <TitleSection>
                <h2>{article.title}</h2>
                {localStorage.userId && article.writer === localStorage.userId 
                ?  
                    <div>
                        <Link to={`/community/update/${pk}`} state={article} style={{textDecoration: "none"}}>
                            <Button style={{color: "#FCA311", border: "solid 1px #FCA311"}} variant="outlined"><b>수정</b></Button>
                        </Link>
                        <Button onClick={onClickDeleteHandler} style={{background: "red", marginLeft: "10px"}} variant="contained">삭제</Button>
                    </div>
                : ""}
            </TitleSection>
            <hr/>
            <ArticleSection>
                <CommuArticleDetailContent content={article} />
            </ArticleSection>
            <hr/>
            <CommentSectiom>
                {window.localStorage.getItem("userId") !== null ? <CommentForm isRenderNeeded={() => setSival(sival + 1)} board_id={pk}/> : <Typography textAlign={"center"}>로그인 하시면 댓글을 쓸 수 있어요</Typography>}
                {article.comments.empty ? <Typography textAlign={"center"} style={{marginTop: "15px"}} >아직 댓글이 없어요!</Typography> : <Comments isRenderNeeded={() => setSival(sival + 1)} comments={article.comments}/> }
                <CommuCommentPaging maxPage={maxPage} onClick={onPagingClickHandler}/>
            </CommentSectiom>
        </>
    )
}

const TitleSection = styled.section`
    width: 100%;

    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ArticleSection = styled.section`
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: space-around;
`
const CommentSectiom = styled.section`
    width: 100%;
    margin-top: 15px;

`



export default CommuArticleDetail