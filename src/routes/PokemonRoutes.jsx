import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MyTeam from "../pages/MyTeam";
import Pokedex from "../pages/Pokedex";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";


export default function PokemonRoutes() {
  return (
    <Routes>
        <Route path = "/" element = {<Pokedex />}/>
        <Route path = "/meu-time" element = {<PrivateRoute> 
                                                <MyTeam />
                                             </PrivateRoute>} />
        <Route path = "/pokedex" element = {<PrivateRoute> 
                                                <Pokedex />
                                            </PrivateRoute>} />

        <Route path="*" element = {<Error />} />
    </Routes>
  )
}
