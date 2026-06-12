import "bootstrap/dist/css/bootstrap.min.css";
import "snes.css/dist/snes.min.css";

export default function FormLabel({ labe, valueMax, register, errors }) {


    return (
        <div>
            <div className="row">
                <div className="col-md-12 col-lg-12 col-12 d-flex justify-content-center">
                    <label htmlFor={`${labe}`}>{labe}</label>
                </div>
            </div>

            <div className="row">
                <input
                    {...register(labe, {
                        maxLength: {
                            value: valueMax,
                            message: `O campo ${labe} deve ter no máximo ${valueMax} caracteres`,
                        },
                        required: `O campo ${labe} deve ser preenchido!`,
                    })}
                />
            </div>
            <div className="errormesage">
                <p className="text-plumber-color">{errors[labe]?.message}</p>
            </div>
        </div>
    );
}
