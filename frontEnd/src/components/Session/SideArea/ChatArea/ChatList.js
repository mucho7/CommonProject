import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ReceivedChatItem from "./ReceivedChatItem";
import MyChatItem from "./MyChatItem";
import InformationMessage from "./InformationMessage";
import { useState } from "react";
import { receiveChat } from "../../../../store/sessionSlice";
import { useRef } from "react";


const ChatListDiv = styled.div`
  flex-basis: auto;
  flex-grow: 1;
  background-color: #D9D9D9;
  color: white;
  overflow: auto;
  margin: 5px 10px;
  border-radius: 15px;
  padding: 10px;
  scrollbar-gutter: stable;
  ::-webkit-scrollbar {
    width: 10px;  /* 스크롤바의 너비 */
  }
  ::-webkit-scrollbar-thumb {
    background: #FCA311; /* 스크롤바의 색상 */
    border-radius: 15px;
    padding-bottom:40px;
    padding-top:40px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-track {
    background-color: darkgrey;
    border-radius: 15px;

  }
`

function ChatList(props) {
  // 서버로부터 받은 채팅 메시지 객체
  const newMessage = useSelector((state) => state.session.newMessage);
  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const chatRef = useRef();
  
  // 새로운 메시지가 도착하면 채팅창에 표시
  useEffect(() => {
    if (newMessage !== {}) {
      let message;
      switch (newMessage.id) {
        case "newUser":
          message = <InformationMessage user={newMessage.user} chat={"입장"} />
          break;
        case "userLeft":
          message = <InformationMessage user={newMessage.user} chat={"퇴장"} />
          break;
        case "chat":
          if (userId === newMessage.user) {
            message = <MyChatItem chat={newMessage.chat} />
          } else {
            message = <ReceivedChatItem user={newMessage.user} chat={newMessage.chat} />
          }
          break;
        default:
          break;
        }
      if (message) {
        setMessages([...messages, message]);
        dispatch(receiveChat({}));
      }
    }
  }, [newMessage, userId, dispatch, messages])

  useEffect(() => {
    if (chatRef.current) {
      if (chatRef.current.scrollHeight - chatRef.current.scrollTop <= chatRef.current.offsetHeight + 150) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }
    }
  }, [messages])

  return (
    <ChatListDiv id="chatList" ref={chatRef}>
      {messages.map((message) => {
        return message
      })}
    </ChatListDiv>
  )
}

export default ChatList;