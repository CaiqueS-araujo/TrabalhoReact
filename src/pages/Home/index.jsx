import { useState } from "react";
import styles from './style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const pageLogin = () =>{
    navigate("/");
  };

  const pageTime = () =>{
    navigate("/meu-time");
  };

  const pageDex = () =>{
    navigate("/pokedex");
  };

  return (
    <div className={darkMode ? styles.themeDark : styles.themeNormal}>
    <header>
        <div className={`d-flex align-items-center  ${styles.container}`}>
          <div className='d-flex justify-content-start'>
            <button
            className={`${styles.themeToggle} ${darkMode ? styles.themeToggleDark : ''}`}
              onClick={() => setDarkMode(prev => !prev)}
              arial-label="Alternar modo claro/escuro"
              >
                {darkMode ? '☀️ LIGHT' : '☾ DARK'}
            </button>
            <button className={styles.botaoLog} onClick={pageLogin}>Login</button>
            <button className={styles.botaoDex} onClick={pageTime}>Time</button>
            <button className={styles.botaoTeam} onClick={pageDex}>Pokedex</button>
            

          </div>
        </div>
    </header>
    
    <div className={`${styles.home}`}>
    </div>
    </div>
  )
}
