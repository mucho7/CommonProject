import styled from "styled-components";

import ParticipantsInfoBar from "./ParticipantsInfoBar";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";

const ChatAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 7;
  width: 100%;
  overflow: auto;
`;

function ChatArea(props) {

  return (
    <ChatAreaDiv>
      <ParticipantsInfoBar />
      <ChatList />
      <ChatInput />
    </ChatAreaDiv>
  );
}

export default ChatArea;