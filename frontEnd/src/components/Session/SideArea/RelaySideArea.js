import styled from "styled-components";

import TimerArea from "./TimerArea";
import ChatArea from "./ChatArea";


const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

function RelaySideArea(props) {

  return (
    <Box>
      <TimerArea />
      <ChatArea />
    </Box>
  );
}

export default RelaySideArea;