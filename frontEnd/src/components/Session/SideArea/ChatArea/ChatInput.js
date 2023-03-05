import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useState } from "react";
import { useSelector } from "react-redux";

import { websocketInstances } from "../../../../store/sessionSlice";
import { useParams } from 'react-router-dom';


const boxSx = {
  display: 'flex',
  alignItems: 'center',
  gridTemplateColumns: '5fr 1fr',
  p: 1,
}


function ChatInput(props) {
  const [chatInput, setChatInput] = useState("");
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);
  const userName = localStorage.getItem("userId");
  const { roomId } = useParams();
  const roomName = roomId;

  function handleChangeChatInput(event) {
    setChatInput(event.target.value);
  }

  function handleSubmit() {
    const message = {
      id: "sendChat",
      userName: userName,
      roomName: roomName,
      chat: chatInput
    }
    ws.send(JSON.stringify(message));
    setChatInput("");
  }

  return (
    <Box component="form" sx={boxSx} onSubmit={(event) => handleSubmit(event)}>
      <Paper
        component="form"
        sx={{ flexGrow: 1, background: "#D9D9D9", color: "black", p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: "15px" }}
      >
        <InputBase
          placeholder="메세지를 입력하세요."
          sx={{ ml: 1, flex: 1 }}
          multiline
          maxRows={4}
          value={chatInput}
          onChange={handleChangeChatInput}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <IconButton onClick={handleSubmit} type="button" sx={{ m: '5px', p: '5px', bgcolor: "#FCA311" }}>
          <SendOutlinedIcon />
        </IconButton>
      </Paper>
    </Box>
  )
}

export default ChatInput;