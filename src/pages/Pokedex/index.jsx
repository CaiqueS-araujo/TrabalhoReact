import { useState } from "react";
import { searchPokemon } from "../../services/pokeApi";
import { spriteArtwork } from "../../utils/sprites";
import styles from "./style.module.css";

function Pokedex() {

    const [query, setQuery] = useState("");
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {

        e.preventDefault();

        if (!query.trim()) {
            setError("Por favor, digite o nome ou número de registro.");
            return;
        }

        setLoading(true);
        setError("");
        setPokemon(null);

        try {    
            const data = await searchPokemon(query.toLowerCase());
            setPokemon(data);
        }
        catch (err) {
            setError("Pokémon não encontrado! Verifique o nome ou número.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pokedexContainer}>
            <div className={styles.pokedexBody}>

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

                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Nome ou ID (ex: 25 ou pikachu)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        BUSCAR
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Pokedex;