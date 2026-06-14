import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MyTeam from "../pages/MyTeam";
import Pokedex from "../pages/Pokedex";
import PrivateRoute from "./PrivateRoute";

export default function PokemonRoutes() {
  return (
    <Routes>
        <Route path = "/" element = {<Login />}/>
        <Route path = "/meu-time" element = {<PrivateRoute> 
                                                <MyTeam />
                                             </PrivateRoute>} />
        <Route path = "/pokedex" element = {<PrivateRoute> 
                                                <Pokedex />
                                            </PrivateRoute>} />
    </Routes>
  )
}
