import { useMemo, useState } from "react";
import { Link } from "react-router-dom"

import { getBoardImg } from "../../api/community";

import styled from "styled-components"
import { Card, CardContent, Grid,  } from '@mui/material'


function CommuArticleListItem(props) {
    const createdAt = props.article.createdAt
    const article = props.article

    const date = new Date()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')

    const paperColor = 'rgba(250, 247, 244, 1)'
    const gradient = `linear-gradient(0deg, ${paperColor} 0%, ${paperColor} 100px, rgba(250, 247, 244, 0) 100%),`;
    
    const [ boardImg, setBoardImg ] = useState()

    useMemo(() => {
        const getBoardIamge = async () => {
            await getBoardImg(
                props.article,
                (data) => {
                    return data.data
                },
            ).then((data) => {
                const newFile = new File([data], props.article.id);
                const reader = new FileReader();
                reader.onload = (event) => {
                    const previewImage = String(event.target?.result);
                    setBoardImg(previewImage);
                };
                reader.readAsDataURL(newFile);
            })
        }
        getBoardIamge()
    }, [props.article])


    return (
        <Grid item xs={3} key={article.id} >
            <Link to={`${article.id}`} state={article} style={{textDecoration: 'none', color: 'black'}}>
                <Card sx={{height: "290px", margin: '4px',}} >
                    <CardContent sx={{height: "100%", backgroundImage: `${gradient} url(${boardImg})`, margin: "10px"}}>
                        <CardContentItemBox>
                            <TitleBox>{article.title}</TitleBox>
                            <CardContentItem >
                                {createdAt.slice(5, 7) === month
                                    ? createdAt.slice(8, 10) === day 
                                    ? parseInt(createdAt.slice(11, 13)) + 9 === parseInt(hour) 
                                    ? createdAt.slice(14, 16) === minute
                                    ? "방금 전"
                                    : parseInt(minute) - parseInt(createdAt.slice(14, 16)) + "분 전"
                                    : parseInt(hour) - parseInt(createdAt.slice(11, 13)) - 9 + "시간 전"
                                    : createdAt.slice(5, 10)
                                    : createdAt.slice(5, 10)
                                }
                            </CardContentItem>
                            <CardContentItem> · {article.commentCnt} 개의 댓글</CardContentItem>
                            <hr style={{color: "#CCCCCC"}}/>
                            <Row>
                                <CardContentItem>by <b>{article.writer}</b></CardContentItem>
                                <CardContentItem>{article.hit} viewed</CardContentItem>
                            </Row>
                        </CardContentItemBox>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}

const TitleBox = styled.h3`
    width: 90%;
    margin: 5px 5px 5px 0px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: black;
`

const CardContentItem = styled.span`
    color: black;
    font-family: "Open Sans", sans-serif;
`

const CardContentItemBox = styled.div`
    position: relative;
    top: 45%;
    background : rgba(250, 247, 244, 0.5);
    // background : white;
    padding: 10px;
    border-radius: 10px
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

export default CommuArticleListItem