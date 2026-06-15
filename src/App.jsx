import { BrowserRouter } from "react-router-dom";
import PokemonRoutes from "./routes/PokemonRoutes";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  return (    
     <BrowserRouter>
     <PokemonRoutes> </PokemonRoutes>
     <AudioPlayer> </AudioPlayer>
     </BrowserRouter>
  );
}

export default App;
