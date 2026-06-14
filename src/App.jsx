import { BrowserRouter } from "react-router-dom";
import PokemonRoutes from "./routes/PokemonRoutes";

function App() {
  return (    
     <BrowserRouter>
     <PokemonRoutes> </PokemonRoutes>
     </BrowserRouter>
  );
}

export default App;
