'use client';
import Link from "next/link";
import { borrarSesion } from "./hooks/SessionUtilClient";
import mensajes from "./Mensajes";
import { useRouter } from "next/navigation";
export default function Menu() {
    const router = useRouter();
    const salir = async () => {
        await borrarSesion();
        mensajes("GRACIAS!", "Hasta pronto");
        router.push('/inicio');
        router.refresh();
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme= "dark">
            <div className="container-fluid">
                <Link href= "/noticias/nuevo" className="navbar-brand">EXAMEN 1</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link href= "/principal" className="nav-link active" aria-current="page">PRINCIPAL</Link>
                        </li>
                        <li className="nav-item">
                        <Link href= "/registrar" className="nav-link active" aria-current="page">NUEVO REGISTRO</Link>
                        </li>
                        <li className="nav-item">
                        <Link href={"/inicio"} onClick={salir} className="nav-link active" aria-current="page">CERRAR SESION</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}