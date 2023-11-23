'use client';
import React, { useState, useEffect } from 'react';
import { getToken } from '../componentes/hooks/SessionUtilClient';
import { ObtenerTodo } from '../componentes/hooks/Conexion';
import Link from 'next/link';

export default function Principal() {
    const [censos, setCensos] = useState([]);

    useEffect(() => {
        const ObtenerResgistros = async () => {
            try {
                const token = getToken();
                const externalUsuario = obtenerExternalUsuario();

                if (!externalUsuario) {
                    console.error("No se pudo obtener el external del usuario desde el sessionStorage");
                    return;
                }

                const url = `examen.php/?resource=census_children_login&external=${externalUsuario}`;
                const response = await ObtenerTodo(url, token);
                const resultado = response.info;

                setCensos(resultado);
                console.log(resultado);
                
            } catch (error) {
                console.error('Error:', error);
            }
        };

        ObtenerResgistros();
    }, []);
    
    function obtenerExternalUsuario() {
        const external = sessionStorage.getItem('id');
        console.log("External obtenido:", external);
        return external;
    }

    return (
        <div className="row">
            <figure className="text-center">
                <h1>LISTA DE CENSOS</h1>
            </figure>
            <div className="container-fluid">
                <div className="col-4">
                    <Link href="/registrar" className="btn btn-success">NUEVO</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Nombres</th>
                            <th>Edad</th>
                            <th>Talla</th>
                            <th>Curso</th>
                            <th>Peso</th>
                            <th>Representante</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {censos.map((censo, index) => {
                            console.log(censo); // Agregar esta línea para imprimir el objeto censo
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{censo.nombres}</td>
                                    <td>{censo.edad}</td>
                                    <td>{censo.talla}</td>
                                    <td>{censo.curso}</td>
                                    <td>{censo.peso}</td>
                                    <td>{censo.representante}</td>
                                    <td>
                                        {censo.external_id && (
                                            <Link href={`editar/${censo.extrenal_censo}`} passHref>
                                                <button className="btn btn-success">
                                                    Editar
                                                </button>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};