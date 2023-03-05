import { Container, Box, Button, Typography, 
  Link, TextField, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../../api/session';
import { useCookies } from "react-cookie"


function CreateSession() {
  const navigate = useNavigate();
  const [ cookie ] = useCookies(["userInfo"])

  // 로그인 안했다면 퇴장
  useEffect(() => {
    if (cookie.userInfo === undefined || localStorage.getItem("userId") === null) {
        navigate('/useri/login')
        alert("로그인이 필요한 서비스입니다.")
    }
  }, [navigate, cookie])

  async function handleCreateSession(event) {
    event.preventDefault();
    const sessionData = new FormData(event.currentTarget);
    const payload = {
      hostId: localStorage.getItem("userId"),
      title: sessionData.get("title"),
      content: sessionData.get("content"),
      hostRating: 10,
      mode: "study",
      max: sessionData.get("max")
    }

    if (!sessionData.get("title").trim()) {
      alert("제목 입력은 필수입니다.")
    } else {
      await createSession(
        payload,
        (data) => {
          console.log(data)
          const roomId = data.data;
          navigate(`/session/${roomId}`);
        },
        (err) => console.log(err)
      )
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        세션 생성
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleCreateSession}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="세션 제목"
              name="title"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="content"
              label="세션 설명"
              id="content"
              multiline
              rows={6}
              autoComplete="content"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="max"
              label="최대 참여자 수"
              name="max"
              type="number"
              InputProps={{ inputProps: { min: "2", max: "10", step: "1" } }}
              autoComplete="max"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="filled"
          sx={{ mt: 3, mb: 2, color:"white", background:"#FCA311" }}
        >
          <b>생성</b>
        </Button>
        <Button
          type="button"
          fullWidth
          variant="filled"
          sx={{ mt: 3, mb: 2, color: "white", background: "#4A4E69" }}
          onClick={() => {navigate("/session")}}
        >
          <b>취소</b>
        </Button>
      </Box>
    </Container>
  )
}

export default CreateSession;
