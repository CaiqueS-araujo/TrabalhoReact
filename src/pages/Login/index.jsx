import * as styles from './style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from '../../components/form';
import pokemonLogo from '../../assets/pokemon-logo.svg'
import { useEffect } from 'react';

export default function Login() {

  
useEffect(() => {localStorage.setItem("token", "")}, []);

  return (
    <div className={ `d-flex flex-column align-items-center  ${styles.container}`}>
    <div className="row">
          <div className="col-md-12 col-lg-12 col-12 mb-5 mt-0 d-flex justify-content-center">
             <img src={pokemonLogo} alt="Logo do PokémonGo" className={styles.logo}/>
         </div>
   </div>
    <div className={`${styles.loginCard}`}>
        <div className="row">
               <div className="col-md-12 col-lg-12 col-12 d-flex justify-content-center">
                    <h2>BEM-VINDO TREINADOR</h2>
              </div>
        </div>

        <div className="row">
               <div className="col-12 d-flex justify-content-center">
                    <h6>Insira seus dados e aproveite a aventura Pokémon!</h6>
               </div>
        </div>

        <div className="row">
            <div className="col-md-12 col-lg-12 col-12 d-flex justify-content-center">
                    <Form labe1="username" labe2="password" valueMax= {30} />
            </div>
        </div> 
    </div>
    </div>
  )
}
