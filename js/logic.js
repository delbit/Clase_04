/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: 1era entrega Proyecto
 * @resume: La lógica del programa de Simulación.
 * Se comentan muchas funciones que solo servían para las desafíos anteriores, no se eliminan del todo pasan a estar 
 * en estado deprecated
 * Se crearon las funciones necesarias para asignarle valores a los Input
 * Se creo una función que toma los valores del Input y realiza los cálculos
 * Se crea un función que visualizan los cálculos en el HTMl
 * Se crean nuevas en el cual se utiliza un array de objetos para mostrar nueva información
 * */

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

/*
************************************
DEPRECATED Functions Inicio
************************************

//Se valida la cantidad se simulaciones que se usara para crear el Array
function validarCant() {
  do {
    let cantidad = parseInt(prompt("Por favor ingrese la cantidad de simulaciones a realizar entre 1 y 10"));
    if ((cantidad > 0) && (cantidad <= 10)) {
      return cantidad;
    }else {
      alert("El numero ingresado debe estar comprendidos entre 1 y 10.");
    }
  } while (true);
}

function validarTipoOrden() {
  let ordenar;
  do {
    ordenar = prompt("Ingrese por que criterio se debe ordenar: [M]onto, Me[s], [I]nteres, [C]uotas");
    ordenar = ordenar.toLowerCase();
  } while ((ordenar != "m") && (ordenar != "i") && (ordenar != "s") && (ordenar != "c"));
  return ordenar;
}


// ***Funciones de Manipulación de datos***

// La función mostrar con la capacidad de mostrar el array.
function mostrar(simulaciones) {
  if (simulaciones.length > 0) {

    for (let index = 0; index < simulaciones.length; index++) {
      console.log("Para el monto de " + simulaciones[index].leerCapital + " a " + simulaciones[index].leerMeses + " meses y un interés anual de " + simulaciones[index].leerInteres +  "% la cuota mensual es de: " + ((simulaciones[index].leerCuota).toFixed(2)));
    }
    console.log("-----------------");

  } else {
    console.log("No existen datos para mostrar");
  }
}

//Función de ordenamiento de array

function compararAscCapital(a, b) {
  let resultado = a.leerCapital - b.leerCapital;
  if (resultado == 0) { return 0; }
  return((resultado > 0) ? 1 : -1);
}

function compararAscMeses(a, b) {
  let resultado = a.leerMeses - b.leerMeses;
  if (resultado == 0) { return 0; }
  return((resultado > 0) ? 1 : -1);
}

function compararAscInteres(a, b) {
  let resultado = a.leerInteres - b.leerInteres;
  if (resultado == 0) { return 0; }
  return((resultado > 0) ? 1 : -1);
}

function compararAscCuota(a, b) {
  let resultado = a.leerCuota - b.leerCuota;
  if (resultado == 0) { return 0; }
  return((resultado > 0) ? 1 : -1);
}

function ordenamiento(simulaciones) {
  let ordenar = validarTipoOrden();

  switch (ordenar) {
    // caso de Monto o Capital
    case "m":
      simulaciones.sort(compararAscCapital);
      return simulaciones;

      //Caso para mes
      case "s":
      simulaciones.sort(compararAscMeses);
      return simulaciones;

      //Caso para Interés
      case "i":
      simulaciones.sort(compararAscInteres);
      return simulaciones;

      //Caso para cuota
      case "c":
      simulaciones.sort(compararAscCuota);
      return simulaciones;
  }
}

// function encargada de crear elemento en un array entrada manual
function nuevasSimulaciones() {
  let cantidad = validarCant();
  let simulaciones = [];
  // Este for creara la cantidad de simulaciones solicitadas por el usuario.
  for (let index = 0; index < cantidad; index++) {
    // Solicitando los valores para el nuevo Objeto
    let capital = ingresoCapital();
    let meses = ingresoMeses();
    let interes = ingresoInteres();
    // Se crea un objeto del tipo Cuotas con los valores.
    const cuota = new Cuotas(capital, meses, interes);
    simulaciones.push(cuota); //se agregan los elementos al array
  }
  return simulaciones;
}

**************************
Fin de function Deprecated
**************************
*/

// Esta funcion va a calular el desglose de cada cuota, Interes pagado, capital, y cuota pura.

function desgloseMensual(simulacion) {
  let desgloseArray = [];
  let capitalPendiente = simulacion.leerCapital;
  let interesMensual = simulacion.leerInteresMensual;
  let cuota = simulacion.leerCuota;

  for (let index = 1; index <= simulacion.leerMeses; index++) {
    let desgloseMes = {
      capitalPendiente: "",
      amortizado: "",
      interesMes: "",
      mes: "" 
    }
    desgloseMes.capitalPendiente = capitalPendiente;
    desgloseMes.interesMes = capitalPendiente * interesMensual;
    desgloseMes.amortizado = cuota - desgloseMes.interesMes;
    desgloseMes.mes = index;
    capitalPendiente = capitalPendiente - desgloseMes.amortizado;
    desgloseArray.push(desgloseMes);
  }
  return (desgloseArray);
}

function mostrarDesglose(simulacion) {
  // calculo de datos necesarios
  let desgloseArray = desgloseMensual(simulacion);

  for (let index = 0; index < desgloseArray.length; index++) {
    let padre = document.getElementById("table-datos");
    let filaDesglose = document.createElement("tr");
    //Definimos el innerHTML del elemento con una plantilla de texto
    filaDesglose.innerHTML = 
    `
    <th scope="row">${desgloseArray[index].mes}</th>
    <td>${desgloseArray[index].capitalPendiente.toFixed(2)}</td>
    <td>${desgloseArray[index].amortizado.toFixed(2)}</td>
    <td>${desgloseArray[index].interesMes.toFixed(2)}</td>
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
function visualizarSimulacion(simulacion) {
  // Datos de la Simulacion del crédito
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
  let padreTabla = document.getElementById("table-datos");

  for (let index = (padreTabla.children.length - 1); index >= 0; index--) {
    let child = padreTabla.children[index];
    padreTabla.removeChild(child);
  }
}
