import { useState } from "react";
import { searchPokemon } from "../../services/pokeApi";
import PokedexSearch from "../../components/PokedexSearch";
import PokedexDisplay from "../../components/PokedexDisplay";
import styles from "./style.module.css";

function Pokedex() {
  const [query, setQuery] = useState(""); 
  const [pokemon, setPokemon] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (!query.trim()) {
      setError("Digite um nome/número!");
      return;
    }
    setLoading(true);
    setError("");
    setPokemon(null);
    try {
      const data = await searchPokemon(query.toLowerCase());
      setPokemon(data);
    } catch (err) {
      setError("Pokémon não encontrado!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pokedexContainer}>
      <div className={styles.pokedexBody}>
        
        <div className={styles.leftPanel}>
          <div className={styles.blueLens}></div>
          <PokedexDisplay pokemon={pokemon} loading={loading} error={error} />
        </div>

        <div className={styles.hinge}></div>

        <div className={styles.rightPanel}>
          
          <div className={styles.infoScreen}>
            {pokemon ? (
               <div className={styles.infoContent}>
                 <h2>{pokemon.name.toUpperCase()}</h2>
                 <p><strong>TIPOS:</strong> {pokemon.types.join(", ")}</p>
                 <p><strong>MOVS:</strong> {pokemon.moves.join(", ")}</p>
               </div>
            ) : (
              <p className={styles.systemText}>AGUARDANDO...</p>
            )}
          </div>

          <PokedexSearch query={query} setQuery={setQuery} handleSearch={handleSearch} />
          
        </div>

      </div>
    </div>
  );
}

export default Pokedex;