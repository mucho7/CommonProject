import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { participantsInstances } from "../../../../store/sessionSlice";
import UserListItem from "./UserListItem";


const UserListDiv = styled.div`
  background-color: #4A4E69;
  color: white;
  max-height: 200px;
  overflow: auto;
`

function UserList() {
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(participantsInstances.get(participantsId) || null);
  const updated = useSelector((state) => state.session.updated);

  
  useEffect(() => {
    setParticipants(participantsInstances.get(participantsId));
  }, [participantsId, updated])


  return (
    <UserListDiv>
      {participants !== null && Object.values(participants).map((participant, index) => {
        return (
          <UserListItem participant={participant} key={index} />
        )
      })}
    </UserListDiv>
  )
}

export default UserList;