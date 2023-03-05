import { Link } from "react-router-dom";

import CommuSearchbar from "./CommuSearch"

import styled from "styled-components"
import { Button, Grid, } from '@mui/material';


function CommuToolBar() {
    return (
        <Toolbar>
            <Grid container>
                <Grid item xs={8}>
                    <CommuSearchbar />
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}>
                    <Link to={"/community/write"} style={{textDecoration: "none"}}>
                        <Button variant="contained" className="submit" fullWidth style={{height:"2.5rem", backgroundColor: "blue"}}> <b>글 쓰기</b></Button>
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

// const StyledTextField = styled(TextField)`
//     background-color: white;
//     border-radius: 10px;
//     margin-bottom: 10px;
// `

export default CommuToolBar