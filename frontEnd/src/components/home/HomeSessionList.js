import HomeSessionItem from './HomeSessionItem'
import styled from 'styled-components'

function HomeSessionList() {
    const sessionList = [    
            {name: "1", url: "#",},
            {name: "2", url: "#",},
            {name: "3", url: "#",},
            {name: "4", url: "#",},
        ]
    return (
        <SessionListDiv>
            {sessionList.map(item => {
                return <HomeSessionItem key={item.name} name={item.name}/>
            })}
        </SessionListDiv>
    )
}

const SessionListDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    padding-top: 30px;
`
export default HomeSessionList