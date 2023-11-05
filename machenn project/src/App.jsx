import {Route,Routes} from "react-router-dom";
import './App.css'
import Home from './pages/HomePage';
import Main from './pages/MainPage';
import UpdateForm from "./components/UpdateForm";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/home" element={<Main/>}></Route>
      <Route path="/home/:id" element={<UpdateForm/>}></Route>
    </Routes>
    </>
  )
}

export default App
