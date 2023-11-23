'use client';
import { createContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { inicio_sesion } from '../componentes/hooks/Autenticacion';
import { estaSesion } from '../componentes/hooks/SessionUtil';
const MyContext = createContext();
import { useRouter } from 'next/navigation';


export default function Page() {
    //-----------------------------------------
    const router = useRouter();
    //-----------------------------------------
    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Ingrese su clave'),
        email: Yup.string().required('Ingrese su correo').email('Ingrese un correo')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const sendData = (data) => {
        var data = { "email": data.email, "password": data.password, "resource": "login" };
        inicio_sesion(data).then((info) => {
            if (!estaSesion()) {
                //mensajes("Error en inicio de sesion", info.msg, "error");
            } else {
                router.push('/principal');
            }
        });
    };

    return (
        <section className="text-center text-lg-start">


            <div className="container py-4" style={{ cascading: "margin-right: -50px", media: "max-width: 991.98px" }}>
                <div className="row g-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card cascading-right">
                            <div className="card-body p-5 shadow-5 text-center">
                                <h2 className="fw-bold mb-5">Iniciar sesion</h2>
                                <form onSubmit={handleSubmit(sendData)}>
                                    <div className="form-outline mb-4">
                                        <input {...register('email')} name="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                        <label className="form-label" >Nùmero de cedula</label>
                                        <div className='alert alert-danger invalid-feedback'>{errors.email?.message}</div>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input {...register('password')} type='password' name="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                        <label className="form-label" >Clave</label>
                                        <div className='alert alert-danger invalid-feedback'>{errors.password?.message}</div>
                                    </div>


                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Iniciar sesion
                                    </button>

                                    <div className="text-center">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <img src="https://cdn5.dibujos.net/dibujos/pintar/escuela.png" className="w-100 rounded-4 shadow-4"
                            alt="" style={{ margin: "50px" }} />
                    </div>
                </div>
            </div>

        </section>
    );
}