import CreateSession from "../components/CreateSession";
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function CreateSessionPage() {

  return (
    <SidePaddingBox>
        <Navbar />
        <CreateSession />
    </SidePaddingBox>
)
}

export default CreateSessionPage;