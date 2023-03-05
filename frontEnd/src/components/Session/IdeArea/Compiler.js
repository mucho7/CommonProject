import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { compileCode } from "../../../api/sessionFunction";


const TitleP = styled.p`
  text-align: start;
  margin: 10px auto 5px 2.5%;
`

const OutputDiv = styled.div`
  width: 95%;
  flex-grow: 1;
  overflow: auto;
  margin: 2 0;
`


function Compiler(props) {

  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const code =  useSelector((state) => state.compile.code);
  
  const [processing, setProcessing] = useState(false);


  async function handleCompile() {
    setProcessing(true);
    const compileDto = {
      code: code,
      id: localStorage.getItem("userId"),
      input: userInput
    };

    await compileCode(
      compileDto,
      (data) => {
        return data.data
      },
      (err) => console.log(err)
    )
      .then((data) => {
        setOutput(data);
      })
    
    setProcessing(false)
  };
  

  return (
    <Box sx={{ height: 300, display: "flex" }}>
      <Paper
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%", background: "#D9D9D9", color: "black", p: '2px 4px', borderRadius: "15px" }}
      >
        <TitleP>INPUT</TitleP>
        <InputBase
          placeholder="input..."
          sx={{ width: "95%", flexGrow: 1, overflow: "auto", my: 2 }}
          multiline
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button
          size="small"
          onClick={handleCompile}
          disabled={!code || processing}
          variant="filled"
          sx={{ color: "white", background: "#4A4E69" }}
        >
          {processing ? "Processing" : "Run"}
        </Button>
      </Paper>
      <Paper
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%", background: "#D9D9D9", color: "black", p: '2px 4px', borderRadius: "15px" }}
      >
        <TitleP>OUTPUT</TitleP>
        {output && <OutputDiv>{output}</OutputDiv>}
      </Paper>
    </Box>
  )
}


export default Compiler;