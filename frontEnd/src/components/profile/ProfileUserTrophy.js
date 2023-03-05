import styled from "styled-components"

function ProfileUserTrophy(props) {
    return (
        <UserTrophyItem height="100px"></UserTrophyItem>
    )
}

const UserTrophyItem = styled.div`
    width: 100%;
    height: ${props => props.height};
    margin: 15px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background-color: #e5e5e5;
`


export default ProfileUserTrophy