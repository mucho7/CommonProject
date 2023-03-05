import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { CommuArticleCreate } from '../components/community'

function ArticleCreatePage(params) {

    return (
        <SidePaddingBox>
            <Navbar />
            <CommuArticleCreate/>
        </SidePaddingBox>
    )
}

export default ArticleCreatePage