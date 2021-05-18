/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 08/05/2021
 * @desafió: 3era Entrega
 * @resume: Events.js están todos los eventos necesarios para hacer funcionar los programas.
 * 
 * */
// Import de lo necesario.
import { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla, 
  markErrorRemove, obtenerAPI, crearInteresCompuesto, getInputsCredito, getInputsInteres,
  getInputsInteresReset, scrollToNodo } from "../app/logic.js";

// variable global de la simulación.
var simulacion; 

// Funciones principales.
// Define los listener.
function listenerButton() {
  $("#form-simular").submit(simularCredito);    // listener del Simular.
  $("#detalle").click(simularCreditoDesglose);  // listener del detalle.
  $("#reset").click(resetPage);                 // listener del Reset.
  $("#empezar").click(mostrarCalculador);       // listener del Wrap de Simular.
  $("#cotizaciones").click(ajaxEvent);             // Listener del wrap de cotizaciones
  $("#interes-comp").click(interesCompuesto)         // Listener del wrap de Interés Compuesto
  $("#form-interes").submit(ejecutarInteres);   // Listener de Crear Interes Compuesto
  $("#form-interes-reset").click(resetInteres); // Listener del Reset Interes Compuesto
}

function simularCredito(e) {
  e.preventDefault();
  let inputsCredito = getInputsCredito();
  markErrorRemove(inputsCredito);
  borrarDatosTabla("cal");
  simulacion = crearSimulacion();               // Asignando una nueva simulación la Una Simulación.
  if (simulacion != undefined) {
    visualizarSimulacion(simulacion);           // Visualizando la simulación simple.
    resetInput(inputsCredito);
  }
}

function simularCreditoDesglose(e) {
  e.preventDefault();
  let inputsCredito = getInputsCredito();
  // Verificando y removiendo los errores de los Inputs.
  markErrorRemove(inputsCredito);
  borrarDatosTabla("cal");

  if (simulacion != undefined) {
    mostrarDesglose(simulacion);                // Visualizando el desglose.
    resetInput(inputsCredito);
  } else {
    simulacion = crearSimulacion();
    if (simulacion != undefined) {
      mostrarDesglose(simulacion);              // Visualizando el desglose.
      resetInput(inputsCredito);
    }
  }
}

// Función encargada de limpiar la pantalla, borrando la tabla, los valores del los Input y la simulacion.
function resetPage(e) {
  e.preventDefault();
  let inputsCredito = getInputsCredito();
  borrarDatosTabla("cal");
  markErrorRemove(inputsCredito);
  resetInput(inputsCredito);
  simulacion = undefined;
}

// Función que muestra la calculadora de cuotas y oculta el botón de empezar
/**
 * Básicamente lo que se hace en ocultar el botón del evento si este esta activo y mostrando el del otro evento
 * Limpia la tabla si esta estuviese con contenido e inicia la variable de la simulacion.
 */
function mostrarCalculador(e) {
  e.preventDefault();
  borrarDatosTabla("cal");
  let inputsCredito = getInputsCredito();
  $(".cotizaciones").slideUp();
  $(".wrap-interes").slideUp();
  $(".calculador").slideDown();
  $(e.target).fadeOut("slow");
  $("#cotizaciones").fadeIn();
  $("#interes-comp").fadeIn();
  scrollToNodo($(".calculador"));
  resetInput(inputsCredito);
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
  $(".wrap-interes").slideUp();
  $(".cotizaciones").slideDown();
  $(e.target).fadeOut("slow");
  $("#empezar").fadeIn();
  $("#interes-comp").fadeIn();
  scrollToNodo($(".cotizaciones"));
  
  setTimeout(function (){
    obtenerAPI();
  },400);
}

/**
 * Funcion encargada de mostrar el wrap del la 
 * calculadores de interes compuesto
 */
function interesCompuesto(e) {
  e.preventDefault();
  let inputsInteresReset = getInputsInteresReset();
  $(".calculador").slideUp();
  $(".cotizaciones").slideUp();
  $(".wrap-interes").slideDown();
  $(e.target).fadeOut("slow");
  $("#empezar").fadeIn();
  $("#cotizaciones").fadeIn();
  scrollToNodo($(".wrap-interes"));
  resetInput(inputsInteresReset);
}

function ejecutarInteres(e) {
  e.preventDefault();
  let inputsInteres = getInputsInteres();
  markErrorRemove(inputsInteres);
  crearInteresCompuesto();
}

function resetInteres(e) {
  e.preventDefault();
  let inputsInteres = getInputsInteres();
  let inputsInteresReset = getInputsInteresReset();
  markErrorRemove(inputsInteres);
  resetInput(inputsInteresReset);
}

export {listenerButton, resetPage, simularCredito}
