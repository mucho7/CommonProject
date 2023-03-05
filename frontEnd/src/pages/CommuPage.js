import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { CommuArticleList,  } from "../components/community"
import CommuToolBar from '../components/community/CommuToolBar';

import BackgroundImg from "../assets/Board/back.png"

function CommuPage() {

    return (
        <SidePaddingBox style={{backgroundImage: BackgroundImg}}>
            <Navbar />
            <CommuToolBar/>
            <CommuArticleList/>
        </SidePaddingBox>
    )
}

export default CommuPage