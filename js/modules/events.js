/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 08/05/2021
 * @desafió: 3era Entrega
 * @resume: Events.js están todos los eventos necesarios para hacer funcionar los programas.
 * 
 * */
// Import de lo necesario.
import { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla, markErrorRemove, obtenerAPI } from "./logic.js";

// variable global de la simulación.
var simulacion; 

// Funciones principales.
// Define los listener.
function listenerButton() {
  $("#form-simular").submit(simularCredito);    // listener del Simular.
  $("#detalle").click(simularCreditoDesglose);  // listener del detalle.
  $("#reset").click(resetPage);                 // listener del Reset.
  $("#empezar").click(mostrarCalculador);       // listener empezar.
  $("#ajax-test").click(ajaxEvent);             // Listener del ajax cotizaciones
}

function simularCredito(e) {
  e.preventDefault();
  markErrorRemove();
  borrarDatosTabla("cal");
  simulacion = crearSimulacion();               // Asignando una nueva simulación la Una Simulación.
  if (simulacion != undefined) {
    visualizarSimulacion(simulacion);           // Visualizando la simulación simple.
    resetInput();
  }
}

function simularCreditoDesglose(e) {
  e.preventDefault();
  // Verificando y removiendo los errores de los Inputs.
  markErrorRemove();
  borrarDatosTabla("cal");

  if (simulacion != undefined) {
    mostrarDesglose(simulacion);                // Visualizando el desglose.
    resetInput();
  } else {
    simulacion = crearSimulacion();
    if (simulacion != undefined) {
      mostrarDesglose(simulacion);              // Visualizando el desglose.
      resetInput();
    }
  }
}

// Función encargada de limpiar la pantalla, borrando la tabla, los valores del los Input y la simulacion.
function resetPage(e) {
  e.preventDefault();
  borrarDatosTabla("cal");
  resetInput();
  simulacion = undefined;
}

// Función que muestra la calculadora de cuotas y oculta el botón de empezar
/**
 * Básicamente lo que se hace en ocultar el botón del evento si este esta activo y mostrando el del otro evento
 * Limpia la tabla si esta estuviese con contenido e inicia la variable de la simulacion.
 */
function mostrarCalculador(e) {
  e.preventDefault();
  $(".ajax-test").slideUp();
  $(".calculador").slideDown();
  $(e.target).fadeOut("slow");
  $("#ajax-test").fadeIn();
  resetInput();
  borrarDatosTabla("cal");
  simulacion = undefined;
}

// Función de ajax para cotizaciones de Dolares
/**
 * Básicamente lo que se hace en ocultar el botón del evento si este esta activo y mostrando el del otro evento
 * Limpia la tabla de las cotizaciones si esta estuviese con datos, y se retrasa la muestra de las cotizaciones para
 * evitar la sobre posición de datos.
 */
function ajaxEvent(e){
  e.preventDefault();
  borrarDatosTabla("dolar");
  $(".calculador").slideUp();
  $(".ajax-test").slideDown();
  $(e.target).fadeOut("slow");
  $("#empezar").fadeIn();
  setTimeout(function (){
    obtenerAPI();
  },400);
}

export {listenerButton, resetPage, simularCredito}
