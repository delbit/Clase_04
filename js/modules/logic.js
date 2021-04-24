/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 22/04/2021
 * @desafió: 2da entrega Proyecto
 * @resume: La lógica del programa de Simulación.
 * Se eliminaron las funciones innecesarias
 * Se crearon las funciones necesarias para asignarle valores a los Input
 * Se creo una función que toma los valores del Input y realiza los cálculos
 * Se crea un función que visualizan los cálculos en el HTMl, se definen 2 métodos diferentes el de detalle y el de cuota.
 * */

// Import de la class
import {Cuotas} from "./cuotas_class.js";
import { Desglose } from "./desglose_class.js";

//***Funciones de Validaciones de entrada datos***

//valida el capital
function ingresoCapital() {
  do {
    let capital = parseInt(prompt("Por favor ingresa el monto a solicitar"));
    if (capital > 0) {
      return capital;
      break;
    } else {
      alert("El monto solicitado de ser mayor a cero.");
    }
  } while (true);
}

//valida los Meses
function ingresoMeses() {
  do {
    let meses = parseInt(prompt("Por favor ingrese el plazo en meses entre 1 y 60 meses"));
    if ((meses > 0) && (meses <= 60)) {
      return meses;
      break;
    }else {
      alert("Los meses deben estar comprendidos entre 1 y 60 meses.");
    }
  } while (true);
}

//valida el Interes
function ingresoInteres() {
  do {
    let interes = parseInt(prompt("Por favor ingrese el interés anual debe estar entre 1 y 250"));
    if ((interes > 0) && (interes <= 250)) {
      return interes;
      break;
    } else {
      alert("El numero ingresado debe estar comprendidos entre 1 y 250 %.");
    }
  } while (true);
}

// Esta función va a mostrar el encabezado de la tabla para desglose o detalle.
function domHeaderDesglose() {
  // Buscando el ID donde se van a colocar el encabezado de la tabla simulacion
  let padreTabla = document.getElementById("table-header");
  let filaDatos = document.createElement("tr");
  filaDatos.innerHTML = 
  `
  <th scope="col"># de Cuota</th>
  <th scope="col">Capital Pendiente</th>
  <th scope="col">Capital Amortizado</th>
  <th scope="col">Interés Mensual</th>
  <th scope="col">Cuota</th>`;
  padreTabla.appendChild(filaDatos); // Se agrega al DOM
}

// Esta función va a mostrar el desglose de la cuota mes a mes, Interes pagado, capital, y cuota pura.
function mostrarDesglose(simulacion) {
  // Recuperando el Arreglo del desglose de las cuotas
  let desgloseCuotasArray = simulacion.leerDesgloseCuotas;
  domHeaderDesglose(); // Mostrando el Header de la Table para Desglose

  for (const desgloseCuota of desgloseCuotasArray) {
    let padre = document.getElementById("table-datos");
    let filaDesglose = document.createElement("tr");

    //Definimos el innerHTML del elemento con una plantilla de texto
    filaDesglose.innerHTML = 
    `
    <th scope="row">${desgloseCuota.leerMes}</th>
    <td>${desgloseCuota.leerCapitalPendiente.toFixed(2)}</td>
    <td>${desgloseCuota.leerAmortizado.toFixed(2)}</td>
    <td>${desgloseCuota.leerInteresMes.toFixed(2)}</td>
    <td>${simulacion.leerCuota.toFixed(2)}</td>`;
    padre.appendChild(filaDesglose);
  }
}

// Esta funcion se encarga limpiar los valores de los input y hacer foco en ingresar el capital
// Se usa al inicio del programa y cuando se ejecuta el form
function resetInput() {
  let capitalInput = document.getElementById("capital");
  let interesInput = document.getElementById("interes");
  let mesesInput = document.getElementById("meses");
  // Limpia los Input
  capitalInput.value = "";
  interesInput.value = "";
  mesesInput.value = "";
  capitalInput.focus();
}

// Esta función crea un objeto con los datos de los input y devuelve el objeto creado
function crearSimulacion() {
  let capital = parseFloat(document.getElementById("capital").value);
  let interes = parseFloat(document.getElementById("interes").value);
  let meses = parseInt(document.getElementById("meses").value);
  const simulacion = new Cuotas(capital, interes, meses);
  return simulacion;
}

// Esta Función se encarga de Mostrar la informacion por HTML
function domHeaderSimulacion() {
  // Buscando el ID donde se van a colocar el encabezado de la tabla simulacion
  let padreTabla = document.getElementById("table-header");
  let filaDatos = document.createElement("tr");
  filaDatos.innerHTML = 
  `
  <th scope="col"># de Cuotas</th>
  <th scope="col">Capital Solicitado</th>
  <th scope="col">Interés Anual</th>
  <th scope="col">Cuota Promedio</th>`;
  padreTabla.appendChild(filaDatos); // Se agrega al DOM
}

function visualizarSimulacion(simulacion) {
  domHeaderSimulacion(); // Mostrando el Header de la Table para simulacion
  let meses = simulacion.leerMeses;
  let capitalSolicitado = simulacion.leerCapital;
  let interesAnual = simulacion.leerInteres;
  let cuotaMensual = simulacion.leerCuota;

  // Buscando el ID donde se van a colocar el nodo creando para mostrar
  let padreTabla = document.getElementById("table-datos");
  let filaDatos = document.createElement("tr");
  // Definimos el innerHTML del elemento con una plantilla de texto
  filaDatos.innerHTML = 
  `
  <th scope="row">${meses}</th>
  <td>${capitalSolicitado.toFixed(2)}</td>
  <td>${interesAnual.toFixed(2)}</td>
  <td>${cuotaMensual.toFixed(2)}</td>`;
  padreTabla.appendChild(filaDatos); // Se agrega al DOM
}

// Esta Función se encarga de eliminar los datos de la tabla al reiniciar
function borrarDatosTabla() {
  // Se consulta si existen datos en la tabla, consultando si tabla-datos contiene algún hijo
  let padreTabla = document.getElementById("table-datos");
  if (padreTabla.children.length != 0) {
    // Eliminando los datos de la tabla
    for (let index = (padreTabla.children.length - 1); index >= 0; index--) {
      let child = padreTabla.children[index];
      padreTabla.removeChild(child);
    }
    padreTabla = document.getElementById("table-header");
    let child = padreTabla.children[0]; // es fijo debido a que siempre es el primer hijo el encabezado
    padreTabla.removeChild(child);
  }
}

export {ingresoCapital, ingresoMeses, ingresoInteres, mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla};