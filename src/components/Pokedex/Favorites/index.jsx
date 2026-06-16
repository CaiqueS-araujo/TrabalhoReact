import { useState } from "react";
import styles from "./style.module.css";

function PokedexFavorites({ favorites, handleRemoveFavorite, handleUpdateFavorite }) {
  
  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState("");

  const startEditing = (fav) => {
    setEditingId(fav.id);
    setTempName(fav.nickname || fav.name);
  };

  const saveEditing = (id) => {
    handleUpdateFavorite(id, tempName);
    setEditingId(null);
  };

  return (
    <div className={styles.favoritesContainer}>
      <h3 className={styles.favoritesTitle}>SEU FAVORITO:</h3>
      
      {favorites.length === 0 ? (
        <p className={styles.emptyFavs}>Nenhum salvo.</p>
      ) : (
        <ul className={styles.favList}>
          {favorites.map((fav) => (
            <li key={fav.id} className={styles.favItem}>
              
              {editingId === fav.id ? (
                <div className={styles.editGroup}>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className={styles.editInput}
                    maxLength={12}
                    autoFocus
                  />
                  <button onClick={() => saveEditing(fav.id)} className={styles.saveBtn}>OK</button>
                </div>
              ) : (
                <div className={styles.favInfo}>
                  <span>#{String(fav.id).padStart(3, '0')}</span>
                  <span className={styles.favName}>
                    {fav.nickname ? fav.nickname.toUpperCase() : fav.name.toUpperCase()}
                  </span>
                </div>
              )}
              
              {/* Botões de Ação */}
              <div className={styles.actionButtons}>
                {editingId !== fav.id && (
                  <button onClick={() => startEditing(fav)} className={styles.editBtn} title="Dar Apelido">
                    ✎
                  </button>
                )}
                <button onClick={() => handleRemoveFavorite(fav.id)} className={styles.deleteBtn} title="Remover">
                  X
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PokedexFavorites;