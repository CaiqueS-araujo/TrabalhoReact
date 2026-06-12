
import { Routes, Route } from "react-router-dom";
import MyTeam from "./pages/MyTeam";
import Login from "./pages/Login/index"

function App() {
  return (    
    <Routes>
      <Route path="/meu-time" element={<MyTeam />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
