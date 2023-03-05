import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { CommuArticleUpdate } from '../components/community'

function ArticleCreatePage(params) {

    return (
        <SidePaddingBox>
            <Navbar />
            <CommuArticleUpdate/>
        </SidePaddingBox>
    )
}

export default ArticleCreatePage