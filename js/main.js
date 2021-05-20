/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 20/05/2021
 * @desafió: Proyecto Final
 * @resume: Funciones necesarias para iniciar la pagina y sus módulos.
 * Se movieron los distintos módulos de codigo a carpetas separadas y ordenadas.
 * Los módulos de programas se insertan antes de iniciar los listener necesarios
 * Se realizo la modularizacion del código, haciendo que solo se cargue un archivo desde el html.
 * Se usa jQuery para hacer uso del ready.
 * */

// Funciones importadas
import { builderPage } from "./modules/pages/builderPage.js";
import { animateHero } from "./modules/app/logic.js";
import { listenerButton } from "./modules/events/events.js";

//Insertando al DOM los HTML de los distintos modulos del programa
builderPage();

/**
 * Inician todo el programa, cuando el DOM esta listo,
 * Animando el Hero y activando los listener necesarios
 */
$(document).ready(function() {
  animateHero();
  listenerButton();
});
