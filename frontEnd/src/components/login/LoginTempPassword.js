import { useState } from "react"


import { Button, Modal, Box, Typography, TextField, Grid } from '@mui/material'
import { visaTempPassword } from "../../api/member"


function LoginTempPassword(params) {   

    const [inputId, setInputId] = useState()
    const [inputEmail, setInputEmail] = useState()

    const [modalOpen, setModalOpen] = useState(false)
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'id':
                setInputId(e.target.value)
                break
            case 'email':
                setInputEmail(e.target.value)
                break
            default:
                // nothing
        }
    }

    async function tempPassword() {
        await visaTempPassword(
            {
                "email": inputEmail,
                "userId": inputId
            },
            // 차후에 custom alert로 변경하여 화면의 중앙에 display 됐으면 함
            (data) => alert(data.data),
        )
    } 

    // 나중에 validation 진행해주세요
    // const passwordChangeHandler = () => {
    //     passwordValidation()
    //     if (isOkToSubmit) {updatePassword()} else { alert('다시!!')}
    // }

    return(
        <>
        <Button onClick={handleOpen} variant="text" className="submit" fullWidth style={{backgroundColor: "white", color: "black"}}><b>비밀번호를 잊어버리셨나요?</b></Button>
            <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        비밀번호 찾기
                    </Typography>
                    <Grid container spacing={2} style={{padding: '2rem', justifyContent: 'center'}}>
                        <Grid item xs={10}>
                            <TextField onChange={onTypingHandler} id="id" label="ID" type="id" fullWidth/>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField onChange={onTypingHandler} id="email" label="email" fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={tempPassword} variant="contained" className="submit" fullWidth style={{ width: "8rem", height:"2.8rem", marginRight: "15px", backgroundColor: "#FCA311", color: "white"}}><b>비밀번호 찾기</b></Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
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

export default LoginTempPassword