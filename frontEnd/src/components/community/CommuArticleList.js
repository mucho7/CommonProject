import { useState, useMemo } from "react"; 
import { useSearchParams } from "react-router-dom";

import { boardPaging, boardSearching } from "../../api/community";
import { CommuPaging, CommuArticleListItem } from "./index"

import styled from "styled-components"
import { Grid } from "@mui/material";

function CommuArticleList() {
    // const searchResult = useSelector(state => state.boardSearch)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ someArticle, setSomeArticle ] = useState({empty: true, content: [{id: 1, createdAt: "i dont know when i was born"}, {id: 2, createdAt: "i dont know when i was born"}]})
    // 일단은 8로 고정하고 심화기능이 필요하다면 변경하는 버튼을 추가 예정
    const [ pageSize ] = useState(8)
    const [ pageNumber, setPageNumber ] = useState(searchParams.get("page") ? searchParams.get("page") : 1)
    const [ maxPage, setMaxPage ] = useState(5)

    useMemo(() => {
        const target = searchParams.get("target")
        const word = searchParams.get("word")
        
        const enterBoard = async () => {
            await boardPaging(
                {size: pageSize, page: pageNumber, },
                (data) => {return data.data},
            ).then((data) => {
                setSomeArticle(data)
                setMaxPage(data.totalPages)
            })
        }

        const getSearchedList = async () => {
            await boardSearching(
                {searchTarget: target, searchWord: word, size: pageSize, page: pageNumber},
                (data) => {
                    return data.data
                },
            )
            .then((data) => {
                setSomeArticle(data)
                setMaxPage(data.totalPages)
            })
        }

        if (word !== null) {
            getSearchedList()
        } else {
            enterBoard()
        }
    }, [pageSize, pageNumber, searchParams])


    const onPagingClickHandler = (page) => {
        if (page.target === undefined) {
            setPageNumber(page)
        } else {
            setPageNumber(page.target.value)
            searchParams.set("page", page.target.value)
            setSearchParams(searchParams)
        }
    }

    return (
        <CommuArticleBox>
            <Grid container height={"620px"}>
                {someArticle.empty ? <div>해당 글 없음</div> 
                : someArticle.content.map(article => {
                    return (
                        <CommuArticleListItem key={article.id} article={article}/> 
                    )
                })}
                <Grid item xs={2}>
                </Grid>
            </Grid>
            <CommuPaging maxPage={maxPage} onClick={onPagingClickHandler}/>
        </CommuArticleBox>
    )
}

const CommuArticleBox = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    width: 100%;
    height: 100%;

`

export default CommuArticleList