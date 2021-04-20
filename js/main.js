/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: 1era entrega Proyecto
 * @resume: La lógica del programa de Simulación.
 * Se realizo la modularizacion del codigo, haciendo que solo se cargue un archivo desde el html
 * */

// Funciones importadas
import {resetInput} from "./modules/logic.js";
import {listenerButton} from "./modules/app.js";

// Funciones que Inician todo el programa;
resetInput(); // Limpia el formulario en un Refresh
listenerButton(); //activando el Listener del Formulario