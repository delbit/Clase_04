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
 * Se crean las funciones de validaciones de necesarias para que el usuario no pueda ingresar valores incorrectos.
 * */

// Import de la class
import {Cuotas} from "./cuotas_class.js";

//***Funciones de Validaciones de entrada datos***

// Valida el valor del Input,
// Se verifican tres condiciones y cada una sirve para, -1 el numero es un NaN / 0 numero negativo / 1 correcto
function validarInput(objInput,errorText) {
  let valueInput = parseFloat(objInput.val());

  if (isNaN(valueInput)) {
    markError(objInput, errorText, -1);
  } else if (valueInput < 1){
    markError(objInput, errorText, 0);
  } else {
    return 1; // valor es correcto
  }
}

// El Array de inputs es en el orden Capital, Interés, meses.
function getInputs() {
  const inputs = [
    $("#capital"),
    $("#interes"),
    $("#meses")
  ];
  return inputs;
}

// Escribir función que marque el error.
function markError(objInput, errorText, checker) {
  let padreInput = objInput.parent();
  let objIcon = padreInput.find(".input-group-text"); // Es el class que contiene el Icon del input
  let objHelpBagde = padreInput.find(".help-bagde"); // Es el class contiene el Icon del input

  objIcon.addClass("error"); // agrega la class error al Icon del input

  // Agrega el texto correspondiente al error ocurrido.
  if (checker == -1) {
    objHelpBagde.html(`Debe ingresar un ${errorText} válido`);
  }else {
    objHelpBagde.html(`Debe ingresar un ${errorText} mayor a 0`);
  }
}

function markErrorRemove() {
  const inputs = getInputs();

  for (const input of inputs) {
    //console.dir(input);
    let padreInput = input.parent();
    //console.dir(padreInput);
    let objIcon = padreInput.find(".input-group-text"); // Es el elemento que contiene el Icon del input
    //console.dir(objIcon);
    let objHelpBagde = padreInput.find(".help-bagde");
    console.dir((objHelpBagde.html()).length);
    if ((objHelpBagde.html()).length != 0) {
      objIcon.removeClass("error");
      objHelpBagde.html("");
    }
  }
}

// esta funcion se encarga de verificar todos los Inputs del formulario
function validarInputs() {
  let check = true;
  const inputs = getInputs(); // El array devuelto es Capital, Interés, Meses, el errorText sigue ese orden
  const errorTexts = [
    "<b>monto a solicitar</b>",
    "<b>interés anual</b>",
    "<b>número de cuotas</b>"
  ];
  // Validando cada Input
  for (let index = 0; index < inputs.length; index++) {
    if (validarInput(inputs[index],errorTexts[index]) != true){
      check = false;
    }
  }
  // Regresando validación, Si alguna Input es invalido se retorna una false. 
  return check;
}

// Esta función va a mostrar el encabezado de la tabla para desglose o detalle.
function domHeaderDesglose() {
  // Buscando el ID donde se van a colocar el encabezado de la tabla simulacion
  let padreTabla = $("#table-header");
  padreTabla.append(
  `
  <tr>
    <th scope="col"># de Cuota</th>
    <th scope="col">Capital Pendiente</th>
    <th scope="col">Capital Amortizado</th>
    <th scope="col">Interés Mensual</th>
    <th scope="col">Cuota</th>
  </tr>`);
}

// Esta función va a mostrar el desglose de la cuota mes a mes, Interes pagado, capital, y cuota pura.
function mostrarDesglose(simulacion) {
  // Recuperando el Arreglo del desglose de las cuotas
  let desgloseCuotasArray = simulacion.leerDesgloseCuotas;
  domHeaderDesglose(); // Mostrando el Header de la Table para Desglose

  for (const desgloseCuota of desgloseCuotasArray) {
    let padre = $("#table-datos");
    padre.append(
    `
    <tr>
      <th scope="row">${desgloseCuota.leerMes}</th>
      <td>${desgloseCuota.leerCapitalPendiente.toFixed(2)}</td>
      <td>${desgloseCuota.leerAmortizado.toFixed(2)}</td>
      <td>${desgloseCuota.leerInteresMes.toFixed(2)}</td>
      <td>${simulacion.leerCuota.toFixed(2)}</td>
    </tr>`);
  }
}

// Esta función se encarga limpiar los valores de los input y hacer foco en el primer input
// Se usa al inicio del programa y cuando se ejecuta el form
function resetInput() {
  const inputs = getInputs();
  // Limpia los Input
  for (const input of inputs) {
    input.val("");
  }
  inputs[0].focus(); // foco siempre al primer input
}

// Esta función crea un objeto con los datos de los input y devuelve el objeto creado, si los Input son correctos.
function crearSimulacion() {
  if (validarInputs()) {
    let capital = parseFloat($("#capital").val());
    let interes = parseFloat($("#interes").val());
    let meses = parseInt($("#meses").val());
    const simulacion = new Cuotas(capital, interes, meses);
    return simulacion;
  }
}

// Esta Función se encarga de Mostrar la informacion por HTML
function domHeaderSimulacion() {
  // Buscando el ID donde se van a colocar el encabezado de la tabla simulacion
  let padreTabla = $("#table-header");
  padreTabla.append(
  `
  <tr>
    <th scope="col"># de Cuotas</th>
    <th scope="col">Capital Solicitado</th>
    <th scope="col">Interés Anual</th>
    <th scope="col">Cuota Promedio</th>
  </tr>`);

}

function visualizarSimulacion(simulacion) {
  domHeaderSimulacion(); // Mostrando el Header de la Table para simulacion
  let meses = simulacion.leerMeses;
  let capitalSolicitado = simulacion.leerCapital;
  let interesAnual = simulacion.leerInteres;
  let cuotaMensual = simulacion.leerCuota;

  // Buscando el ID donde se van a colocar el nodo creando para mostrar
  let padreTabla = $("#table-datos");
  padreTabla.append(
  `
  <tr>
    <th scope="row">${meses}</th>
    <td>${capitalSolicitado.toFixed(2)}</td>
    <td>${interesAnual.toFixed(2)}</td>
    <td>${cuotaMensual.toFixed(2)}</td>
  </tr>`);
}

// Esta Función se encarga de eliminar los datos de la tabla al reiniciar
function borrarDatosTabla() {
  // Verificando y removiendo los errores de los Inputs.
  console.log("Entrando en borrar Tabla");
  markErrorRemove();
  console.log("volviendo a borrar Tabla");
  // Se consulta si existen datos en la tabla, consultando si tabla-datos contiene algún hijo
  let padreTabla = $("#table-datos");
  if (padreTabla.children().length != 0) {
    padreTabla.empty();
    padreTabla = $("#table-header");
    padreTabla.empty();
  }
}

export { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla};
