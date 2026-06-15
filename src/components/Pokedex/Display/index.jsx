import styles from "./style.module.css";
import { spriteArtwork } from "../../../utils/sprites";

function PokedexDisplay({ pokemon, loading, error }) {
  return (
    <div className={styles.mainScreen}>
      {loading && <p className={styles.systemText}>Carregando dados...</p>}
      {error && <p className={styles.systemTextError}>{error}</p>}
      
      {pokemon && !loading && (
        <div className={styles.pokemonDisplay}>
          <img 
            src={spriteArtwork(pokemon.id)} 
            alt={pokemon.name} 
            className={styles.pokemonImage}
          />
          <p className={styles.pokemonId}>Nº {pokemon.id}</p>
        </div>
      )}
    </div>
  );
}

export default PokedexDisplay;