import styled from "styled-components"
import { Link } from "react-router-dom"

function Error404Page() {

    return (
        <Link to={'/'}>
            <The404Img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/29114911635233.560faec741ec6.jpg"/>
        </Link >
    )
}

const The404Img = styled.img`
    width: 100%;
    height: 100%;
`

export default Error404Page