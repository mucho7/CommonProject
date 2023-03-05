import { SigninForm } from "../components/signin"
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function SigninPage(params) {
    return (
        <SidePaddingBox>
            <Navbar />
            <h2>회원 가입</h2><hr/>
            <SigninForm/>
        </SidePaddingBox>
    )
}

export default SigninPage