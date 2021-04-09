/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: 1era entrega Proyecto
 * @resume: El archivo principal solo se encarga de llamar lo mas esencial del programa.
 * Toda la lógica y la clase se separaron del programa principal.
 * */

//Variable principal
const simulaciones =[];

// Función principal
function  simularCredito() {
  // Creando el array de simulaciones
  simulaciones.splice(0, Infinity, ...nuevasSimulaciones());
}

function ordenarCredito() {
  if (simulaciones.length < 1) {
    console.log("No existen datos para ordenar");
  } else if (simulaciones.length > 1) {
    // se reemplazan los items del array por el array ordenado devuelto por ordenamiento.
    simulaciones.splice(0, simulaciones.length, ...ordenamiento(simulaciones));
  } else {
    console.log("Solo existe una simulación de crédito, no se puede ordenar");
  }
}

function visualizarCredito() {
  mostrar(simulaciones);
}
