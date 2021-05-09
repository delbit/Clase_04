/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 08/05/2021
 * @desafió: 3era entrega proyecto
 * @resume: La lógica del programa de Simulación.
 * Se realizo la modularizacion del código, haciendo que solo se cargue un archivo desde el html.
 * Se usa jQuery para hacer uso del ready.
 * */

// Funciones importadas
import { animateHero } from "./modules/logic.js";
import { listenerButton } from "./modules/events.js";

// Funciones que Inician todo el programa, cuando el DOM esta listo;
$(document).ready(function() {
  animateHero();      // Muestra el texto del Hero para empezar a usar la calculadora.
  listenerButton();   // Activando el Listener del Formulario.
});
