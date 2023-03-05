import NormalSession from "./NormalSessionPage";
// import RelaySession from "./RelaySessionPage";
import CreateSessionPage from "./CreateSessionPage";
import SessionListPage from "./SessionListPage";
import SessionDetailPage from "./SessionDetailPage";
import HomePage from "./HomePage";
import CommuPage from "./CommuPage";
import SigninPage from "./SigninPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import LogoutPage from "./LogoutPage";
import ArticleDetailPage from "./ArticleDetailPage";
import ArticleCreatePage from "./ArticleCreatePage";
import ArticleUpdatePage from "./ArticleUpdatePage"
import UpdateSessionPage from "./UpdateSessionPage";
import Error404Page from "./Error404Page"

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Error404Page/>,
  },
  // 일반 페이지 관련
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/useri",
    element: <SigninPage/>,
  },
  {
    path: "/useri/login",
    element: <LoginPage/>,
  },
  {
    path: "/useri/logout",
    element: <LogoutPage/>,
  },
  {
    path: "/useri/:user_id",
    element: <ProfilePage/>,
  },
  // 게시판 관련
  {
    path: "/community",
    element: <CommuPage/>,
  },
  {
    path: "/community/write",
    element: <ArticleCreatePage/>,
  },
  {
    path: "/community/:articlePk",
    element: <ArticleDetailPage/>,
  },
  {
    path: "/community/update/:articlePk",
    element: <ArticleUpdatePage/>,
  },
  // Session 관련
  {
    path: "/session/:roomId/study",
    element: <NormalSession />,
  },
  // {
  //   path: "/session/:roomId/relay",
  //   element: <RelaySession />,
  // },
  {
    path: "/session/:roomId/update",
    element: <UpdateSessionPage />
  },
  {
    path: "/session/create",
    element: <CreateSessionPage />,
  },
  {
    path: "/session/:roomId",
    element: <SessionDetailPage />,
  },
  {
    path: "/session",
    element: <SessionListPage />,
  },
]);

export default router;