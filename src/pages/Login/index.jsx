import { useState, useEffect } from 'react';
import * as styles from './style.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from '../../components/form';
import pokemonLogo from '../../assets/pokemon-logo.svg';
 
export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
 
  useEffect(() => {
    localStorage.setItem("token", "");
  }, []);
 
  return (
    <div className={`${darkMode? styles.rootDark : styles.root} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.bgOverlay} />
      <button
        className={`${styles.themeToggle} ${darkMode ? styles.themeToggleDark : ''}`}
        onClick={() => setDarkMode(prev => !prev)}
        aria-label="Alternar modo claro/escuro"
      >
        {darkMode ? '☀ LIGHT' : '☾ DARK'}
      </button>
 
      <div className={styles.logoWrapper}>
        <img src={pokemonLogo} alt="Logo do Pokémon" className={styles.logo} />
      </div>
 
      <div className={`${styles.loginCard} ${darkMode ? styles.loginCardDark : ''}`}>
        <h2 className={`${styles.title} ${darkMode ? styles.titleDark : ''}`}>
          BEM-VINDO TREINADOR
        </h2>
        <p className={`${styles.subtitle} ${darkMode ? styles.subtitleDark : ''}`}>
          Insira seus dados e aproveite a aventura Pokémon!
        </p>
 
        <Form labe1="username" labe2="password" valueMax={50} darkMode={darkMode} />
      </div>
    </div>
  );
}
 
