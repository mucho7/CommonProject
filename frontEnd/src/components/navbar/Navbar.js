import NavbarItem from "./NavbarItem"

import { useState, } from "react"
import { useCookies } from 'react-cookie'
import { Grid } from '@mui/material'

function Navbar() {
    const [ cookie, ] = useCookies(["userInfo"])
    const [ userId, ] = useState(localStorage.userId)

    const navlist = {
        left: [
            {name: "Session", highlight: false, url: "/session",},
            {name: "Community", highlight: false, url: "/community",},
        ],
        right: [
            {name: "Log In", highlight: false, url: "/useri/login",},
            {name: "Sign Up", highlight: true, url: "/useri",},
        ],
        loged: [
            {name: "profile", highlight: false, url: `/useri/${userId}`,},
            {name: "Log Out", highlight: true, url: "/useri/logout",},
        ]

    }

    return (
        <Grid container spacing={1} style={Nav}>
            <Grid item xs={1}>
                <NavbarItem navList={[{name: "COCO", url: "/", bold: true}]}/>
            </Grid>
            <Grid item xs={3}>
                <NavbarItem navList={navlist.left}/>
            </Grid>
            <Grid item xs={5}>
            </Grid>
            <Grid item xs={3}>
                {cookie.userInfo === undefined || cookie.userInfo === "undefined" ? <NavbarItem navList={navlist.right}/> : <NavbarItem navList={navlist.loged}/>}
            </Grid>
        </Grid>
    )
}

const Nav ={
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '13px',
    paddingBottom: '13px',
}


export default Navbar