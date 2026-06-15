import * as styles from "./style.module.css"
import annoyedeeveeq from "../../assets/annoyedeeveeq.png"
import bruheeve from "../../assets/bruheeveeq.png"

export default function Error() {
  return (
    <article className={styles.container}>
        <div className={styles.errorCard}> 
            <div className={styles.errorParagraph}>
                 <p>Error 404</p>
             </div>

             <div className={styles.errorParagraph}>
                 <p>Liga não encontrada, aventureiro!!</p>
             </div>

             <div className={styles.emojis}>
                <img src={annoyedeeveeq} alt="Eevee desapontado" />
                <img src={bruheeve} alt="Eevee incrédulo" />
             </div>
            
        </div>
    </article>
  )
}
