
let URL = "https://computacion.unl.edu.ec/pdml/examen1/";

export function url_api(){
    return URL;
}

export async function obtener (recurso){
    const response = await fetch (URL + recurso);
    return await response.json();
}

export async function enviar (recurso, data, key =''){
    let headers = []
    if (key != '') {
        headers = {
            "Accept":"application/json",
            "TEST-KEY":key
        };    
    } else {
        headers = {
            "Accept":"application/json",
        };
    }  
    const response = await fetch (URL + recurso, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    return await response.json();
}

export const ObtenerTodo = async (recurso, key) => {
    const cabeceras={
        "TEST-KEY":key,
        "Accept": 'aplication/json',
    };
    const datos = await (await fetch(URL+ recurso, {
        cache: 'no-store',
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}