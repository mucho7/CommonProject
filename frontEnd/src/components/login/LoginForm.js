import { useState, } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { Box, Container, Grid, Button, TextField } from '@mui/material'
import { login } from "../../api/member"

import LoginTempPassword from './LoginTempPassword';

function LoginForm() {
    const navigate = useNavigate()
    const [cookie, setCookie] = useCookies(["userInfo"])

    const [inputID, setInputID] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    const temp_user_info = {
        userId: inputID.substring(),
        password: inputPassword.substring(),
    }

    const onTypingHandler = (e) => {
        switch (e.target.id) {
            case 'outlined-id':
                setInputID(e.target.value)
                break
            case 'outlined-password':
                setInputPassword(e.target.value)
                break
            default:
            // nothing
        }
    }

    async function log_in() {
        await login(
            temp_user_info,
            (data) => {
                const headers = data.headers
                setCookie(
                    "userInfo",
                    {
                        ...cookie,
                        user_id: temp_user_info.userId,
                        jwt_token: headers.get("Authorization"),
                        refresh_token: headers.get("refreshToken"),
                    },
                    // {maxAge: 60 * 5},
                    { path: '/' }
                )
                window.localStorage.setItem("userId", temp_user_info.userId)
                navigate("/")
            },
            () => {
                alert('아이디, 비밀번호를 다시 확인하세요.')
            }
        )
    }

    // 버튼을 누르면 실행
    const onClickHandler = (e) => {
        e.preventDefault()
        log_in()
    }

    // 엔터를 누르면 실행
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            log_in()
        }
    }


    return (
        <Container fixed>
            <Box component="form">
                <Grid container spacing={2} style={{ padding: '2rem', justifyContent: 'center' }}>
                    {/* map을 활용한 반복문으로 고쳤으면 함 */}
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} id="outlined-id" autoFocus label="ID" fullWidth />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} onKeyDown={handleKeyDown} id="outlined-password" label="Password" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={7} style={{ textAlign: "center" }}>
                        <LoginTempPassword />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={onClickHandler} variant="contained" className="submit" style={{ height: '3rem', background: "blue" }} fullWidth> <b>로그인</b></Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default LoginForm;