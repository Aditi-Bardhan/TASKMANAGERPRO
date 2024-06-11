
import {BrowserRouter,Routes,Route} from "react-router-dom";
import OwnerHomePage from "./OwnerDashboard/HomePage";
import Enterance from "./login/enterance";
import Login from "./login/sigin";
import Registration from "./login/signup";
import Profile from "./Profile/profile";
import List from "./OwnerDashboard/PropertyList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Enterance/>} />
        <Route path="/register" element={<Registration />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/AddTask" element={<OwnerHomePage/>} />
        <Route path="/List" element={<List/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update/:id" element={<OwnerHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
