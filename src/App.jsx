
import { Routes, Route } from "react-router-dom";
import MyTeam from "./pages/MyTeam";
import Login from "./pages/Login/index"
import Pokedex from "./pages/Pokedex/index";

function App() {
  return (    
    <Routes>
      <Route path="/meu-time" element={<MyTeam />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pokedex" element={<Pokedex />} />
    </Routes>
  );
}

export default App;
