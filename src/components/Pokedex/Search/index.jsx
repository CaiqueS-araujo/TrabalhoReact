import styles from "./style.module.css";

function PokedexSearch({ query, setQuery, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <input
        type="text"
        placeholder="Nome ou ID (ex: 25 ou pikachu)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
        maxLength={12} 
      />
      <button type="submit" className={styles.searchButton}>
        BUSCAR
      </button>
    </form>
  );
}

export default PokedexSearch;