/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: 1era entrega Proyecto
 * @resume: El archivo principal solo se encarga de llamar lo mas esencial del programa.
 * La función se encarga de hacer los llamado necesarios para asignar, calcular y mostrar los datos.
 * Para este desafió se crearon los Listeners necesarios que controlan el calculo y el borrado de calculos
 * */

// Función principal

function listenerButton() {
  var formSimulacion = document.getElementById("form-simular"); // el formSimulacion tiene un ámbito global.
  formSimulacion.addEventListener("submit", simularCredito); // listener del summit
  formSimulacion.addEventListener("reset", resetPage);       // listener del Reset
}

function  simularCredito(e) {
  e.preventDefault();
  const simulacion = crearSimulacion(); // Creando Una Simulación
  visualizarSimulacion(simulacion); // Visualizando la simulación
  resetInput();
}

function resetPage(e) {
  e.preventDefault();
  borrarDatosTabla();
  resetInput();
}

resetInput(); // Limpia el formulario en un Refresh
listenerButton(); //activando el Listener del Formulario
