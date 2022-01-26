/**
 * lazy loading example
 */

const publicaciones = document.querySelector(".publicaciones");

let contador = 0;

const crearPublicacionCode = (name, content) => {
    const container = document.createElement('DIV');
    const comentarios = document.createElement('DIV');
    const h3 = document.createElement('H3');
    const contenido = document.createElement('P');
    const btnComentario = document.createElement('INPUT');
    const btnEnviar = document.createElement('INPUT');

    container.classList.add('publicacion');
    comentarios.classList.add('comentarios');
    btnEnviar.classList.add('enviar');
    btnComentario.classList.add('comentario');

    btnComentario.setAttribute("placeholder", "Introdizca un comentario")
    h3.textContent = name;
    contenido.textContent = content;

    btnEnviar.type = 'submit';

    comentarios.appendChild(btnComentario);
    comentarios.appendChild(btnEnviar);

    container.appendChild(h3);
    container.appendChild(contenido);
    container.appendChild(comentarios);

    return container;
}


let conten = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero ratione ad sapiente esse sequi aliquam eum quod voluptatum excepturi eos natus nihil accusamus, distinctio ex ipsum possimus iste. Ipsa, tenetur.`;

const cargarMasPublic = entry =>{
    if (entry[0].isIntersecting)  cargarPublicacines(4);
}

const observer = new IntersectionObserver(cargarMasPublic);

const cargarPublicacines = async num => {
    const request = await fetch('informacion.txt');
    const cont = await request.json();
    const arr = cont.content;
    const documentFragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        if (arr[contador] != undefined) {
            const newPublication = crearPublicacionCode(arr[contador].nombre,arr[contador].contenido);
            documentFragment.appendChild(newPublication);
            contador++;

            if (i == num-1) observer.observe(newPublication);
        }else{
            if (publicaciones.lastElementChild.id !== "nomore") {
                let notMore = document.createElement('H3');
                notMore.textContent = "No hay mas publicaciones";
                notMore.id = "nomore";
                documentFragment.appendChild(notMore);
                publicaciones.appendChild(documentFragment);
                break;
            }
        }
    }
    publicaciones.appendChild(documentFragment);
}

cargarPublicacines(4);