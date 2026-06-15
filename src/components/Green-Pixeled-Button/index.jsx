import 'snes.css/dist/snes.min.css';
import * as sytles from './style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GreenPixeledButton({message, darkMode}) {
  return (
    <div className={sytles.ButtonClass}>
           <button className = { darkMode ? 'snes-button has-sunshine-color'  : 'snes-button'} type='submit'>{message}</button>
    </div>
  )
}
