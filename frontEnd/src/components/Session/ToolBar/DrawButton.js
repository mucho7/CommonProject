import { useSelector, useDispatch } from "react-redux";
import { onClickDrawButton } from "../../../store/toolBarActionSlice";

import IconButton from '@mui/material/IconButton';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { participantsInstances, websocketInstances } from "../../../store/sessionSlice";
import { useState } from "react";
import { useEffect } from "react";


function DrawButton(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  const isDrawPossible = useSelector((state) => state.toolBarAction.isDrawPossible);
  const websocketId = useSelector((state) => state.session.websocketId);
  const [ws, setWs] = useState(websocketInstances.get(websocketId));
  const userName = localStorage.getItem("userId");
  const dispatch = useDispatch();

  useEffect(() => {
    setWs(websocketInstances.get(websocketId));
  }, [websocketId])

  
  return (
    <IconButton 
      onClick={() => {
        dispatch(onClickDrawButton());
        if (ws) {
          const message = {
            id: "toggleAuthorization",
            userName: userName,
            authorizationType: "drawButton"
          }
      
          ws.send(JSON.stringify(message));
        }
      }} 
      disabled={!isDrawPossible}
      sx={{ 
        width: "50px", 
        height: "50px", 
        m: '5px', 
        p: '2px',
        bgcolor: isDrawButtonOn ? "#FCA311" : "#E5E5E5" 
      }}
    >
      <PaletteOutlinedIcon fontSize="large" />
    </IconButton>
  );
}

export default DrawButton;