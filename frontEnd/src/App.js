import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './pages';

// function openNewWindow() {
//   const options = "scrollbars=no, menubar=no, width=1280, height=720, status=no, top=100, left=100";
//   window.open("http://localhost:3000/normal", "Session", options);
// }

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
