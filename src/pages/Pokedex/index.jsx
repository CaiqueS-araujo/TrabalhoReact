import { useState, useEffect } from "react";
import { searchPokemon } from "../../services/pokeApi";
import PokedexSearch from "../../components/Pokedex/Search/index.jsx";
import PokedexDisplay from "../../components/Pokedex/Display/index.jsx";
import PokedexFavorites from "../../components/Pokedex/Favorites/index.jsx";
import styles from "./style.module.css";

function Pokedex() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = sessionStorage.getItem("pokedex_session_favs");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("pokedex_session_favs", JSON.stringify(favorites));
  }, [favorites]);

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

  const handleAddFavorite = () => {
    if (!pokemon) return;

    if (favorites.length >= 1) {
      alert("Você só pode ter 1 Pokémon favorito.");
      return;
    }

    /*const alreadyExists = favorites.find(fav => fav.id === pokemon.id);
    if (alreadyExists) {
      alert("Este Pokémon já está nos favoritos!");
      return;
    }
    --> Caso queira liberar mais de um favorito.   
    */

    setFavorites([...favorites, { id: pokemon.id, name: pokemon.name, nickname: "" }]);
  };

  const handleRemoveFavorite = (idToRemove) => {
    const newFavorites = favorites.filter(fav => fav.id !== idToRemove);
    setFavorites(newFavorites);
  };

  const handleUpdateFavorite = (idToUpdate, newNickname) => {
    const updatedFavorites = favorites.map(fav => {
      if (fav.id === idToUpdate) {
        return { ...fav, nickname: newNickname };
      }
      return fav;
    });
    setFavorites(updatedFavorites);
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

                <button onClick={handleAddFavorite} className={styles.favButton}>
                  + FAVORITAR
                </button>
              </div>
            ) : (
              <p className={styles.systemText}>AGUARDANDO...</p>
            )}
          </div>

          <PokedexSearch query={query} setQuery={setQuery} handleSearch={handleSearch} />

          <PokedexFavorites
            favorites={favorites}
            handleRemoveFavorite={handleRemoveFavorite}
            handleUpdateFavorite={handleUpdateFavorite}
          />

        </div>

      </div>
    </div>
  );
}

export default Pokedex;


