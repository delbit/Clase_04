/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: 1era entrega Proyecto
 * @resume: El archivo principal solo se encarga de llamar lo mas esencial del programa.
 * La función se encarga de hacer los llamado necesarios para asignar, calcular y mostrar los datos.
 * Para este desafió se crearon los Listeners necesarios que controlan el calculo y el borrado de calculos.
 * En este desafió se llama a otra función que hace uso de un array.
 * */
// Import de lo necesario
import { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla} from "./logic.js";
// Funciones principales
// Define los listener
function listenerButton() {
  var formSimulacion = document.getElementById("form-simular"); // el formSimulacion tiene un ámbito global.
  formSimulacion.addEventListener("submit", simularCredito); // listener del summit
  formSimulacion.addEventListener("reset", resetPage);       // listener del Reset
}

function  simularCredito(e) {
  e.preventDefault();
  const simulacion = crearSimulacion(); // Asignando una nueva simulacion la Una Simulación
  //visualizarSimulacion(simulacion); // Visualizando la simulación // Para cuando solo se realiza una Vizualizacion.
  mostrarDesglose(simulacion); // Visualizando el desglose
  resetInput();
}

function mostrarDetalle(e){
  e.preventDefault();
  const simulacion = crearSimulacion(); // Creando Una Simulación
}

function resetPage(e) {
  e.preventDefault();
  borrarDatosTabla();
  resetInput();
}

export {listenerButton, simularCredito, mostrarDetalle, resetPage}
