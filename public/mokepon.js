const SectionSeleccionarAtaque = document.getElementById('Seleccionar-ataque')
const SectionReiniciar = document.getElementById('Reiniciar')
const botonMascotaJugador = document.getElementById('Boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const SectionSeleccionarMascota = document.getElementById('Seleccionar-mascota')
const SpanMascotaJugador = document.getElementById('mascota-jugador')

const SpanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasjugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-Del-Jugador')
const ataquesDelEnemigo = document.getElementById('ataques-Del-Enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('verMapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones=[]
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones 
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador 
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = [] //Esto es un arreglo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20

    
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{ // Clases y lo que esta abajo son atributos
    constructor(nombre, foto, vida, fotoMapa, id=null){
        this.id= id
        this.nombre = nombre
        this.foto= foto
        this.vida= vida
        this.ataques= []
        this.ancho= 40
        this.alto= 40
        this.x= aleatorio(0, mapa.width - this.ancho)
        this.y= aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let hipodoge = new Mokepon('hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.webp') 

let capipepo = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.webp')

let ratigueya = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.webp')

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'Boton-agua' },
    {nombre: '💧', id: 'Boton-agua' },
    {nombre: '💧', id: 'Boton-agua' },
    {nombre: '🔥', id: 'Boton-fuego' },
    {nombre: '🪴', id: 'Boton-tierra' },
]

const CAPIPEPO_ATAQUES = [
    {nombre: '🪴', id: 'Boton-tierra' },
    {nombre: '🪴', id: 'Boton-tierra' },
    {nombre: '🪴', id: 'Boton-tierra' },
    {nombre: '💧', id: 'Boton-agua' },
    {nombre: '🔥', id: 'Boton-fuego' },
]

const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'Boton-fuego' },
    {nombre: '🔥', id: 'Boton-fuego' },
    {nombre: '🔥', id: 'Boton-fuego' },
    {nombre: '💧', id: 'Boton-agua' },
    {nombre: '🪴', id: 'Boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

//hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

//capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

//ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego () { //Esta es la primera que se carga
   
    SectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display=
    SectionReiniciar.style.display = 'none'

    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name ="mascota" id=${mokepon.nombre} />
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} 
                    alt=${mokepon.nombre}>
                </label>
        `
        contenedorTarjetas.innerHTML+= opcionDeMokepones

        inputHipodoge = document.getElementById('hipodoge')
        inputCapipepo = document.getElementById('capipepo')
        inputRatigueya = document.getElementById('ratigueya')
    })
    
    botonMascotaJugador.addEventListener('click', SeleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.0.12:8080/unirse")
        .then(function (res){
            if (res.ok) {
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta

                    })
            }

        })
}

function SeleccionarMascotaJugador () {
    
    sectionVerMapa.style.display= 'flex'

    if(inputHipodoge.checked){
        SpanMascotaJugador.innerHTML= inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if(inputCapipepo.checked){
        SpanMascotaJugador.innerHTML= inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if(inputRatigueya.checked){
        SpanMascotaJugador.innerHTML= inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("Debes seleccionar una opcion ")
        return
    }

    SectionSeleccionarMascota.style.display = 'none'  

    SeleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    iniciarMapa()

}

function SeleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.0.12:8080/mokepon/public/${jugadorId}`,{
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {  
         ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque)=>{
     ataquesMokepon = `
     <button id=${ataque.id} class="boton-de-ataques BAtaque">${ataque.nombre}</button>
     ` 
     contenedorAtaques.innerHTML += ataquesMokepon 

    })

    botonFuego = document.getElementById('Boton-fuego')
    botonAgua = document.getElementById('Boton-agua')
    botonTierra = document.getElementById('Boton-tierra')
    botones = document.querySelectorAll('.BAtaque')




}

function secuenciaDeAtaque (){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('Agua')
                console.log(ataqueJugador)
                boton.style.background = '#112f58' 
                boton.disabled = true
            }else{
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
                boton.style.background = '#112f58' 
                boton.disabled = true
            }
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }

        })

    })
    
}

function enviarAtaques() {
    fetch(`http://192.168.0.12:8080/mokepon/public/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.0.12:8080/mokepon/public/${enemigoId}/ataques`)
    .then(function(res){
        if (res.ok) {
            res.json()
                .then(function({ataques}){
                    if (ataques.length === 5) {
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
        }
    })
}

function SeleccionarMascotaEnemigo (enemigo) { //Arreglar aqui
    //let mascotaAleatoria = aleatorio(0, mokepones.length -1)
    //console.log(mascotaAleatoria)
   
    /*if(mascotaAleatoria == 1){
        SpanMascotaEnemigo.innerHTML = 'hipodoge'
    } else if(mascotaAleatoria == 2){
        SpanMascotaEnemigo.innerHTML = 'capipepo'
    } else {
        SpanMascotaEnemigo.innerHTML = 'ratigueya'
    }*/
    SpanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaDeAtaque ()
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1 ){
        ataqueEnemigo.push('Fuego')
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('Agua')
    } else {
        ataqueEnemigo.push('Tierra')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){

    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")            
        } else if(ataqueJugador[index] ==='Fuego' &&        ataqueEnemigo[index] ==='Tierra'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidasjugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='Agua' &&        ataqueEnemigo[index] ==='Fuego'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidasjugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='Tierra' &&        ataqueEnemigo[index] ==='Agua'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidasjugador.innerHTML = victoriasJugador
        } else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }

    } 

    
    // Revisar vidas 
    revisarVidas()
}

function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate loca!!!")
    }else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Ganaste crack")
    } else{
        crearMensajeFinal("Perdiste loca")

    }
}

function crearMensaje(resultado){
   
    let nuevoAtaquedelJugador = document.createElement('p')
    let nuevoAtaquedelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaquedelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaquedelEnemigo.innerHTML = indexAtaqueEnemigo
/*
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota ataco con ' + ataqueJugador + ' , la mascota del enemigo ataco con ' + ataqueEnemigo + '-' + resultado
*/
    ataquesDelJugador.appendChild(nuevoAtaquedelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaquedelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal
    SectionReiniciar.style.display = 'block'
}


/*
let jugador = 
//let jugadaEnemigo = 0
let triunfos = 0
let perdidas = 0

while (triunfos <3 && perdidas <3){
    
    jugador = prompt("Elije: 1 para piedra, 2 para papel, 3 para tijera ")
    alert ("PC elige " + eleccion(pc))
    alert ("tu eliges " + eleccion(jugador))

     

    //COMBATE
    
alert ("Ganaste " + triunfos + " veces " + " perdiste " + perdidas + " veces ")
}
*/

function reiniciarJuego(){
    location.reload()
}

function aleatorio (min, max){
    return ( Math.floor(Math.random()*(max - min + 1) + min))
}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

   mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
   })
    
}

function enviarPosicion(x,y){
    fetch(`http://192.168.0.12:8080/mokepon/public/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
     .then(function(res){
            if(res.ok) {
                res.json()
                    .then(function ({ enemigos }) {

                        mokeponesEnemigos = enemigos.map(function (enemigo) {
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "hipodoge") {
                                mokeponEnemigo = new Mokepon('hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.webp', enemigo.id) 
                            } else if (mokeponNombre === "capipepo") {
                                mokeponEnemigo = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.webp', enemigo.id)
                            } else if (mokeponNombre === "ratigueya"){
                                mokeponEnemigo = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.webp', enemigo.id)
                            }  

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })
                    })

             }
            
      })
    
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5

}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5

}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5

}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0

}

function sePresionoUnaTecla(event) {
    console.log(event.key)
    switch (event.key) {
        case 'ArrowUp': 
            moverArriba()            
            break
        case 'ArrowDown': 
            moverAbajo()            
        break
        case 'ArrowLeft': 
            moverIzquierda()            
        break
        case 'ArrowRight': 
            moverDerecha()            
        break

        default:
            break;
    }
}


function iniciarMapa(){
   // mapa.width= 320
   // mapa.height= 240
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50) // Esta funcion llama la variable constantemente esperando un poco de tiempo

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)

}

function obtenerObjetoMascota (){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {  
            return mokepones[i]
        }
    }

}

function revisarColision(enemigo){
     
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x


    const arribaMascota  = 
        mascotaJugadorObjeto.y
    const abajoMascota  = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota  = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota  = 
        mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo  
    ) {
        return
    }
    
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id 
    SectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    SeleccionarMascotaEnemigo(enemigo)

    //alert("Hay colisión con " + enemigo.nombre)
}

window.addEventListener('load', iniciarJuego) //Esta se debe poner para que primero corra todo el JS