import 'bootstrap/dist/css/bootstrap.min.css';
import 'snes.css/dist/snes.min.css';
import { useForm } from "react-hook-form"
import * as sytles from './style.module.css'
import GreenPixeledButton from '../Green-Pixeled-Button';
import FormLabel from '../Form-Label';
import api from '../../service/service'

export default function Form({labe1, labe2, valueMax}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

  const  onSubmitForm = (data) => {
        api.get("/aventureiro")
        .then((response) => {
            
            const resp = response.data[0]

            if(resp[labe1] === data[labe1] && resp[labe2] === data[labe2]){
                alert("Logado com sucesso!");
            }
            else{
                alert("Credenciais incorretas!");
            }
        })
        .catch(() => {alert("Erro na requisição!")})
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
