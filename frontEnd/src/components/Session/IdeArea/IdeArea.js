import styled from "styled-components";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Ide from "./Ide";
import MyDrawLayer from "./MyDrawLayer";
import OthersDrawLayer from "./OthersDrawLayer";
import { participantsInstances } from "../../../store/sessionSlice";


const IdeAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #14213D;
  color: white;
  position: relative;
  grid-row-start: 1;
  grid-row-end: 12;
  grid-column-start: 1;
  grid-column-end: 4;
`;


function IdeArea(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(null);
  const updated = useSelector((state) => state.session.updated);

  useEffect(() => {
    setParticipants(participantsInstances.get(participantsId));
  }, [participantsId, updated])

  return (
    <IdeAreaDiv id="ideArea">
      {isDrawButtonOn && <MyDrawLayer />}
      {typeof participants === "object" && participants !== null && Object.values(participants).map((participant, index) => {
        return (
          <OthersDrawLayer participant={participant} key={index} />
        )
      })}
      {participantsId !== null && <Ide />}
    </IdeAreaDiv>
  );
}

export default IdeArea;