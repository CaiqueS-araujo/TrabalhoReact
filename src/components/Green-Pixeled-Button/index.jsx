import 'snes.css/dist/snes.min.css';
import * as sytles from './style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GreenPixeledButton({message}) {
  return (
    <div className={sytles.ButtonClass}>
           <button className='snes-button' type='submit'>{message}</button>
    </div>
  )
}
