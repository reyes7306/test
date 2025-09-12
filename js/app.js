const root = document.documentElement
let memoria = [],
    tarjetas_destapadas = 0,
    tarjeta1,
    tarjeta2,
    nivel = 1,
    puntuacion = 0,
    movimientos = 0,
    tiempo = 45,
    temporizador = true
let niveles = [1,2,3,4], cartas = [6,8,9,12], altoCarta = ['248px','195px','248px','195px']

// Creamos un objeto para mostrar la imagen de la tarjeta
const tarjeta_destapada = (id) => {
    tarjeta = document.getElementById(id)
    tarjeta.getElementsByClassName('back')[0].
    children[0].src = `images/pokemon/${memoria[id-1]}.svg`
    tarjeta.classList.toggle('voltear')
    tarjeta.setAttribute('aria-expanded',true)
    return tarjeta
}

// Verificamos si todos los elementos del DOM han sido cargados
// correctamente
document.addEventListener('DOMContentLoaded', (e) => {
    document.getElementById('tiempo').textContent = tiempo
    tarjetas()
    pares()

    document.querySelectorAll('.card').forEach(
        e => e.addEventListener('click', () => {
            girar(e.id)
        })
    )
})

function tarjetas() {
    root.style.setProperty('--cantidadTarjetas',cartas[nivel-1])
    html = ''
    for(i=1;i<=cartas[(nivel-1)]*2;i++)
        html += `<div id="${i}" class="card" aria-expanded="false">
        <div class="front"></div>
        <div class="back">
            <img class="img-fluid" src="" />
        </div>
        </div>`
    document.getElementById('cards').innerHTML = html
}

// Creamos una funcion para establecer las tarjetas en pares
// que se mostraran en juego
function pares() {
    const imagenesAleatorias = Array.from(
        {length: 6},
        ()=> Math.floor(Math.random() * (200 - 1) + 1)
    )
    memoria = [...imagenesAleatorias, ...imagenesAleatorias]
    memoria.sort(()=> {return Math.random()-0.5})
}

// Creamos una funcion para girar la tarjeta
function girar(id) {
    if(temporizador) {
        tiempoRegresivo()
        temporizador = false
    }
    if(document.getElementById(id).attributes['aria-expanded'].value == 'false') {
        tarjetas_destapadas++
        if(tarjetas_destapadas == 1) {
            primerResultado = memoria[id-1]
            tarjeta1 = tarjeta_destapada(id)
        } else if(tarjetas_destapadas == 2) {
            segundoResultado = memoria[id-1]
            tarjeta2 = tarjeta_destapada(id)
            movimientos++
            document.getElementById('movimientos').textContent = movimientos
            if(primerResultado == segundoResultado) {
                puntuacion++
                document.getElementById('puntuacion').textContent = puntuacion
            } else {
                setTimeout(()=> {
                    tarjeta1.classList.toggle('voltear')
                    tarjeta2.classList.toggle('voltear')
                    tarjeta1.setAttribute('aria-expanded',false)
                    tarjeta2.setAttribute('aria-expanded',false)
                }, 600)
            }
            tarjetas_destapadas = 0
        }
    }
}

function tiempoRegresivo() {
    const conteo = setInterval(()=> {
        tiempo--
        document.getElementById('tiempo').textContent = tiempo
        if(tiempo == 0)
            clearInterval(conteo)
    }, 1000)
}