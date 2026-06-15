import "bootstrap/dist/css/bootstrap.min.css";
import "snes.css/dist/snes.min.css";
import * as styles from './style.module.css';
 
export default function FormLabel({ labe, valueMax, register, errors, darkMode }) {
  return (
    <div className={styles.fieldWrapper}>
      <label
        htmlFor={labe}
        className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}
      >
        {labe}
      </label>
 
      <input
        id={labe}
        className={`${styles.input} ${darkMode ? styles.inputDark : ''} ${errors[labe] ? styles.inputError : ''}`}
        {...register(labe, {
          maxLength: {
            value: valueMax,
            message: `Máx. ${valueMax} caracteres`,
          },
          required: `O campo ${labe} é obrigatório!`,
        })}
      />
 
      <div className={styles.errorSlot}>
        {errors[labe] && (
          <p className={`${styles.errorMsg} ${darkMode ? styles.errorMsgDark : ''}`}>
            ⚠ {errors[labe].message}
          </p>
        )}
      </div>
    </div>
  );
}
 
