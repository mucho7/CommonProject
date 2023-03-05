// custom hook에 대한 이해가 필요함

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signup, checkSignUp } from '../../api/member'

import { Grid, Box, Container, Button, TextField } from '@mui/material'

function SigninForm() {
    const navigate = useNavigate()

    const [inputID, setInputID] = useState(null)
    const [inputName, setInputName] = useState()
    const [inputPassword, setInputPassword] = useState()
    const [inputCheckPassword, setInputChcekPassword] = useState()
    const [inputEmail, setInputEmail] = useState(null)

    const [isOkToSubmit, setIsOkToSubmit] = useState(false)
    const [isIdValid, setIsIdValid] = useState({ isValid: true, isChecked: false, message: "중복검사를 해주세요!" })
    const [isEmailValid, setIsEmailValid] = useState({ isValid: true, isChecked: false, message: "중복검사를 해주세요!" })
    const [isPasswordValid, setIsPasswordValid] = useState({ isValid: false })
    const [isNameValid, setIsNameValid] = useState({ isValid: false })
    const [isSubmitFailed, setIsSubmitFailed] = useState(false)
    
    // validation
    const emailValidation = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    const idValidation = (() => {
        const idForm = /^(?=.*\d{0,16})(?=.*[_.]{0,16})(?=.*[A-Za-z]{0,16}).{4,16}$/
        const idErrorMessage = {
            null: "필수 입력입니다.",
            form: "ID는 영문자, 숫자, 언더스코어(_) 로 구성하여 4자 ~ 16자 로 작성해주세요.",
            exist: "중복되는 아이디입니다!"
        }
        if (inputID === undefined || inputID === '') {
            setIsIdValid({ isValid: true, message: idErrorMessage.null })
            return true
        } else if (!idForm.test(inputID)) {
            setIsIdValid({ isValid: true, message: idErrorMessage.form })
            return true
        } else {
            setIsIdValid({ isValid: false })
            return false

        }
    })

    useEffect(() => {
        const passwordForm = /^(?=.*\d{1,32})(?=.*[~`!@#$%^&*()-+=_]{0,32})(?=.*[a-zA-Z]{1,32}).{4,32}$/
        const passwordErrorMessage = {
            null: "필수 입력입니다.",
            form: "비밀번호는 영문자, 숫자가 각각 반드시 1번 이상 포함된 4자 이상 32자 이하인 문자열이어야 합니다. (허용 특수문자: ~`!@#$%^&*()-+=)",
            same: "비밀번호가 일치하지 않습니다.",
        }
        if (inputPassword === undefined || inputPassword === '') {
            setIsOkToSubmit(false)
            setIsPasswordValid({ isValid: true, message: passwordErrorMessage.null })
        } else if (inputPassword !== inputCheckPassword) {
            setIsOkToSubmit(false)
            setIsPasswordValid({ isValid: true, message: passwordErrorMessage.same })
        } else if (!passwordForm.test(inputPassword)) {
            setIsOkToSubmit(false)
            setIsPasswordValid({ isValid: true, message: passwordErrorMessage.form })
        }
        else {
            setIsOkToSubmit(true)
            setIsPasswordValid({ isValid: false })
        }
    }, [inputPassword, inputCheckPassword])

    useEffect(() => {
        const koreanRegex = /[\u1100-\u11FF|\u3130-\u318F|\uA960-\uA97F|\uAC00-\uD7AF|\uD7B0-\uD7FF]/
        const englishRegex = /^[a-zA-Z\d]+$/
        const nameErrorMessage = {
            null: "필수 입력입니다.",
            form: "사용자 이름은 한글, 영문자, 숫자만 허용합니다.",
            length: "사용자 이름은 4자이상 16자 이하이어야 합니다."
        }
        if (inputName === undefined || inputName.trim().length === 0) {
            setIsOkToSubmit(false)
            setIsNameValid({ isValid: true, message: nameErrorMessage.null })
        } else if (inputName.length < 4 || inputName.length > 32) {
            setIsOkToSubmit(false)
            setIsNameValid({ isValid: true, message: nameErrorMessage.length })
        } else if (!koreanRegex.test(inputName) && !englishRegex.test(inputName)) {
            setIsOkToSubmit(false)
            setIsNameValid({ isValid: true, message: nameErrorMessage.form })
        } else {
            setIsOkToSubmit(true)
            setIsNameValid({ isValid: false })
        }
    }, [inputName])

    // case를 이용한 typing
    const onTypingHandler = (e) => {
        switch (e.target.id) {
            case 'outlined-id':
                setInputID(e.target.value)
                break
            case 'outlined-password':
                setInputPassword(e.target.value)
                break
            case 'outlined-password-check':
                setInputChcekPassword(e.target.value)
                break
            case 'outlined-email':
                setInputEmail(e.target.value)
                break
            case 'outlined-name':
                setInputName(e.target.value)
                break
            default:
            // nothing
        }
    }


    async function signUp() {
        const temp_user_info = {
            userId: inputID,
            password: inputPassword,
            name: inputName,
            email: inputEmail,
        }
        await signup(
            temp_user_info,
            () => {
                alert(temp_user_info.userId + '님, 가입을 환영합니다.');
                navigate("/")
            },
            () => {
                alert('가입에 실패하였습니다.')
            }
        )
    }

    const SignUpIdCheck = async (user) => {
        await checkSignUp(
            user,
            (data) => {
                return data.data
            }
            )
            .then((res) => {
                if (res) {
                    const tempIdValid = idValidation(inputID)
                    if (!tempIdValid) setIsIdValid({isValid: false})
                } else {
                    setIsIdValid({
                    isValid: true, 
                    isChecked: true,
                    message: "중복되는 아이디입니다."
                })
                alert("중복되는 아이디입니다.")
            }
        })
    }
    
    const SignUpEmailCheck = async (user) => {
        await checkSignUp(
            user,
            (data) => {
                return data.data
            }
            )
            .then((res) => {
                if (res) {
                    if (emailValidation.test(inputEmail)) setIsEmailValid({isValid: false})
                    else setIsEmailValid({isValid: true, isChecked: true, message: "유효하지 않은 이메일입니다."})
            } else {
                setIsEmailValid({isValid: true, isChecked: true, message: "중복되는 이메일입니다."})
                alert("중복되는 이메일입니다.")
            }
        })
    }
    
    const onCheckCLickHandler = (e) => {
        e.preventDefault()
        const target = e.target.value
        if (target === "id") SignUpIdCheck({key: target, value: inputID,})
        if (target === "email") SignUpEmailCheck({key: target, value: inputEmail,})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (isOkToSubmit && isIdValid && isEmailValid) { signUp() } 
        else { 
            alert('입력 사항들을 다시 확인해주세요.')
            setIsSubmitFailed(true)
        }
    }
    
    useEffect(() => {

    }, [isIdValid, isEmailValid])

    return (
        <Container fixed>
            <Box component="form">
                <Grid container spacing={2} style={{ padding: '2rem', justifyContent: 'center' }}>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isIdValid.isChecked || isSubmitFailed} helperText={isIdValid.isValid ? isIdValid.message : "좋은 아이디네요"} id="outlined-id" label="ID" fullWidth/>
                        <Button id="idCheck" value="id" onClick={onCheckCLickHandler} style={{position: "absolute", right: "30%", top: "190px"}}>중복 검사</Button>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isEmailValid.isChecked || isSubmitFailed} helperText={isEmailValid.isValid ? inputEmail ? isEmailValid.message : inputEmail=== null || inputEmail === "" ? "필수 입력입니다." : "중복검사를 실행해주세요!" : "멋진 E-Mail인걸요?"} id="outlined-email" label="E-Mail" fullWidth />
                        <Button id="emailCheck" value="email" onClick={onCheckCLickHandler} style={{position: "absolute", right: "30%", top: "285px"}}>중복 검사</Button>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isSubmitFailed} helperText={isPasswordValid.isValid ? isPasswordValid.message : ""} id="outlined-password" type="password" label="Password" fullWidth />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isSubmitFailed} helperText={isPasswordValid.isValid ? isPasswordValid.message : ""} id="outlined-password-check" type="password" label="Password Check" fullWidth />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isSubmitFailed} helperText={isNameValid.isValid ? isNameValid.message : ""} id="outlined-name" label="Name" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={onSubmitHandler} variant="contained" className="submit" fullWidth style={{ height: "3rem", background: "blue" }}> <b>회원가입</b></Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}



export default SigninForm