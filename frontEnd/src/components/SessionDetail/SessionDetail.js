import { Container, Box, Stack, Button, Typography } from '@mui/material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

import { useParams, useNavigate, Link } from "react-router-dom";

import { getSessionDetail } from "../../api/session";
import { useState } from "react";
import { useMemo } from "react";
import { deleteSession, enterSession } from "../../api/session";


function SessionDetail() {
  const navigate = useNavigate();
  
  // 세션 정보 가져오기
  const { roomId } = useParams();
  const sample = {
    roomId: "1",
    hostId: "A",
    title: "AAAAAAAAA",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto officiis corrupti saepe, repellat consequuntur accusantium molestias laboriosam sequi ratione aliquid fuga. Dicta maiores eos ad tempora, tenetur eveniet labore praesentium.",
    mode: "study"
  }
  const [session, setSession] = useState(sample);
  
  useMemo(() => {
    const enterSessionDetail = async () => {
      await getSessionDetail(
        roomId,
        (data) => {return data.data},
        (err) => {
          console.log(err);
          alert("해당 세션이 종료, 삭제되었거나 존재하지 않는 세션입니다.")
          navigate("/session")
        }
        ).then((data) => {
          setSession(data);
        })
      }
      enterSessionDetail();
    }, [navigate, roomId])

  // 세션 참여
  async function handleEnterSession() {
    await enterSession(
      roomId, localStorage.getItem("userId"),
      (data) => {
        console.log(data)
        switch (session.mode) {
          case "study":
            navigate(`/session/${roomId}/study`)
            // window.open(`https://${window.location.host}/session/${roomId}/study`);
            // sessionWindow.resizeTo(1600, 900);
            break;
          case "relay":
            // navigate(`/room/${roomId}/relay`)
            break;
          default:
        }
      },
      (err) => {
        console.log(err)
        switch (err.response.status) {
          case 404:
            alert("해당 세션이 종료, 삭제되었거나 존재하지 않는 방입니다.")
            navigate("/session")
            break;
          case 500:
            alert(err.response.data.message)
            break;
          default:
        }
      }
    )
  }

  // 세션 삭제
  async function handleDeleteSession() {
    await deleteSession(
      roomId,
      (data) => {
        console.log(data);
        navigate("/session");
      },
      (err) => console.log(err)
    )
  }

  // 본문 링크, 줄바꿈 인식
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const replace = (content) => {
    const convertContent = content.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })

    const htmlArr = [];
    convertContent.split('\n').forEach(function (text) {
      const textHtml = "<p>" + text + "</p>";
      htmlArr.push(textHtml)
    })

    return {__html: htmlArr.join("")}
  }

  return (
    <Container>
      <Box sx={{ px: 2, py: 3, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexGrow: 1, mb: 3 }}>
          <Typography variant="h2" gutterBottom>{ session.title }</Typography>
          <Typography variant="h6" />
          <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
              <ManageAccountsOutlinedIcon fontSize='large' sx={{ mr: 1 }} /> { session.hostId }
            </Typography>
            {
              (session.hostId === localStorage.getItem("userId")) &&
              <Stack spacing={2} direction="row" sx={{  display: "flex", justifyContent: "flex-end", mr: 2 }}>
                <Link to={`/session/${roomId}/update`} state={session} style={{textDecoration: "none"}} session={session}>
                  <Button variant="filled" sx={{ color: "white", background: "#4A4E69", height: "36px" }}><b>수정</b></Button>
                </Link>
                <Button variant="filled" sx={{ color: "white", background: "red", height: "36px" }} onClick={handleDeleteSession}>
                  <b>삭제</b>
                </Button>
              </Stack>
            }
          </Stack>
          <hr />
          <Box 
            sx={{ mx: 2, px: 2, py: 3, bgcolor: "#E5E5E5", borderRadius: "10px", minHeight: "40%" }}
            dangerouslySetInnerHTML={ replace(session.content) }
          >
          </Box>
        </Box>
        <Stack spacing={2} direction="row" sx={{  display: "flex", justifyContent: "space-between", mr: 2 }}>
          <Link to={"/session"} style={{textDecoration: "none"}}>
            <Button variant="text" sx={{ color:"black" }}>
              <b>뒤로</b>
            </Button>
          </Link>
          <Button variant="filled" onClick={handleEnterSession} sx={{ color:"white", background:"#FCA311" }}>
            <b>참여</b>
          </Button>
          
        </Stack>
      </Box>
    </Container>
  );
}

export default SessionDetail;