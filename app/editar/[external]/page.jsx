'use client';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { ObtenerTodo, obtener,enviar } from '@/app/componentes/hooks/Conexion';
import mensajes from '@/app/componentes/Mensajes';
import { getToken } from '@/app/componentes/hooks/SessionUtilClient';
import { useRouter } from 'next/navigation';


export default function Page({ params }) {
    const{external}=params;
    const validationSchema = Yup.object().shape({
        weight: Yup.string().required('Ingrese una weight'),
        height: Yup.string().required('Ingrese el valor height'),
        representative: Yup.string().required('Ingrese el representative'),
        activities: Yup.string().required('Ingrese el activities'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, setValue, watch, handleSubmit, formState } = useForm(formOptions);
    const router = useRouter();
    const { errors } = formState;
    const [cursos, setCursos] = useState([]);
    const [ninos, setNinos] = useState([]);
    const [escuelas, setEscuelas] = useState([]);

    useEffect(() => {
        const obtenerCurso = async () => {
            try {
                const response = await obtener('examen.php/?resource=course');
                const resultado = response.info;
                console.log("aaaaaaaaaa", resultado);
                setCursos(resultado)
                console.log(cursos.datos);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerCurso();
    }, []);

    useEffect(() => {
        const obtenerNino = async () => {
            try {
                const token = getToken();
                const response = await ObtenerTodo('examen.php/?resource=unregistered_children', token);
                const resultado = response.info;
                console.log("nnnnn", resultado);
                setNinos(resultado)
                console.log(ninos.info);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerNino();
    }, []);

    useEffect(() => {
        const obtenerEscuela = async () => {
            try {
                const token = getToken();
                const response = await ObtenerTodo('examen.php/?resource=school', token);
                const resultado = response.info;
                console.log("nnnnn", resultado);
                setEscuelas(resultado)
                console.log(escuelas.info);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerEscuela();
    }, []);

    const onSubmit = (data) => {
        const externalUsuario = obtenerExternalUsuario();  // Obtener el external del sessionStorage

        if (!externalUsuario) {
            console.error("No se pudo obtener el external del usuario desde el sessionStorage");
            return;
        }

        const newData = {
            "resource": "updateCensus",
            "weight": data.weight,
            "height": data.height,
            "representative": data.representative,
            "activities": data.activities,
            "external_school": data.external_school,
            "external_course": data.external_course,
            "external": external
        };

        const token = getToken();
        console.log("kjskcshdlc", token);
        console.log(newData);
        enviar('examen.php', newData, token).then((info) => {
            if (info === '') {
                mensajes("Error en inicio de sesion", info.msg, "error");
            } else {
                console.log(info);
                mensajes("Buen trabajo!", "REGISTRADO CON ÉXITO");
                router.push('/principal');
            }
        });
    };


    function obtenerExternalUsuario() {
        const external = sessionStorage.getItem('id');
        console.log("External obtenido:", external);
        return external;
    }

    return (
        <div className="container" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: '50px' }}>
            <h2 className="text-center">Editar Censo</h2>
            <div className="wrapper">
                <div className="d-flex flex-column">
                    <div className="content">
                        <div className='container-fluid'>
                            <form className="user" style={{ marginTop: '20px' }} onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Peso</label>
                                            <input {...register('weight')} name="weight" id="weight" className={`form-control ${errors.weight ? 'is-invalid' : ''}`} />
                                            <div className='alert alert-danger invalid-feedback'>{errors.weight?.message}</div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label">Talla</label>
                                            <input {...register('height')} name="height" id="height" className={`form-control ${errors.height ? 'is-invalid' : ''}`} />
                                            <div className='alert alert-danger invalid-feedback'>{errors.height?.message}</div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-outline mb-4">
                                            <label className="form-label">representante</label>
                                            <input {...register('representative')} name="representative" id="representative" className={`form-control ${errors.representative ? 'is-invalid' : ''}`} />
                                            <div className='alert alert-danger invalid-feedback'>{errors.representative?.message}</div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label">actividades</label>
                                            <input {...register('activities')} name="activities" id="activities" className={`form-control ${errors.activities ? 'is-invalid' : ''}`} />
                                            <div className='alert alert-danger invalid-feedback'>{errors.activities?.message}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row" >
                                    <label className="form-label">Escuelas</label>
                                    <select className='form-control' {...register('external_school', { required: true })} onChange={(e) => setValue('external_school', e.target.value)}>
                                        <option value="" >Elija una escuela</option>
                                        {Array.isArray(escuelas) && escuelas.map((mar, i) => (
                                            <option key={i} value={mar.external_id}>
                                                {mar.nombre}
                                            </option>
                                        ))}
                                    </select>
                                
                                </div>

                                <div className="row" style={{marginTop:'2em'}}>
                                    
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Curso</label>
                                            <select className='form-control' {...register('external_course', { required: true })} onChange={(e) => setValue('external_course', e.target.value)}>
                                                <option value="">Elija un curso</option>
                                                {Array.isArray(cursos) && cursos.map((mar, i) => (
                                                    <option key={i} value={mar.external_id}>
                                                        {mar.denominacion}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.marca && errors.marca.type === 'required' && <div className='alert alert-danger'>Seleccione una marca</div>}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                                            <a href="/principal" className="btn btn-danger btn-rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                                <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                            </a>
                                            <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}