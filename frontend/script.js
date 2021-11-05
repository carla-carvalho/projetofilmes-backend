const { application, json } = require("express");

const infos = document.getElementById('infos');
const apiUrl = 'http://localhost:3000';

const getFilmes = async () => {
    const response = await fetch(apiUrl)
    const filmes = await response.json();

    console.log(filmes);

    filmes.map((filme) => {
        infos.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${filme.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.titulo}</h5>
                <span class="badge bg-primary">${filme.genero}</span>
                <span class="badge bg-primary">${filme.nota}</span>
                <div>
                    <button class="btn btn-primary" onclick="editVaga('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteVaga('${filme.id}')">Excluir</button>
                </div>
            </div>
            </div>
        </div>
        `)
    })
}

const submitForm = async (event) => {
console.log('ela está executando');
event.preventDefault();

let titulo = document.getElementById('titulo');
let imagem = document.getElementById('imagem');
let genero = document.getElementById('genero');
let nota = document.getElementById('nota');

const filme = {
    titulo: titulo.value,
    imagem: imagem.value,
    genero: genero.value,
    nota: nota.value
}

const request = new Request(`${apiUrl}/add`, {
    method: 'POST',
    body: JSON.stringify(filme),
    headers: new Headers ({
        'Content-Type': 'application/json'
    })
})

const response = await fetch(request);
const result = await response.json();

alert(result.message)

getFilmes();

}


getFilmes();