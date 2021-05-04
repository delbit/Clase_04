/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 29/04/2021
 * @desafió: moviendo a jQuery
 * @resume: El archivo principal solo se encarga de llamar lo mas esencial del programa.
 * La función se encarga de hacer los llamado necesarios para asignar, calcular y mostrar los datos.
 * Para este desafió modifico el código para usar jQuery en la manipulación del DOM.
 * Se modifica el nombre del archivo para entender mas su funcionalidad.
 * */
// Import de lo necesario.
import { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla, ajaxTest } from "./logic.js";

// variable global de la simulación.
var simulacion; 

// Funciones principales.
// Define los listener.
function listenerButton() {
  $("#form-simular").submit(simularCredito);    // listener del Simular.
  $("#detalle").click(simularCreditoDesglose);  // listener del detalle.
  $("#reset").click(resetPage);                 // listener del Reset.
  $("#empezar").click(mostrarCalculador);       // listener empezar.
  $("#ajax-test").click(ajaxEvent);
}

function simularCredito(e) {
  e.preventDefault();
  borrarDatosTabla();
  simulacion = crearSimulacion(); // Asignando una nueva simulación la Una Simulación.
  if (simulacion != undefined) {
    visualizarSimulacion(simulacion); // Visualizando la simulación simple.
    resetInput();
  }
}

function simularCreditoDesglose(e) {
  e.preventDefault();
  borrarDatosTabla();

  if (simulacion != undefined) {
    mostrarDesglose(simulacion); // Visualizando el desglose.
    resetInput();
  } else {
    simulacion = crearSimulacion();
    if (simulacion != undefined) {
      mostrarDesglose(simulacion); // Visualizando el desglose.
      resetInput();
    }
  }
}

// Función encargada de limpiar la pantalla, borrando la tabla, los valores del los Input y la simulacion.
function resetPage(e) {
  e.preventDefault();
  borrarDatosTabla();
  resetInput();
  simulacion = undefined;
}

// Función que muestra la calculadora de cuotas y oculta el botón de empezar
function mostrarCalculador(e) {
  e.preventDefault();
  $(".ajax-test").slideUp();
  $(".calculador").slideDown();
  $(e.target).fadeOut("slow");
  $("#ajax-test").fadeIn();
  resetInput();
  borrarDatosTabla();
  simulacion = undefined;
}

function ajaxEvent(e){
  e.preventDefault();
  $(".calculador").slideUp();
  $(".ajax-test").slideDown();
  $(e.target).fadeOut("slow");
  $("#empezar").fadeIn();
  ajaxTest();
}

export {listenerButton, resetPage, simularCredito}
