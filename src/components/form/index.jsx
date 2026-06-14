import 'bootstrap/dist/css/bootstrap.min.css';
import 'snes.css/dist/snes.min.css';
import { useForm } from "react-hook-form"
import * as sytles from './style.module.css'
import GreenPixeledButton from '../Green-Pixeled-Button';
import FormLabel from '../Form-Label';
import { verifyLogin } from '../../services/pokeApi';
import { useNavigate } from 'react-router-dom';

export default function Form({labe1, labe2, valueMax}) {


    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

  const  onSubmitForm = (data) => {
    const jsonLogin = {
        username: data[labe1],
        password: data[labe2]
    };

    verifyLogin(jsonLogin, navigate);
   };

  return (

    <div className={sytles.container}>
        <form onSubmit={handleSubmit((data) => onSubmitForm(data))}>

            <FormLabel labe={labe1} valueMax={valueMax} register={register} errors={errors}> </FormLabel>
             <FormLabel labe={labe2} valueMax={valueMax} register={register} errors={errors}> </FormLabel>
            
            <GreenPixeledButton message="Enviar!"></GreenPixeledButton>
        </form>
    </div>

  )
}
