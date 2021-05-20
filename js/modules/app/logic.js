/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 20/05/2021
 * @desafió: Proyecto Final
 * @resume: La lógica del programa de Simulación.
 * Refactoring de la funcion Ajax ahora puede hacer uso del await para preservar el orden de los llamados.
 * Animación de espera para el Ajax, de esta manera se da la sensación que se estan realizando tareas
 * Se modificaron alguna funciones para que puedan trabajar con diferente valores.
 * Mejora de los comentarios en la funciones.
 * Validaciones del nuevo modulo de interés compuesto
 * Se crea la lógica de obtener mediante un getJson las url de un API de cotizaciones del dolar
 * También la lógica que hace uso de esas API para representar las cotizaciones mas relevantes.
 * */

// Import de la class
import { Cuotas } from "../class/cuotas.js";
import { InteresComp } from "../class/interesComp.js"

//***Funciones de Validaciones de entrada datos***

/**
 * Valida el valor del Input.
 * Para tres condiciones posibles e informar el tipo de error del input.
 * Partiendo de la hipótesis de una valor correcto.
 * -1 el numero es un NaN / 0 numero negativo / 1 correcto.
 * @param {object} objInput Selector jQuery input.
 * @param {string} errorText Texto del error.
 * @return {boolean}
 */
function validarInput(objInput,errorText) {
  let valueInput = parseFloat(objInput.val());
  let checker = true;

  if (isNaN(valueInput)) {
    markError(objInput, errorText, -1);
    checker = false;
  }
  if (valueInput < 1) {
    markError(objInput, errorText, 0);
    checker = false;
  }
  return checker;
}

/**
 * Verifica si un numero es múltiplo de otro e informar el error.
 * Partiendo de la hipótesis de una valor correcto.
 * @param {object} objInputMes Selector jQuery input.
 * @param {object} objInputPeriodo Selector jQuery input.
 * @param {string} errorText Texto del error.
 * @return {boolean}
 */
function validarInputMultiplo(objInputMes,objInputPeriodo,errorText) {
  let valueInput = parseInt(objInputMes.val());
  let valuePeriodo = 12 / parseInt(objInputPeriodo.val());
  var resto = valueInput % valuePeriodo;
  let checker = true;

  if (resto != 0) {
    markError(objInputPeriodo, errorText, -1);
    checker = false;
  }
  return checker;
}

/**
 * Regresa los selectores jQuery Inputs.
 * @return {Object[]} array en orden: Capital, Interés, meses.
 */
function getInputsCredito() {
  const inputs = [
    $("#capital"),
    $("#interes"),
    $("#meses")
  ];
  return inputs;
}

/**
 * Regresa los selectores jQuery Inputs.
 * @return {Object[]} array en orden: Capital, Interés, meses, tipo periodo.
 */
function getInputsInteres() {
  const inputs = [
    $("#form-interes-capital"),
    $("#form-interes-interes"),
    $("#form-interes-meses"),
    $("#form-interes-periodo"),
  ];
  return inputs;
}

/**
 * Regresa los selectores jQuery Inputs.
 * @return {Object[]} array en orden: Capital, Interés, meses, interes-ganado, capital-ganado.
 */
function getInputsInteresReset() {
  const inputs = [
    $("#form-interes-capital"),
    $("#form-interes-interes"),
    $("#form-interes-meses"),
    $("#form-interes-interes-ganado"),
    $("#form-interes-capital-ganado")
  ];
  return inputs;
}

/** 
 * Función que se encarga de mostrar los errores de ingreso de los Input, también puede borrarlos.
 * -1 el numero es un NaN.
 * 0 numero negativo.
 * default borrar los errores.
 * @param {Object} objInput Selector jQuery input
 * @param {string} errorText Texto del error
 * @param {number} checker Numero error
 */
function markError(objInput, errorText = "", checker = "remove") {
  let padreInput = (objInput.parents(".input-group"));
  let objIcon = padreInput.find(".input-group-text");       // Es el class que contiene el Icon del input.
  let objHelpBagde = padreInput.find(".help-bagde");        // Es el class contiene el div para el texto de error para el input.

  if (checker == -1) {
    setTimeout( function (){
      objHelpBagde.html(`Debe ingresar un ${errorText} válido`).fadeIn(100);
      objIcon.addClass("error");
    },100);
  }

  if (checker == 0) {
    setTimeout( function (){
      objHelpBagde.html(`Debe ingresar un ${errorText} mayor a 0`).fadeIn(100);
      objIcon.addClass("error");
    },100);
  }

  if ((checker == "remove") && (objHelpBagde.html.length != 0)) {
    objIcon.removeClass("error");
    objHelpBagde.fadeOut(50);
    setTimeout( function (){
      objHelpBagde.html(errorText);
    },100);
  }
}

/**
 * Eliminar los errores de los Inputs.
 * @param {Object[]} inputs Array de selectores jQuery inputs.
 */
function markErrorRemove(inputs) {
  for (const input of inputs) {
    markError($(input));
  }
}

/**
 * Retorna un boolean al
 * Verificar los Inputs del un formulario.
 * @param {Object[]} inputs Array de selectores jQuery inputs.
 * @param {string[]} errorTexts Array de los errores.
 * @return {boolean}
 */
function validarInputs(inputs, errorTexts) {
  let check = true;
  for (let index = 0; index < inputs.length; index++) {
    if (validarInput($(inputs[index]),errorTexts[index]) != true) {
      check = false;
    }
  }
  return check;
}

/**
 * Función se encarga de agregar en el nodo especificado un HTML.
 * @param {string} text codigo html o texto
 * @param {Object} node Selector jQuery
 */
function domAddToNode(text, node) {
  node.append(text);
}

/**
 * Se encarga limpiar los valores de los input y hacer foco en el primer input
 * @param {Object[]} inputs Array de selectores jQuery inputs
 */
function resetInput(inputs) {
  for (const input of inputs) {
    $(input).val("");
  }
  $(inputs[0]).focus();
}

/**
 * Crea un objeto tipo Cuotas con los datos de los input.
 * Valida los input y enviá su respectivo texto de error.
 * @return {Object} simulacion class Cuotas
 */
function crearSimulacion() {
  let inputsCredito = getInputsCredito();
  const errorTexts = [
    "<b>monto a solicitar</b>",
    "<b>interés anual</b>",
    "<b>número de cuotas</b>"
  ];
  if (validarInputs(inputsCredito, errorTexts)) {
    let capital = parseFloat($("#capital").val());
    let interes = parseFloat($("#interes").val());
    let meses = parseInt($("#meses").val());
    const simulacion = new Cuotas(capital, interes, meses);
    return simulacion;
  }
}

/**
 * Va a mostrar la información del crédito de forma sencilla.
 * @param {Object} simulacion Tipo Cuota
 */
function visualizarSimulacion(simulacion) {
  // El array devuelto el selector jQuery Header,selector jQuery de datos.
  let tablas = cualTabla("cal");
  let tablaHeader = tablas[0];
  let tablaRow  = tablas[1];
  let textsHeader =`
  <tr>
    <th class="hidden" scope="col"># Cuotas</th>
    <th class="hidden" scope="col">Capital Solicitado</th>
    <th class="hidden" scope="col">Interés Anual</th>
    <th class="hidden" scope="col">Cuota Promedio</th>
  </tr>`;
  let textsRow =`
  <tr>
    <td class="hidden" scope="row"><strong>${simulacion.leerMeses}</strong></td>
    <td class="hidden">${simulacion.leerCapital.toFixed(2)}</td>
    <td class="hidden">${simulacion.leerInteres.toFixed(2)}</td>
    <td class="hidden">${simulacion.leerCuota.toFixed(2)}</td>
  </tr>`;

  // Es necesario un retraso al momento de volver a escribir los datos nuevos.
  // Debido a que se elimina texto.
  setTimeout( function (){
    domAddToNode(textsHeader, tablaHeader);
    domAddToNode(textsRow, tablaRow);
    tableAnimate(cualTabla("cal"));
  },200);
  scrollToNodo(tablaHeader);
}

/**
 * Va a mostrar el desglose de la cuota mes a mes, Interés pagado, capital, y cuota pura
 * @param {Object} simulacion Tipo Cuota
 */
function mostrarDesglose(simulacion) {
  // El array devuelto el selector jQuery Header,selector jQuery de datos.
  let tablas = cualTabla("cal");
  let tablaHeader = tablas[0];
  let tablaRow  = tablas[1];

  // Recuperando el Arreglo del desglose de las cuotas.
  let desgloseCuotasArray = simulacion.leerDesgloseCuotas;
  let textHeader = `
  <tr>
    <th class="hidden text-truncate" scope="col">Cuota</th>
    <th class="hidden text-truncate" scope="col">Capital Pendiente</th>
    <th class="hidden text-truncate" scope="col">Capital Amortizado</th>
    <th class="hidden text-truncate" scope="col">Interés Mensual</th>
    <th class="hidden text-truncate" scope="col">Cuota</th>
  </tr>`;

  setTimeout( function (){
    domAddToNode(textHeader, tablaHeader);
    for (const desgloseCuota of desgloseCuotasArray) {
      let textRow = `
      <tr>
        <td class="hidden" scope="row"><strong>${desgloseCuota.leerMes}</strong></td>
        <td class="hidden">${desgloseCuota.leerCapitalPendiente.toFixed(2)}</td>
        <td class="hidden">${desgloseCuota.leerAmortizado.toFixed(2)}</td>
        <td class="hidden">${desgloseCuota.leerInteresMes.toFixed(2)}</td>
        <td class="hidden">${simulacion.leerCuota.toFixed(2)}</td>
      </tr>`;

      domAddToNode(textRow, tablaRow);
    }
    tableAnimate(tablas);
  },200);
  scrollToNodo(tablaHeader);
}

/**
 * Retorna un array de selectores jQuery
 * Tabla a usar, en el orden header y datos
 * @param {string} pCual "cal" Simulador / "dolar" Cotizacion
 * @return {Object[]}
 */
function cualTabla(pCual) {
  if(pCual == "cal") {
    return ([$("#table-header"),$("#table-datos")])
  }

  if(pCual == "dolar") {
    return ([$("#table-header-ajax"),$("#table-datos-ajax")])
  }
}

/**
 * Borrado de los datos de una tabla, se ejecuta si esta tiene hijos
 * @param  {string} pCual "cal" Simulador / "dolar" Cotizacion
 */
function borrarDatosTabla(pCual) {
  let tablas = cualTabla(pCual);
  let tablaHeader = tablas[0];
  let tablaRow  = tablas[1];

  if (tablaRow.children().length != 0) {
    tableAnimate(tablas,"H");

    // Retrasor el borrado de la tabla para que la animación se aprecie.
    setTimeout( function (){
      tablaRow.empty();
      tablaHeader.empty();
    }, 150);
  }
}

/**
 * Animacion para las celdas de una tabla
 * @param  {object} tablas Array de Selectores jQuery
 * @param  {string} evento S = Show (mostrar) default / H = Hidden (ocultar)
 */
function tableAnimate(tablas, evento = "S") {
  let tablaHeader = tablas[0].find("th");
  let tablaRow = tablas[1].find("td");

  if (evento == "S") {
    tablaHeader.slideDown(250);
    tablaRow.slideDown(250);
  } else {
    tablaHeader.slideUp(150);
    tablaRow.slideUp(150);
  }
}

/**
 * Animaciones del Hero
 */
function animateHero() {
  $(".hero-title").fadeIn(250, function () {
    $(".hero-p").slideDown(250);
    $(".hero button").fadeIn();
  });
}


/**
 * Centra un nodo en la pantalla, con animacion de scroll
 * @param  {object} nodo selector jQuery
 */
function scrollToNodo(nodo) {
  $('html, body').animate({
    scrollTop: nodo.offset().top
  }, 1500);
}

/**
 * Agrega el encabezado a la tabla de cotizaciones
 */
function mostrarHeaderCotizacion() {
  let headerAjax = $("#table-header-ajax");
  let textHeader =`
  <tr>
    <th class="hidden" scope="col">Dólar</th>
    <th class="hidden" scope="col">Fecha</th>
    <th class="hidden" scope="col">Compra</th>
    <th class="hidden" scope="col">Venta</th>
  </tr>
  `;
  domAddToNode(textHeader, headerAjax);
}

/**
 * Agrega el una fila a la tabla de cotizaciones
 * @param {string} descripcion El nombre de la cotización
 * @param {object} response la respuesta de la api con la cotización
 */
function mostrarRowCotizaciones(descripcion,response) {
  let textRow = `
    <tr>
      <td class="hidden" scope="row"><strong>${descripcion}</strong></td>
      <td class="hidden">${response.fecha.slice(0, 10)}</td>
      <td class="hidden">${response.compra}</td>
      <td class="hidden">${response.venta}</td>
    </tr>
    `;
  domAddToNode(textRow, $("#table-datos-ajax"));
}

/**
 * Regresa la respuesta de una llamada AJAX.
 * @param {string} ajaxurl url de consulta.
 * @param {object} type el método de consulta de ajax.
 */
function getDataJson(ajaxurl,type) { 
  return $.ajax({
    url: ajaxurl,
    type: type,
  });
};

/**
 * Llamados de la cotización de manera asíncrona con await para que la
 * cotizaciones se muestra en en el mismo orden.
 * muestra una animación mientras se completa la carga
 */
async function obtenerAPI() {
  $(".animate").fadeIn("fast");
  const URLGET = "/Clase_04/data/dolarAPI.json";
  const resApis = await getDataJson(URLGET,"get");
  mostrarHeaderCotizacion();

  for (const resApi of resApis) {
    try {
      const response = await getDataJson(resApi.url,"get")
      mostrarRowCotizaciones(resApi.descripcion,response)
    } catch(err) {
      console.log(err);
    }
  }
  $(".animate").fadeOut("fast");
  scrollToNodo($("#table-header-ajax"));
  tableAnimate(cualTabla("dolar"));
}

/**
 * Retorna la Verificación de los Input para el Interes Compuesto
 * contiene los mensaje si existen errores.
 * @param  {object} inputs Selectores jQuery inputs
 * @return  {boolean}
 */
function validarInputInteresCompuesto(inputs) {
  let checker = false;
  const errorTexts = [
    "<b>capital inicial</b>",
    "<b>interés anual</b>",
    "<b>periodo de meses</b>"
  ];
  const errorTextsSelector = "<b>periodo de abono</b>"

  let validator1 = validarInputs(inputs, errorTexts);
  let validator2 = validarInputMultiplo(inputs[2],inputs[3], errorTextsSelector);

  if ((validator1) && (validator2)) {
    checker = true;
  }
  return checker;
}

/**
 * Creación de un interes compuesto y su respectiva visualización de resultado
 */
function crearInteresCompuesto() {
  let inputsInteres = getInputsInteres();
  scrollToNodo($("#form-interes"));

  if (validarInputInteresCompuesto(inputsInteres)) {
    let capital = parseFloat(inputsInteres[0].val());
    let interes = parseFloat(inputsInteres[1].val());
    let meses = parseInt(inputsInteres[2].val());
    let tipoPeriodo = parseInt(inputsInteres[3].val());

    const intComp = new InteresComp(capital, interes, meses, tipoPeriodo);

    $("#form-interes-interes-ganado").val(intComp.interesCompuesto.toFixed(2));
    $("#form-interes-capital-ganado").val(intComp.capitalFinal.toFixed(2));
  }
}

export { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla, 
  validarInputs, animateHero, markErrorRemove, obtenerAPI, crearInteresCompuesto, getInputsCredito,
  getInputsInteres, getInputsInteresReset, scrollToNodo }
