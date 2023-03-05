import styled from '@emotion/styled';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

function NavbarItem(props) {

    return (
        <NavContainer>
            {props.navList.map(item => {
                if (item.highlight === false) {
                    return ( 
                        <Link className='navbar-item' to={item.url} style={{textDecoration: "none"}} key={item.name}>
                            <Button variant="text" className="submit" fullWidth style={{height:"2.5rem", color:"black"}}> 
                                <b>{item.name}</b>
                            </Button>
                        </Link>
                    )
                } else {
                    return ( 
                        <Link className='navbar-item' to={item.url} style={{textDecoration: "none"}} key={item.name}>
                            <Button variant="text" className="submit" fullWidth style={{height:"2.5rem", color:"white", background:"blue"}}> 
                                <b>{item.name}</b>
                            </Button>
                        </Link>
                        )
                }
            })}
        </NavContainer>
    )
}

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    vertical-align: middle;
`

// props를 활용한 크기 조절이 필요함

export default NavbarItem