import axios from "axios";

// axios 객체 생성
const api = axios.create({
// env로 대체할 것
  baseURL: "https://ssafy.cossafyco.kro.kr/api/session",
  // baseURL: "http://localhost:8013",

  headers: {
    "Content-Type": "application/json",
  },
});

// 목록 조회: /room?mode={mode}&hostId={host_id}&title={title}
async function getSessionList(searchParams, success, fail) {
  let queryString = "";
  if (searchParams.hostId !== "") {
    queryString += `&hostId=${searchParams.hostId}`;
  }
  if (searchParams.title !== "") {
    queryString += `&title=${searchParams.title}`;
  }
  const res = await api.get(`/session?mode=study` + queryString).then(success).catch(fail);
  return res
}

// 상세 조회: /room?mode={mode}&hostId={host_id}&title={title}
async function getSessionDetail(roomId, success, fail) {
  const res = await api.get(`/session/${roomId}`).then(success).catch(fail);
  return res
}

// 생성 
// {
// roomId: ‘’,
// hostId: ‘’,
// title: ‘’,
// content: ‘’,
// hostRating: ‘’,
// mode: ‘’,
// max: ‘’,
// }
async function createSession(sessionInfo, success, fail) {
  const res = await api.post(`/session`, sessionInfo).then(success).catch(fail);
  return res
}

async function deleteSession(roomId, success, fail) {
  const res = await api.delete(`/session/${roomId}`).then(success).catch(fail);
  return res
}

async function updateSession(roomId, sessionInfo, success, fail) {
  const res = await api.put(`/session/${roomId}`, sessionInfo).then(success).catch(fail);
  return res
}

async function enterSession(roomId, userId, success, fail) {
  const res = await api.put(`/session/enter/${roomId}?userId=${userId}`).then(success).catch(fail);
  return res
}


export { 
  getSessionList, 
  getSessionDetail, 
  createSession, 
  deleteSession, 
  updateSession, 
  enterSession 
};