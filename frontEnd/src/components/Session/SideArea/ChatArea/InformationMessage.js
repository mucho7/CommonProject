import styled from "styled-components";

const InformationMessageDiv = styled.div`
  border-radius: 15px;
  background-color: whitesmoke;
  color: black;
  max-width: 70%;
  word-break:break-all;
  padding: 5px;
  margin: 0 auto 10px;
  text-align: center;
`

function InformationMessage(props) {
  const user = props.user;
  const chat = props.chat;

  return (
    <InformationMessageDiv>
      { user }님이 { chat }했습니다.
    </InformationMessageDiv>
  )
}

export default InformationMessage;