
const transportadora = document.querySelector("#transportadora");

let posicion = 0;

// Generar color aleatorio
function colorAleatorio() {
  return `hsl(${Math.random() * 360}, 80%, 55%)`;
}

// Crear un nuevo elemento
function crearElemento() {
  const div = document.createElement("div");

  div.classList.add("elemento");
  div.style.backgroundColor = colorAleatorio();

  transportadora.appendChild(div);
}

// Crear elementos iniciales
crearElemento();
crearElemento();

// Movimiento de la transportadora
function moverTransportadora() {
  posicion++;

  transportadora.style.transform =
    `translateY(-${posicion * 100}vh)`;

  crearElemento();
}

// Velocidad de desplazamiento
setInterval(moverTransportadora, 2000);
