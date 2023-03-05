import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Paper, InputBase, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';


function SessionListSearchBar() {
    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ searchTarget, setSearchTarget ] = useState("title")
    const [ searchWord, setSearchWord] = useState(null)

    const onTypingHandler = (e) => {
        setSearchWord(e.target.value)
    }

    // setSearchTarget을 활용할 수 있는 드롭박스
    const onSelectHandler = (e) => {
        setSearchTarget(e.target.value)
    }

    const onSearchClickHandler = () => {
        switch (searchTarget) {
            case "title":
                setSearchParams({ title: searchWord })
                break;
            case "hostId":
                setSearchParams({ hostId: searchWord })
                break;
            default:
        }
    }

    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2.4rem' }}>
            <FormControl size="small" >
                <Select value={searchTarget} onChange={onSelectHandler}>
                    <MenuItem value={"title"}>제목</MenuItem>
                    <MenuItem value={"hostId"}>호스트 ID</MenuItem>
                </Select>
            </FormControl>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search For More" onChange={onTypingHandler}/>
            <IconButton onClick={onSearchClickHandler} type="button" sx={{ p: '10px', color: '#FCA311' }}>
                <Search />
            </IconButton>
        </Paper>
    );
}

export default SessionListSearchBar;