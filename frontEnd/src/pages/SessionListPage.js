import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

import SessionList from "../components/SessionList";
import SessionListToolBar from "../components/SessionList/SessionListToolBar";

function SessionListPage() {

    return (
        <SidePaddingBox>
            <Navbar />
            <SessionListToolBar />
            <SessionList />
        </SidePaddingBox>
    )
}

export default SessionListPage;