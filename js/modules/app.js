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
  $("#form-simular").submit(function(e) { // listener del detalle
    e.preventDefault();
    simularCredito();
  });

  $("#detalle").click(function(e) { // listener del detalle
    e.preventDefault();
    simularCreditoDesglose(); 
  });

  $("#reset").click(function(e) { // listener del reset
    e.preventDefault();
    resetPage(); 
  });
}

function simularCredito() {
  borrarDatosTabla();
  simulacion = crearSimulacion(); // Asignando una nueva simulación la Una Simulación
  if (simulacion != undefined) {
    visualizarSimulacion(simulacion); // Visualizando la simulación simple.
    resetInput();
  }
}

function simularCreditoDesglose() {
  //e.preventDefault();
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

function resetPage() {
  //e.preventDefault();
  borrarDatosTabla();
  resetInput();
  simulacion = undefined;
}

export {listenerButton, resetPage, simularCredito}
