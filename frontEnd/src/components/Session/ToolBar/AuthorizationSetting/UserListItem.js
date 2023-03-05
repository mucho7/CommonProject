import { websocketInstances } from "../../../../store/sessionSlice";
import { useSelector } from "react-redux";

import IconButton from '@mui/material/IconButton';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import styled from 'styled-components';

const NameDiv = styled.div`
  margin-right: 5px;
  display: inline-block;
  width: 100px;
  overflow: hidden;
  text-align: right;
  font-size: 18px;
`

const UserListItemDiv = styled.div`
  display: flex;
  align-items: center;
`


function UserListItem(props) {
  const participant = props.participant;
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);


  function toggleAuthorization(user, authorizationType) {
    const message = {
      id: "toggleAuthorization",
      userName: user.name,
      authorizationType: authorizationType
    }

    ws.send(JSON.stringify(message));
  }
  

  return (
    <UserListItemDiv>
      <NameDiv>{participant.name}</NameDiv>
      <IconButton 
        onClick={() => toggleAuthorization(participant, "compile")} 
        type="button"
        sx={{ 
          width: "40px", 
          height: "40px", 
          m: '5px', 
          p: '5px', 
          bgcolor: participant.authorization.isCompilePossible ? "#FCA311" : "#E5E5E5" 
        }}
      >
        <IntegrationInstructionsOutlinedIcon />
      </IconButton>
      <IconButton 
        onClick={() => toggleAuthorization(participant, "draw")} 
        type="button"
        sx={{ 
          width: "40px", 
          height: "40px", 
          m: '5px', 
          p: '5px', 
          bgcolor: participant.authorization.isDrawPossible ? "#FCA311" : "#E5E5E5" 
        }}
      >
        <PaletteOutlinedIcon />
      </IconButton>
      <IconButton 
        onClick={() => toggleAuthorization(participant, "mic")} 
        type="button"
        sx={{ 
          width: "40px", 
          height: "40px", 
          m: '5px', 
          p: '5px', 
          bgcolor: participant.authorization.isMicPossible ? "#FCA311" : "#E5E5E5" 
        }}
      >
        {participant.authorization.isMicPossible ? <MicNoneOutlinedIcon /> : <MicOffOutlinedIcon />}
      </IconButton>
    </UserListItemDiv>
  );
}

export default UserListItem;