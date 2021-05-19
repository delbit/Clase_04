/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 08/05/2021
 * @desafió: 3era Entrega
 * @resume: Events.js están todos los eventos necesarios para hacer funcionar los programas.
 * 
 * */
// Import de la funciones necesaria.
import { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla, 
  markErrorRemove, obtenerAPI, crearInteresCompuesto, getInputsCredito, getInputsInteres,
  getInputsInteresReset, scrollToNodo } from "../app/logic.js";

// variable global de la simulación.
var simulacion; 

// Define los listener.
function listenerButton() {
  $("#form-simular").submit(simularCredito);    // listener del Simular.
  $("#detalle").click(simularCreditoDesglose);  // listener del detalle.
  $("#reset").click(resetPage);                 // listener del Reset.
  $("#empezar").click(mostrarCalculador);       // listener del Wrap de Simular.
  $("#cotizaciones").click(ajaxEvent);          // Listener del wrap de cotizaciones
  $("#interes-comp").click(interesCompuesto)    // Listener del wrap de Interés Compuesto
  $("#form-interes").submit(ejecutarInteres);   // Listener de Crear Interes Compuesto
  $("#form-interes-reset").click(resetInteres); // Listener del Reset Interes Compuesto
}

/** 
 * Se encarga de crear una simulación y mostrar la version simple,
 * Siempre crea una simulación al usarse
 * @param {Object} e evento de jQuery
 */
function simularCredito(e) {
  e.preventDefault();
  let inputsCredito = getInputsCredito();
  markErrorRemove(inputsCredito);
  borrarDatosTabla("cal");
  simulacion = crearSimulacion();
  if (simulacion != undefined) {
    visualizarSimulacion(simulacion);
    resetInput(inputsCredito);
  }
}

/** 
 * Vizualizar una simulacion cuota a cuotas en detalle si esta existe
 * de lo contrario se crea una nueva.
 * @param {Object} e evento de jQuery
 */
function simularCreditoDesglose(e) {
  e.preventDefault();
  let inputsCredito = getInputsCredito();
  // Verificando y removiendo los errores de los Inputs y datos de tabla.
  markErrorRemove(inputsCredito);
  borrarDatosTabla("cal");

  if (simulacion != undefined) {
    mostrarDesglose(simulacion);
    resetInput(inputsCredito);
  } else {
    simulacion = crearSimulacion();
    if (simulacion != undefined) {
      mostrarDesglose(simulacion);
      resetInput(inputsCredito);
    }
  }
}

/** 
 * Limpia los datos del Input, tablas del nodo simulacion
 * @param {Object} e evento de jQuery
 */
function resetPage(e) {
  e.preventDefault();
  let inputsCredito = getInputsCredito();
  borrarDatosTabla("cal");
  markErrorRemove(inputsCredito);
  resetInput(inputsCredito);
  simulacion = undefined;
}


/**
 * Trigger que muestra la calculadora de simulacion de crédito y 
 * oculta su trigger y muestra los demás de estar ocultos
 * limpiar los datos si existes y centra la pantalla.
 * @param {Object} e evento de jQuery
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

/**
 * Trigger que muestra las cotizaciones. 
 * oculta su trigger y muestra los demás de estar ocultos
 * limpiar los datos si existes y centra la pantalla.
 * @param {Object} e evento de jQuery
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
 * Trigger que muestra la calculadora de interes compuesto. 
 * oculta su trigger y muestra los demás de estar ocultos
 * limpiar los datos si existes y centra la pantalla.
 * @param {Object} e evento de jQuery
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

/**
 * Trigger para la ejecución del interes compuesto. 
 * @param {Object} e evento de jQuery
 */
function ejecutarInteres(e) {
  e.preventDefault();
  let inputsInteres = getInputsInteres();
  markErrorRemove(inputsInteres);
  crearInteresCompuesto();
}

/**
 * Trigger para reset de los inputs del interes compuesto. 
 * @param {Object} e evento de jQuery
 */
function resetInteres(e) {
  e.preventDefault();
  let inputsInteres = getInputsInteres();
  let inputsInteresReset = getInputsInteresReset();
  markErrorRemove(inputsInteres);
  resetInput(inputsInteresReset);
}

export {listenerButton, resetPage, simularCredito}
