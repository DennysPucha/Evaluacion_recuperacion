import { enviar } from "./Conexion";
import { save, saveToken } from "./SessionUtil";

export async function inicio_sesion(data) {
    const sesion = await enviar('examen.php', data)
    console.log("sdsdsdf", sesion);
    if (sesion && sesion.code == 200 && sesion.info.code) {
        saveToken(sesion.info.code);
        save('id', sesion.info.external);
        save('user', sesion.email);
    }
    return sesion;
}