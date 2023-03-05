import styled from "styled-components";



const TimerAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  flex: 4;
  width: 100%;
`;

const TimerAreaTitleBarDiv = styled.div`
  height: 35px;
  background-color: #14213D;
  color: white;
`


function TimerArea() {
  return (
    <TimerAreaDiv>
      <TimerAreaTitleBarDiv>
        <p>Timer</p>
      </TimerAreaTitleBarDiv>
      Timer Area
    </TimerAreaDiv>
  )
}

export default TimerArea;