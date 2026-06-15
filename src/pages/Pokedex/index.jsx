import { useState } from "react";
import { searchPokemon } from ".././../services/pokeApi.js";
import PokedexSearch from "../../components/Pokedex/Search/index.jsx";
import PokedexDisplay from "../../components/Pokedex/Display/index.jsx";
import styles from "./style.module.css";

function Pokedex() {
  const [query, setQuery] = useState(""); 
  const [pokemon, setPokemon] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  
  // Novo estado para o Modo Escuro
  const [darkMode, setDarkMode] = useState(false); 

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
    
    <div className={darkMode ? styles.pokedexContainerDark : styles.pokedexContainer}>
      
      <button
        className={`${styles.themeToggle} ${darkMode ? styles.themeToggleDark : ''}`}
        onClick={() => setDarkMode(prev => !prev)}
        aria-label="Alternar modo claro/escuro"
      >
        {darkMode ? '☀ LIGHT' : '☾ DARK'}
      </button>

      <div className={darkMode ? styles.pokedexBodyDark : styles.pokedexBody}>
        
        <div className={darkMode ? styles.leftPanelDark : styles.leftPanel}>
          <div className={styles.blueLens}></div>
          <PokedexDisplay pokemon={pokemon} loading={loading} error={error} />
        </div>

        <div className={darkMode ? styles.hingeDark : styles.hinge}></div>

        <div className={darkMode ? styles.rightPanelDark : styles.rightPanel}>
          
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


