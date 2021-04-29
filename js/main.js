/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 29/04/2021
 * @desafió: jQuery
 * @resume: La lógica del programa de Simulación.
 * Se realizo la modularizacion del código, haciendo que solo se cargue un archivo desde el html
 * Se usa jQuery para hacer uso del ready
 * */

// Funciones importadas
import { resetInput } from "./modules/logic.js";
import { listenerButton } from "./modules/events.js";

// Funciones que Inician todo el programa, cuando el DOM esta listo;
$( document ).ready(function() {
  resetInput(); // Limpia el formulario en un Refresh
  listenerButton(); //activando el Listener del Formulario
});
