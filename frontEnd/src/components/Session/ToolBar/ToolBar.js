import styled from "styled-components";

import CompileButton from "./CompileButton";
import DrawButton from "./DrawButton";
import MicButton from "./MicButton";
import AuthorizeButton from "./AuthorizeButton";
import QuitButton from "./QuitButton";
import AuthorizationSetting from "./AuthorizationSetting";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { participantsInstances } from "../../../store/sessionSlice";


const Box = styled.div`
  border: 2px solid #14213D;
  background-color: #4A4E69;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row-start: 12;
  grid-row-end: 13;
  grid-column-start: 1;
  grid-column-end: 5;
`;

const CustomButton = styled.button`
  border: 1px solid #FCA311;
  background-color: ${props => props.isButtonOn ? '#FCA311' : '#E5E5E5'};
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

function ToolBar(props) {
  const isAuthorizeButtonOn = useSelector((state) => state.toolBarAction.isAuthorizeButtonOn);
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(participantsInstances.get(participantsId));
  const userId = localStorage.getItem("userId");
  const updated = useSelector((state) => state.session.updated);

  useEffect(() => {
    setParticipants(participantsInstances.get(participantsId));
  }, [participantsId, updated])
  
  return (
    <Box>
      <div>
        <CompileButton />
        <DrawButton />
        <MicButton />
        {participants && participants[userId]?.isHost && <AuthorizeButton />}
        <QuitButton />
        {isAuthorizeButtonOn && <AuthorizationSetting />}
      </div>
    </Box>
  );
}

export default ToolBar;
export {CustomButton};