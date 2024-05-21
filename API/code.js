
let btnP = document.querySelector('#btnAnte')
let btnN = document.querySelector('#btnSigue')
btnP.setAttribute('data-url-personajes', '')
btnN.setAttribute('data-url-personajes', 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')


btnN.addEventListener('click', function (e) {
    let url = e.target.getAttribute('data-url-personajes')
    if (url != 'null') {
        listar_personajes(e.target.dataset.urlPersonajes)
    }
})

btnP.addEventListener('click', function (e) {
    if (e.target.dataset.urlPersonajes != 'null') {
        listar_personajes(e.target.dataset.urlPersonajes)
    }
})





listar_personajes()

function listar_personajes(url_pokeapi = 'https://pokeapi.co/api/v2/pokemon') {

    let grillaPokemones = document.querySelector("#grilla-Pokes")
    grillaPokemones.innerHTML = ""

    let dataAPI_pokeapi = fetch(url_pokeapi)
    dataAPI_pokeapi.then(respuestaPromesa => respuestaPromesa.json())
        .then(infojson => {

            infojson.results.forEach(person => {

                let dataapi2 = fetch(person.url)
                dataapi2.then(respuestaurl => respuestaurl.json())
                    .then(infojson2 => {

                        let infoHabilidades = ""
                        infojson2.abilities.forEach(dato => {
                            infoHabilidades += dato.ability.name + "<br>"


                        });

                        let liTipos = ''
                        infojson2.types.forEach(dataTipo => {
                            liTipos += dataTipo.type.name + "<br>"


                        });



                        grillaPokemones.innerHTML += `
                    <div class="col">
                        <div class="card">
                            <img src="${infojson2.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="...">
                            <div class="card-body d-flex justify-content-center align-items-center flex-column">
                                <h5 class="card-title">${person.name}</h5>
                                <p class="fw-bold" >Abilities</p
                                <p class="card-title" >${infoHabilidades}</p>
                                <p class="fw-bold" >Types</p
                                <p class="card-title" >${liTipos}</p>
                                <ul>
                                    <li class="d-flex justify-content-around align-items-center"> 
                                        <div </div> 
                                    </li>
                                </ul> 
                            </div>
                        </div>
                    </div>
                    `




                    });


                btnP.setAttribute('data-url-personajes', infojson.previous)
                btnN.setAttribute('data-url-personajes', infojson.next)
            });




        }).catch(error => {
            console.log(error)
        })





}

Function