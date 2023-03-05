import { LoginForm } from "../components/login"
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function LoginPage(params) {
    return (
        <SidePaddingBox>
            <Navbar />
            <h2>로그인</h2><hr/>
            <LoginForm/>
        </SidePaddingBox>
    )   
}

export default LoginPage