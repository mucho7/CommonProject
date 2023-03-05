import { useSelector } from "react-redux";
import styled from "styled-components";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


const ParticipantsInfoBarDiv = styled.div`
  flex-basis: 40px;
  background-color: #14213D;
  color: #FCA311;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 15px;
`

const CountUserSpan = styled.span`
  margin-left: 10px;
`

function ParticipantsInfoBar() {
  const countUsers = useSelector((state) => state.session.countUsers);

  return (
    <ParticipantsInfoBarDiv>
      <PeopleAltIcon />
      <CountUserSpan>{ countUsers }</CountUserSpan>
    </ParticipantsInfoBarDiv>
  )
}

export default ParticipantsInfoBar;