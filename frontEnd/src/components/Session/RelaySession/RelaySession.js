import styled from "styled-components";

import IdeArea from "../IdeArea";
import RelaySideArea from "../SideArea/RelaySideArea";
import ToolBar from "../ToolBar";


const Box = styled.div`
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-template-rows: 9fr 1fr;
  width: 95vw;
  height: 95vh;
`;

function RelaySession(props) {
  return (
    <Box>
      <IdeArea />
      <RelaySideArea />
      <ToolBar />
    </Box>
  );
}

export default RelaySession;