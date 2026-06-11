import { Routes, Route } from "react-router-dom";
import MyTeam from "./pages/MyTeam";

function App() {
  return (
    <Routes>
      <Route path="/meu-time" element={<MyTeam />} />
    </Routes>
  );
}

export default App;
