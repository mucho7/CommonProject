import axios from "axios";

const api = axios.create({
  baseURL: "https://ssafy.cossafyco.kro.kr/api/function",

  headers: {
    "Content-Type": "application/json",
  },
});

async function compileCode(compileDto, success, fail) {
  const res = await api.post("/compile", compileDto).then(success).catch(fail);
  return res
}


export { 
  compileCode
};