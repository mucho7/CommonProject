import styled from 'styled-components'

function HomeSessionItem(props) {
    return (
        <SessionItem className='home-session-item' key={props.name}>
            {props.name} 
        </SessionItem>
    )
}

const SessionItem = styled.div`
    width: 20%;
    height: 200px;
    border: solid black;
`

export default HomeSessionItem