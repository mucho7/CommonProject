import { useSelector, useDispatch } from "react-redux";
import { onClickAuthorizeButton } from "../../../store/toolBarActionSlice";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import IconButton from '@mui/material/IconButton';


function AuthorizeButton(props) {
  const isAuthorizeButtonOn = useSelector((state) => state.toolBarAction.isAuthorizeButtonOn);
  const dispatch = useDispatch();

  return (
    <IconButton 
      onClick={() => {dispatch(onClickAuthorizeButton());}} 
      sx={{ 
        width: "50px", 
        height: "50px", 
        m: '5px', 
        p: '5px', 
        bgcolor: isAuthorizeButtonOn ? "#FCA311" : "#E5E5E5" 
      }}
    >
      <ManageAccountsOutlinedIcon fontSize='large' />
    </IconButton>
  );
}

export default AuthorizeButton;