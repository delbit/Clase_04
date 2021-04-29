/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 29/04/2021
 * @desafió: jQuery
 * @resume: La lógica del programa de Simulación.
 * Se eliminaron las funciones innecesarias
 * Se realizo un refactoring de funcion Validar y markError, haciendo el codigo mas DRY
 * Refactoring a las funciones que escriben el DOM con los datos haciendo las mas DRY
 * Se crean las funciones de validaciones de necesarias para que el usuario no pueda ingresar valores incorrectos.
 * */

// Import de la class
import {Cuotas} from "./cuotas_class.js";

//***Funciones de Validaciones de entrada datos***

// Valida el valor del Input,
// Se verifican tres condiciones y cada una sirve para, -1 el numero es un NaN / 0 numero negativo / 1 correcto
function validarInput(objInput,errorText) {
  let valueInput = parseFloat(objInput.val());
  let checker = true;
  if (isNaN(valueInput)) {
    markError(objInput, errorText, -1);
    checker = false;
  }
  if (valueInput < 1){
    markError(objInput, errorText, 0);
    checker = false;
  }
  return checker; // valor es correcto
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

/*
* Función que se encarga de mostrar los errores de ingreso de los Input, también puede borrarlos.
 * -1 el numero es un NaN
 * 0 numero negativo
 * 1 correcto
 * default borrar los errores
 */
function markError(objInput, errorText = "", checker = "remove") {
  let padreInput = objInput.parent();
  console.dir(padreInput);
  let objIcon = padreInput.find(".input-group-text"); // Es el class que contiene el Icon del input
  let objHelpBagde = padreInput.find(".help-bagde"); // Es el class contiene el div para el texto de error para el input

  // Agrega el texto correspondiente al error ocurrido dato no Valido.
  if (checker == -1) {
    objHelpBagde.html(`Debe ingresar un ${errorText} válido`);
    objIcon.addClass("error"); // agrega la class error al Icon del input
  }
  if (checker == 0){
    objHelpBagde.html(`Debe ingresar un ${errorText} mayor a 0`);
    objIcon.addClass("error"); // agrega la class error al Icon del input
  }
  // Esta sentencia remueve el error del input
  if (checker == "remove"){
    objIcon.removeClass("error");
    objHelpBagde.html(errorText);
  }
}

function markErrorRemove() {
  const inputs = getInputs();
  for (const input of inputs) {
    markError($(input));  //Reutilizamos la función modificada para que por default sea remover error
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
    if (validarInput($(inputs[index]),errorTexts[index]) != true){
      check = false;
    }
  }
  // Regresando validación, Si alguna Input es invalido se retorna una false. 
  return check;
}

// Esta función se encarga de escribir el Header de la Tabla
function domHeaderTable(texts) {
  let padreTabla = $("#table-header");
  padreTabla.append(texts);
}
// Esta función se encarga de escribir una fila de la Tabla
function domRowTable(texts) {
  let padreTabla = $("#table-datos");
  padreTabla.append(texts);
}

// Esta función se encarga limpiar los valores de los input y hacer foco en el primer input
// Se usa al inicio del programa y cuando se ejecuta el form
function resetInput() {
  const inputs = getInputs();
  // Limpia los Input
  for (const input of inputs) {
    $(input).val("");
  }
  $(inputs[0]).focus(); // foco siempre al primer input
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

// Esta función va a mostrar la informacion del credito de manera rapida.
function visualizarSimulacion(simulacion) {
  let textsHeader =`
  <tr>
    <th scope="col"># de Cuotas</th>
    <th scope="col">Capital Solicitado</th>
    <th scope="col">Interés Anual</th>
    <th scope="col">Cuota Promedio</th>
  </tr>`;

  let textsRow =`
  <tr>
    <th scope="row">${simulacion.leerMeses}</th>
    <td>${simulacion.leerCapital.toFixed(2)}</td>
    <td>${simulacion.leerInteres.toFixed(2)}</td>
    <td>${simulacion.leerCuota.toFixed(2)}</td>
  </tr>`;

  domHeaderTable(textsHeader); // Se enviá el encabezado de la tabla
  domRowTable(textsRow);  // Se enviá la fila a la tabla
}

// Esta función va a mostrar el desglose de la cuota mes a mes, Interes pagado, capital, y cuota pura.
function mostrarDesglose(simulacion) {
  // Recuperando el Arreglo del desglose de las cuotas
  let desgloseCuotasArray = simulacion.leerDesgloseCuotas;
  // Texto del encabezado de la tabla.
  let textsHeader = `
  <tr>
    <th scope="col"># de Cuota</th>
    <th scope="col">Capital Pendiente</th>
    <th scope="col">Capital Amortizado</th>
    <th scope="col">Interés Mensual</th>
    <th scope="col">Cuota</th>
  </tr>`;

  domHeaderTable(textsHeader); // Se envia el encabezado de la tabla

  for (const desgloseCuota of desgloseCuotasArray) {
    let textsRow = `
    <tr>
      <th scope="row">${desgloseCuota.leerMes}</th>
      <td>${desgloseCuota.leerCapitalPendiente.toFixed(2)}</td>
      <td>${desgloseCuota.leerAmortizado.toFixed(2)}</td>
      <td>${desgloseCuota.leerInteresMes.toFixed(2)}</td>
      <td>${simulacion.leerCuota.toFixed(2)}</td>
    </tr>`;

    domRowTable(textsRow);  // Se envia la fila a la tabla
  }
}

// Esta Función se encarga de eliminar los datos de la tabla al reiniciar
function borrarDatosTabla() {
  // Verificando y removiendo los errores de los Inputs.
  markErrorRemove();
  // Se consulta si existen datos en la tabla, consultando si tabla-datos contiene algún hijo
  let padreTabla = $("#table-datos");
  if (padreTabla.children().length != 0) {
    padreTabla.empty();
    padreTabla = $("#table-header");
    padreTabla.empty();
  }
}

export { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla, validarInputs };
