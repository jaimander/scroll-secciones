const touchArea = document.getElementById("touch-area");
const counter = document.getElementById("counter");
const imagen = document.getElementById("contenedor-img");

function updateCounter(event) {
  let cantidad =  event.touches.length;

  counter.textContent = cantidad;

  if(cantidad > 0){
    imagen.style.visibility = "visible";
  }
  else{
    imagen.style.visibility = "hidden";
  }

}

touchArea.addEventListener("touchstart", updateCounter, { passive: false });
touchArea.addEventListener("touchmove", updateCounter, { passive: false });
touchArea.addEventListener("touchend", updateCounter);
touchArea.addEventListener("touchcancel", updateCounter);


  /*
  if(cantidad == 0){
    touchArea.style.backgroundColor = "rgb(255, 174, 0)";
  }
  if(cantidad == 1){
    touchArea.style.backgroundColor = "rgb(0, 255, 145)";
  }
  if(cantidad == 2){
    touchArea.style.backgroundColor = "rgb(0, 38, 255)";
  }
   if(cantidad == 3){
    touchArea.style.backgroundColor = "rgb(242, 0, 255)";
  }
    */