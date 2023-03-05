// import axios from "axios";
import http from "./http.js";

const api = http;

function failHandler(params) {
  const statusCode = params.response.status
  if (statusCode === 401) {
    localStorage.clear()
    document.cookie = "userInfo=undefined"
    window.location.href = "/"
    alert("강 제 로 그 아 웃 !!")
  }
} 

// image 추가하고 활성화활 것
async function signup(user, success, fail) {
  await api.post(`/member/register`, JSON.stringify(user)).then(success).catch(fail)
}

async function login(user, success, fail) {
  await api.post(`/member/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function logout(token, success) {
  api.defaults.headers["Authorization"] = token["Authorization"]
  api.defaults.headers["refreshToken"] = token["refreshToken"]
  await api.post(`/member/logout`, JSON.stringify()).then(success).catch(failHandler);
}

async function readUserInfo(user, success) {
  // api.defaults.headers["Authorization"] = user["Authorization"]
  // api.defaults.headers["refreshToken"] = user["refreshToken"]
  const res = await api.get(`/member/info/${user.userId}`, JSON.stringify(user)).then(success).catch(failHandler);
  return res
}

async function updateUserInfo(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.put(`/member/info/${user.userId}`, JSON.stringify(user)).then(success).catch(failHandler);
}

async function changeUserPassword(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.post(`/member/changePassword`, JSON.stringify(user)).then(success).catch(failHandler);
}

async function deleteUserInfo(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.post(`/member/delete/${user.userId}`, JSON.stringify(user.userId)).then(success).catch(failHandler);
}
  
async function checkSignUp(user, success) {
  const res = await api.get(`/check/${user.key}/${user.value}`, JSON.stringify(user)).then(success).catch(failHandler);
  return res
}

async function visaTempPassword(user, success, fail) {
  await api.post(`/member/tempPassword`, JSON.stringify(user)).then(success).catch(failHandler);
}

export { signup, login, logout, readUserInfo, updateUserInfo, changeUserPassword, deleteUserInfo, checkSignUp, visaTempPassword } ; 