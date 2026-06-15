import { useState } from "react";
import { searchPokemon } from "../../services/pokeApi";
import PokedexSearch from "../../components/Pokedex/Search";
import PokedexDisplay from "../../components/Pokedex/Display";
import styles from "./style.module.css";

function Pokedex() {
  const [query, setQuery] = useState(""); 
  const [pokemon, setPokemon] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const handleSearch = async (e) => {
    e.preventDefault(); 
    
    if (!query.trim()) {
      setError("Por favor, digite um nome ou número.");
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
        
        <PokedexDisplay pokemon={pokemon} loading={loading} error={error} />

        <div className={styles.infoScreen}>
          {pokemon ? (
             <div className={styles.infoContent}>
               <h2>{pokemon.name.toUpperCase()}</h2>
               <p><strong>Tipos:</strong> {pokemon.types.join(", ")}</p>
               <p><strong>Movimentos:</strong> {pokemon.moves.join(", ")}</p>
             </div>
          ) : (
            <p className={styles.systemText}>Aguardando pesquisa...</p>
          )}
        </div>

        <PokedexSearch query={query} setQuery={setQuery} handleSearch={handleSearch} />

      </div>
    </div>
  );
}

export default Pokedex;