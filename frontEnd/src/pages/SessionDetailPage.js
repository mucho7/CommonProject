import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import SessionDetail from '../components/SessionDetail';


function SessionDetailPage() {

    return (
        <SidePaddingBox>
            <Navbar />
            <SessionDetail />
        </SidePaddingBox>
    )
}

export default SessionDetailPage;