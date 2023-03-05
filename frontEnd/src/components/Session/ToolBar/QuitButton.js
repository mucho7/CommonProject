import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { participantsInstances, websocketInstances } from "../../../store/sessionSlice";

import IconButton from '@mui/material/IconButton';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';


function QuitButton(props) {
  const navigate = useNavigate();
  const websocketId = useSelector((state) => state.session.websoketId);
  const [ws, setWs] = useState(websocketInstances.get(websocketId));

  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(participantsInstances.get(participantsId));
  
  const userName = localStorage.getItem("userId")
  
  useEffect(() => {
    setWs(websocketInstances.get(websocketId));
    setParticipants(participantsInstances.get(participantsId));
  }, [websocketId, participantsId])

  function onClickQuitButton() {
    if (ws) {
      ws.close();
    }
    if (participants) {
      participants[userName].dispose();
    }
    navigate("/session");
  }
  
  return (
    <IconButton 
      type="button"
      onClick={onClickQuitButton}
      sx={{ 
        width: "50px", 
        height: "50px", 
        m: '5px', 
        p: '5px', 
        bgcolor: "#FCA311"
      }}
    >
      <ExitToAppOutlinedIcon fontSize='large' />
    </IconButton>
  );
}

export default QuitButton;