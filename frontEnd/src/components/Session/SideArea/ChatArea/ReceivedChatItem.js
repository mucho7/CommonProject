import styled from "styled-components"

const ReceivedChatDiv = styled.div`
  border-radius: 15px;
  background-color: #4A4E69;
  padding: 5px;
  max-width: 70%;
  word-break:break-all;
  margin-bottom: 10px;
  margin-right: auto;
`

const SenderId = styled.div`
  margin-bottom: 2px;
  margin-left: 5px;
  color: #4A4E69;
`

function ReceivedChatItem(props) {
  const user = props.user;
  const chat = props.chat;

  return (
    <div>
      <SenderId>{ user }</SenderId>
      <ReceivedChatDiv>{ chat }</ReceivedChatDiv>
    </div>
  )
}

export default ReceivedChatItem;