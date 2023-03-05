import { useState } from "react"
import { useCookies } from "react-cookie"

import { updateUserInfo } from "../../api/member"

import styled from "styled-components"
import { Button } from "@mui/material"

function ProfileUserInfoForm(props) {
    const emailValidation = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    const [cookie] = useCookies(["userInfo"])
    const [inputEmail, setInputEmail] = useState()
    const [inputName, setInputName] = useState()
    const [isOkToUpdate, setISOkToUpdate] = useState(false)

    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'email':
                setInputEmail(e.target.value)
                setISOkToUpdate(emailValidation.test(e.target.value))
                break
            case 'name':
                setInputName(e.target.value)
                setISOkToUpdate(checkString(e.target.value))
                break
            default:
            // nothing
        }
    }

    const updating_user_info = {
        email: inputEmail,
        name: inputName,

        userId: props.userInfo[0][1],
        "Authorization": cookie.userInfo.jwt_token,
        "refreshToken": cookie.userInfo.refresh_token,
    }

    async function updateUser() {
        if (updating_user_info.email !== undefined && !emailValidation.test(updating_user_info.email)) {
            alert('유효하지 않은 이메일 형식입니다.');
            return;
        }
        if (updating_user_info.name !== undefined && !checkString(updating_user_info.name)) {
            alert('사용자명은 한글, 영문자, 숫자만 입력할 수 있습니다.')
            return;
        }

        if (!isOkToUpdate) return;
        await updateUserInfo(
            updating_user_info,
            () => {
                alert('정상적으로 수정되었습니다.')
            },
            () => {
                alert('변경에 실패하였습니다.')
            }
        )
    }

    // 영어, 한글, 숫자만 허용하는 정규식 함수
    function checkString(str) {
        const koreanRegex = /[\u1100-\u11FF|\u3130-\u318F|\uA960-\uA97F|\uAC00-\uD7AF|\uD7B0-\uD7FF]/;
        const englishRegex = /^[a-zA-Z\d]+$/;

        if (koreanRegex.test(str) || englishRegex.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Col>
            {props.userInfo.map((item) => {
                if (item[0] === "name" || item[0] === "email") {
                    return (
                        <UserInfoBox key={item[0]}>
                            <UserInfoNameBox>
                                {item[0]}
                            </UserInfoNameBox>
                            <UserInfoContentForm id={item[0]} onChange={onTypingHandler} placeholder={item[1]} />
                        </UserInfoBox>
                    )
                } else {
                    return (
                        <UserInfoBox key={item[0]}>
                            <UserInfoNameBox>
                                {item[0] === "regTime" ? "Since" : item[0]}
                            </UserInfoNameBox>
                            <UserInfoContentBox>
                                {item[0] === "regTime" ? item[1].slice(5, 10) : item[1]}
                            </UserInfoContentBox>
                        </UserInfoBox>
                    )
                }
            })}
            <Button variant="contained" style={{background: "blue"}} onClick={updateUser}>편집 사항 저장</Button>
        </Col>
    )
}

const UserInfoBox = styled.div`
    width: 20rem;
    height: 70px;

    background-color: #14213D;
    color: white;

    border-radius: 8px;
`
const Col = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    height: 100%;
`
const UserInfoNameBox = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 22px;

    margin-top: 10px;
    margin-left: 10px;
`
const UserInfoContentForm = styled.input`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 29px;

    background-color: white;
    opacity: 1;
    color: black;
    width: 80%;

    border-radius: 10px;

    text-align: center;
    margin-left: calc(10%);
    &:focus {
        outline: internal;
    }
`
const UserInfoContentBox = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 29px;

    text-align: end;
    margin-top: 3px;
    margin-right: 5px;
`

export default ProfileUserInfoForm