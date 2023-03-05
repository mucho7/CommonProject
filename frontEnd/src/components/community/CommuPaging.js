import { useEffect, useState } from "react"

import styled from "styled-components"
import { Button } from "@mui/material"

function CommuPaging(params) {
    const [ index, setIndex ]  = useState([1, 2, 3, 4, 5])
    const [ chagePage, setChangePage ] = useState(false)

    const onArrClickHandler = (event) => {
        if (String(index[0] + 5) === event.target.value){
            setIndex(index.map((item) => item + 5))
        } else {
            setIndex(index.map((item) => item - 5))
        }
        setChangePage(true)
    }

    useEffect(() => {
        if (chagePage) {
            params.onClick(index[0])
            setChangePage(false)
        }
        
    }, [index, params, chagePage])

    return(
        <PagingNumberBox>
            <Button value={index[0] - 5} onClick={onArrClickHandler} style={{textDecoration: "none"}}
            disabled={index[0] < 5 ? true : false} > &lt;&lt;&lt; </Button>
            {index.map(item => {
                return (
                    <Button value={item} onClick={params.onClick} disabled={params.maxPage < item ? true : false} style={{textDecoration: "none"}} key={item}>{item}</Button>
                )
            })}
            <Button value={index[0] + 5} style={{textDecoration: "none"}} onClick={onArrClickHandler} 
            disabled={index[0] + 5 >= params.maxPage ? false : true}> &gt;&gt;&gt; </Button>
        </PagingNumberBox>
    )
}

const PagingNumberBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;

    margin-top: 15px;
    margin-bottom: 15px;
`

export default CommuPaging