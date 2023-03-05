import styled from "styled-components";

import UserList from "./UserList";

const AuthorizationSettingDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 150;
  bottom: 65px;
  right: 30%;
  width: 300px;
  height: auto;
  border-radius: 15px;
  padding: 10px;
  color: white;
  box-shadow: 2px 3px 2px gray;
`;

const TitleBar = styled.div`
  margin-bottom: 10px;
  margin-left: 5px;
  color: white;
  font-size: 20px;
`


function AuthorizationSetting(props) {
  return (
    <AuthorizationSettingDiv>
      <TitleBar>참여자 권한 설정</TitleBar>
      <UserList />
    </AuthorizationSettingDiv>
  );
}

export default AuthorizationSetting;