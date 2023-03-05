import styled from "styled-components";

const MyChatDiv = styled.div`
  border-radius: 15px;
  background-color: #FCA311;
  max-width: 70%;
  word-break:break-all;
  padding: 5px;
  margin-bottom: 10px;
  margin-left: auto;
  color: #14213D;
`

function MyChatItem(props) {
  const chat = props.chat;

  return (
    <MyChatDiv>{ chat }</MyChatDiv>
  )
}

export default MyChatItem;