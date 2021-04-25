/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 2/04/2021
 * @desafió: 2da entrega Proyecto
 * @resume: El archivo principal solo se encarga de llamar lo mas esencial del programa.
 * La función se encarga de hacer los llamado necesarios para asignar, calcular y mostrar los datos.
 * Para este desafió se crearon los Listeners necesarios que controlan el calculo, detalle y el borrado de datos en pantalla.
 * Se agregan validaciones necesarias para tener la consistencia de mostrar simulación y desglose.
 * */
// Import de lo necesario
import { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla} from "./logic.js";

// variable global de la simulación
var simulacion; 

// Funciones principales
// Define los listener
function listenerButton() {
  var formSimulacion = document.getElementById("form-simular"); // el formSimulacion tiene un ámbito global.
  formSimulacion.addEventListener("submit", simularCredito); // listener del summit
  formSimulacion.addEventListener("reset", resetPage);       // listener del Reset
  document.getElementById("detalle").addEventListener("click", simularCreditoDesglose); // listener del detalle
}

function simularCredito(e) {
  e.preventDefault();
  borrarDatosTabla();
  simulacion = crearSimulacion(); // Asignando una nueva simulación la Una Simulación
  if (simulacion != undefined) {
    visualizarSimulacion(simulacion); // Visualizando la simulación simple.
    resetInput();
  }
}

function simularCreditoDesglose(e) {
  e.preventDefault();
  borrarDatosTabla();
  if (simulacion != undefined) {
    mostrarDesglose(simulacion); // Visualizando el desglose
    resetInput();
  }else {
    simulacion = crearSimulacion();
    if (simulacion != undefined) {
      mostrarDesglose(simulacion); // Visualizando el desglose
      resetInput();
    }
  }
}

function mostrarDetalle(e){
  e.preventDefault();
  const simulacion = crearSimulacion(); // Creando Una Simulación
}

function resetPage(e) {
  e.preventDefault();
  borrarDatosTabla();
  resetInput();
  simulacion = undefined;
}

export {listenerButton, simularCredito, mostrarDetalle, resetPage}
