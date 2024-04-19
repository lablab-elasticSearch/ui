import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserState from "./contexts/UserState";
import LiveChat from "./pages/LiveChat";

function App() {
  return (
    <UserState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LiveChat/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </UserState>
  );
}

export default App;
