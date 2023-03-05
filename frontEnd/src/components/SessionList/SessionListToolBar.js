import { Link } from "react-router-dom";

import SessionListSearchBar from "./SessionListSearchBar";

import styled from "styled-components"
import { Button, Grid, } from '@mui/material';


function SessionListToolBar() {
    return (
        <Toolbar>
            <Grid container>
                <Grid item xs={8}>
                    <SessionListSearchBar />
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}>
                    <Link to={"/session/create"} style={{textDecoration: "none"}}>
                        <Button variant="contained" className="submit" fullWidth style={{height:"2.5rem", backgroundColor: "#FCA311"}}> <b>세션 만들기</b></Button>
                    </Link>
                </Grid>
            </Grid>
        </Toolbar>
    )
}

const Toolbar = styled.div`
    width: 90%;
    background-color: white;
    color: white;
    
    display:grid;

    border-radius: 10px;
    padding: 10px;
    margin: 0 10px 0 20px;
`

export default SessionListToolBar;
