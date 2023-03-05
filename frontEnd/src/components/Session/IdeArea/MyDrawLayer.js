import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { websocketInstances } from "../../../store/sessionSlice";

import IconButton from '@mui/material/IconButton';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

const DrawDiv = styled.div`
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0);
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const DrawingTool = styled.div`
  position: absolute;
  z-index: 150;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`


function MyDrawLayer(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("#ffffff");
  const [isEraseMode, setIsEraseMode] = useState(false);
  const userName = localStorage.getItem("userId");
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);
  
  
  function initCanvas() {
    const drawDiv = document.querySelector("#canvas");
    const canvas = canvasRef.current;
    canvas.width = drawDiv.clientWidth * 2;
    canvas.height = drawDiv.clientHeight * 2;
    canvas.style.width = `${drawDiv.clientWidth}px`;
    canvas.style.height = `${drawDiv.clientHeight}px`;
    
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 5;
    contextRef.current = context;

    // const stream = canvas.captureStream(25);
    // console.log("stream:",stream);
  }
  
  useEffect(() => {
    initCanvas();
  }, []);

  
  useEffect(() => {
    function handleResize() {
      let imageData = canvasRef.current.toDataURL();
      let img = new Image();
      // console.log(imageData)
      // // console.log(img)
      initCanvas();
      img.src = imageData;
      img.onload = function() {
        contextRef.current.drawImage(img, 0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      };
      // console.log(imageData)
      // console.log(typeof imageData)
      // console.log(img)
      console.log("width:", canvasRef.current.width)
      console.log("clientWidth:", canvasRef.current.clientWidth)
      // console.log(canvasRef.current)
      // let image = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
      // initCanvas();
      // contextRef.current.putImageData(image, 0, 0)
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])


  function sendImageData(type, data) {
    let imageData;

    switch (type) {
      case "startDrawing":
        imageData = { type, x: data.x, y: data.y };
        break;
      case "finishDrawing":
        imageData = { type };
        break;
      case "draw":
        imageData = { type, x: data.x, y: data.y };
        break;
      case "erase":
        imageData = { type };
        break;
      case "eraseAll":
        imageData = { type };
        break;
      case "onChangeColor":
        imageData = { type, color: data.color };
        break;
      default:
        break;
    }
    const message = {
      id: "sendImageData",
      userName: userName,
      imageData: imageData
    }
    ws.send(JSON.stringify(message));
    // console.log("Send Image")
  }


  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    sendImageData("startDrawing", {x: offsetX, y: offsetY});
  }

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    sendImageData("finishDrawing", {});
  }

  const draw = ({nativeEvent}) => {
    // console.log(nativeEvent)
    if (!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    if (isEraseMode) {
      contextRef.current.clearRect(offsetX-5, offsetY-5, 10, 10);
    } else {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke()
    }
    // console.log(offsetX)
    sendImageData("draw", {x: offsetX, y: offsetY});
  }


  const eraseAll = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    sendImageData("eraseAll", {});
  }

  const erase = () => {
    setIsEraseMode(!isEraseMode);
    sendImageData("erase", {});
  }

  function onChangeColor(event) {
    setDrawColor(event.target.value);
    // console.log(event.target.value);
    contextRef.current.strokeStyle = drawColor;
    sendImageData("onChangeColor", {color: event.target.value});
  }

  return (
    <DrawDiv id="canvas">
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <DrawingTool>
        <IconButton onClick={eraseAll} type="button" sx={{ bgcolor: "#E5E5E5", height: 40, width: 40 }}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
        <IconButton onClick={erase} type="button" sx={{ bgcolor: "#E5E5E5", height: 40, width: 40 }}>
          { isEraseMode ? <ModeEditOutlinedIcon /> : <AutoFixHighOutlinedIcon /> }
        </IconButton>
        <IconButton onClick={onChangeColor} value="#ffffff" sx={{border: 2, borderColor: "white", bgcolor: "#ffffff", height: 40, width: 40 }} />
        <IconButton onClick={onChangeColor} value="#9999ff" sx={{border: 2, borderColor: "white", bgcolor: "#9999ff", height: 40, width: 40 }} />
        <IconButton onClick={onChangeColor} value="#66ffcc" sx={{border: 2, borderColor: "white", bgcolor: "#66ffcc", height: 40, width: 40 }} />
        <IconButton onClick={onChangeColor} value="#ffff66" sx={{border: 2, borderColor: "white", bgcolor: "#ffff66", height: 40, width: 40 }} />
        <IconButton onClick={onChangeColor} value="#ff99cc" sx={{border: 2, borderColor: "white", bgcolor: "#ff99cc", height: 40, width: 40 }} />
      </DrawingTool>
    </DrawDiv>
  );
}

export default MyDrawLayer;