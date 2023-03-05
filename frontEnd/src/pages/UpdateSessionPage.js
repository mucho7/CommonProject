import UpdateSession from "../components/UpdateSession";
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function UpdateSessionPage() {

  return (
    <SidePaddingBox>
        <Navbar />
        <UpdateSession />
    </SidePaddingBox>
  )
}

export default UpdateSessionPage;