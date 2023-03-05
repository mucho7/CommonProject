import  { HomeCarousel } from '../components/home'
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function HomePage() {
    return (
        <>
        <SidePaddingBox>
            <Navbar />
        </SidePaddingBox>

            <HomeCarousel />
        </>
    )
}

export default HomePage;

