import styled from 'styled-components';

import { useState, useMemo } from 'react';
import { useSearchParams } from "react-router-dom";

import { getSessionList } from '../../api/session';
import SessionListItem from './SessionListItem';

function SessionList() {

  const samples = [
    {
      roomId: "1",
      hostId: "A",
      title: "AAAAAAAAA",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto officiis corrupti saepe, repellat consequuntur accusantium molestias laboriosam sequi ratione aliquid fuga. Dicta maiores eos ad tempora, tenetur eveniet labore praesentium.",
      mode: "study"
    },
    {
      roomId: "2",
      hostId: "B",
      title: "BBBBBBBBBBBBBB",
      content: "asdfdsgdjgwoefwe",
      mode: "study"
    }
  ]

  const [searchParams, setSearchParams] = useSearchParams();
  const [sessionList, setSessionList] = useState(samples);
  

  useMemo(() => {
    const params = {
      title: searchParams.get("title") ? searchParams.get("title") : "",
      hostId: searchParams.get("hostId") ? searchParams.get("hostId") : ""
    }
    
    const enterSessionList = async () => {
      await getSessionList(
        params,
        (data) => {return data.data},
        (err) => console.log(err)
      ).then((data) => {
        setSessionList(data);
      })
    }
    enterSessionList();
  }, [searchParams])


  return (
    <SessionListBox>
      <SessionListItem sessionList={sessionList} />
    </SessionListBox>
  )
}


const SessionListBox = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    width: 100%;
`

export default SessionList;