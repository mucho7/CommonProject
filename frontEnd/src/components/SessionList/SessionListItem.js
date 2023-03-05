import { Link } from "react-router-dom"


import { Card, CardActionArea, Typography, CardContent, Grid } from '@mui/material'

function SessionListItem(props) {
    return (
        <>
        {props.sessionList?.map(session => {
            return (
                <Card sx={{ width: '100%', height: 'auto', margin: '4px'}} key={session.roomId}>
                    <CardActionArea>
                        <Link to={`${session.roomId}`} state={session} style={{textDecoration: 'none', color: 'black'}}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={4} textAlign="center">
                                        <Typography>{session.title}</Typography>
                                    </Grid>
                                    <Grid item xs={4} textAlign="center">
                                        <Typography>{session.hostId}</Typography>
                                    </Grid>
                                    <Grid item xs={4} textAlign="center">
                                        <Typography>{session.numberUsers}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            )
        })}
        </>
    )
    
}

export default SessionListItem;