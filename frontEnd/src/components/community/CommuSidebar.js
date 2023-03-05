import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from "react-router-dom";

import { setBoardSearch } from "../../store/commuSearchSlice";
import { boardSearching } from "../../api/community";

import styled from "styled-components"
import { Search } from '@mui/icons-material';
import { IconButton, Button, TextField } from '@mui/material';

function CommuSidebar() {
    const dispatch = useDispatch()
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ searchTitle, serSearchTitle] = useState(null)
    const [ searchWriter, serSearchWriter] = useState(null)
    const [ searchContent, serSearchContent] = useState(null)

    const onTypingHandler = (e) => {
        switch (e.target.id) {
            case 'searchTitle':
                serSearchTitle(e.target.value)
                break
            case 'searchWriter':
                serSearchWriter(e.target.value)
                break
            case 'searchContent':
                serSearchContent(e.target.value)
                break
            default:
                // nothing
        }
    }

    const temp_search_info = {
        title: searchTitle,
        writer: searchWriter,
        content: searchContent,
    }

    const onSearchClickHandler = () => {
        const getSearchedList = async () => {
            await boardSearching(
                temp_search_info,
                (data) => {
                    return data.data
                },
            )
            .then((data) => {
                setSearchParams({title: searchTitle, content: searchContent, writer: searchWriter})
                dispatch(setBoardSearch(data))
            })
        }
        getSearchedList()
    }

    return (
        <Sidebar>
            <div>
                <StyledTextField id="searchTitle" onChange={onTypingHandler} size="small" placeholder="제목"/>
                <StyledTextField id="searchContent" onChange={onTypingHandler} size="small" placeholder="내용"/>
                <StyledTextField id="searchWriter" onChange={onTypingHandler} size="small" placeholder="작성자"/>
                <IconButton onClick={onSearchClickHandler} type="button" sx={{ p: '10px', color: '#FCA311' }} aria-label="search">
                    <Search />
                </IconButton>
            </div>
            <Link to={"/community/write"} style={{textDecoration: "none"}}>
                <Button variant="contained" className="submit" fullWidth style={{height:"2.5rem", backgroundColor: "#FCA311"}}> <b>글 쓰기</b></Button>
            </Link>
            <div>
                {searchParams}
            </div>
        </Sidebar>
    )
}

const Sidebar = styled.div`
    width: 15%;
    background-color: #14213D;
    color: white;
    
    display:flex;
    flex-direction: column;
    justify-content: space-between;

    border-radius: 10px;
    padding: 10px;
    margin: 0 10px 0 20px;
`

const StyledTextField = styled(TextField)`
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
`

export default CommuSidebar