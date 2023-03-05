import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickChatButton } from "../../../store/toolBarActionSlice";


function ChatButton(props) {
  const isChatButtonOn = useSelector((state) => state.toolBarAction.isChatButtonOn);
  const dispatch = useDispatch();

  return (
    <CustomButton 
      onClick={() => {dispatch(onClickChatButton());}} 
      isButtonOn={isChatButtonOn}
    >
      채팅
    </CustomButton>
  );
}

export default ChatButton;