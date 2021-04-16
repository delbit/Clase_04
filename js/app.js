/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: 1era entrega Proyecto
 * @resume: El archivo principal solo se encarga de llamar lo mas esencial del programa.
 * La funcion se encarga de hacer los llamado necesarios para asignar, calcular y mostrar los datos.
 * */

// Función principal
function  simularCredito() {
  asignandoValoresInput(1000, 20, 24); // Le asignamos valores al los Input
  const simulacion = crearSimulacion(); // Creando Una Simulación
  visualizarSimulacion(simulacion); // Visualizando la simulación
}

simularCredito();
