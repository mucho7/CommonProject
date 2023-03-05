import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "https://ssafy.cossafyco.kro.kr/api/",

  headers: {
    "Content-Type": "application/json",
  },
});