import { useState, } from 'react'
import { Button, Modal, Box, Typography, TextField, Grid } from '@mui/material'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { changeUserPassword } from "../../api/member"
import { useEffect } from 'react'


function ProfilePasswordUpdateButton(params) {
    const [cookie] = useCookies(["userInfo"])
    const navigate = useNavigate()

    const [inputPassword, setInputPassword] = useState()
    const [inputUpdatedPassword, setInputUpdatedPassword] = useState()
    const [inputUpdatedCheckPassword, setInputUpdatedCheckPassword] = useState()

    const [isOkToSubmit, setIsOkToSubmit] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState({ isVaild: false })

    const [modalOpen, setModalOpen] = useState(false)
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'password':
                setInputPassword(e.target.value)
                break
            case 'updated-password':
                setInputUpdatedPassword(e.target.value)
                break
            case 'updated-password-check':
                setInputUpdatedCheckPassword(e.target.value)
                break
            default:
            // nothing
        }
    }

    useEffect(() => {
        const passwordForm = /^(?=.*\d{1,32})(?=.*[~`!@#$%^&*()-+=]{0,32})(?=.*[a-zA-Z]{1,32}).{4,32}$/
        const passwordErrorMessage = {
            null: "필수 입력입니다.",
            form: "비밀번호는 영문자, 숫자가 각각 반드시 1번 이상 포함된 4자 이상 32자 이하인 문자열이어야 합니다. (허용 특수문자: ~`!@#$%^&*()-+=)",
            same: "비밀번호가 일치하지 않습니다.",
        }
        if (inputUpdatedPassword === undefined || inputUpdatedPassword === '') {
            setIsOkToSubmit(false)
            setIsPasswordValid({ isVaild: true, message: passwordErrorMessage.null })
        } else if (inputUpdatedPassword !== inputUpdatedCheckPassword) {
            setIsOkToSubmit(false)
            setIsPasswordValid({ isVaild: true, message: passwordErrorMessage.same })
        } else if (!passwordForm.test(inputUpdatedPassword)) {
            setIsOkToSubmit(false)
            setIsPasswordValid({ isVaild: true, message: passwordErrorMessage.form })
        }
        else {
            setIsOkToSubmit(true)
            setIsPasswordValid({ isValid: false })
        }
    }, [inputUpdatedPassword, inputUpdatedCheckPassword])


    async function updatePassword() {
        await changeUserPassword(
            {
                newPassword: inputUpdatedPassword,
                password: inputPassword,
                "Authorization": cookie.userInfo.jwt_token,
                "refreshToken": cookie.userInfo.refresh_token,
            },
            () => {
                navigate('/useri/logout')
                alert("다시 로그인 해주세요")
            }
        )
    }

    const passwordChangeHandler = () => {
        if (isOkToSubmit) { updatePassword() } else { alert('다시!!') }
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" className="submit" fullWidth style={{ width: "8rem", height: "2.8rem", marginRight: "15px", backgroundColor: "white", color: "red", border: "solid 2px red" }}><b>비밀번호 변경</b></Button>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        비밀번호 변경
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        비밀번호 변경 모달입니다.
                    </Typography>
                    <Grid container spacing={2} style={{ padding: '2rem', justifyContent: 'center' }}>
                        <Grid item xs={10}>
                            <TextField onChange={onTypingHandler} id="password" label="Current Password" type="password" fullWidth />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField onChange={onTypingHandler} error={isPasswordValid.isVaild} helperText={isPasswordValid.isVaild ? isPasswordValid.message : ""} id="updated-password" type="password" label="Password" fullWidth />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField onChange={onTypingHandler} error={isPasswordValid.isVaild} helperText={isPasswordValid.isVaild ? isPasswordValid.message : ""} id="updated-password-check" type="password" label="Password Check" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={passwordChangeHandler} variant="contained" className="submit" fullWidth style={{ width: "8rem", height: "2.8rem", marginRight: "15px", backgroundColor: "white", color: "red", border: "solid 2px red" }}><b>비밀번호 변경</b></Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )

}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default ProfilePasswordUpdateButton