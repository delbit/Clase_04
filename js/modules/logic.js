/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 08/05/2021
 * @desafió: 3er Entrega
 * @resume: La lógica del programa de Simulación.
 * se modificaron alguna funciones para que puedan trabajar con diferente valores.
 * Se crea la lógica de obtener mediante un getJson las url de un API de cotizaciones del dolar
 * También la lógica que hace uso de esas API para representar las cotizaciones mas relevantes.
 * */

// Import de la class
import { Cuotas } from "./cuotas_class.js";
import { InteresComp } from "./class/interesComp.js"

//***Funciones de Validaciones de entrada datos***

// Valida el valor del Input.
// Se verifican tres condiciones y cada una sirve para, -1 el numero es un NaN / 0 numero negativo / 1 correcto.
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
  return checker;         // Se parte de la hipótesis de que los input son validos.
}

// El Array de inputs es en el orden Capital, Interés, meses.
function getInputsCredito() {
  const inputs = [
    $("#capital"),
    $("#interes"),
    $("#meses")
  ];
  return inputs;
}

// El Array de inputs es en el orden Capital, Interés, meses, tipo periodo
function getInputsInteres() {
  const inputs = [
    $("#form-interes-capital"),
    $("#form-interes-interes"),
    $("#form-interes-meses"),
    $("#form-interes-periodo"),
  ];
  return inputs;
}

/*
* Función que se encarga de mostrar los errores de ingreso de los Input, también puede borrarlos.
 * -1 el numero es un NaN
 * 0 numero negativo
 * 1 correcto
 * default borrar los errores.
 */
function markError(objInput, errorText = "", checker = "remove") {
  let padreInput = objInput.parent();
  let objIcon = padreInput.find(".input-group-text");       // Es el class que contiene el Icon del input.
  let objHelpBagde = padreInput.find(".help-bagde");        // Es el class contiene el div para el texto de error para el input.

  // Agrega el texto correspondiente al error ocurrido dato no Valido.
  if (checker == -1) {
    objHelpBagde.html(`Debe ingresar un ${errorText} válido`).fadeIn(250);
    objIcon.addClass("error");        // agrega la class error al Icon del input.
  }
  if (checker == 0) {
    objHelpBagde.html(`Debe ingresar un ${errorText} mayor a 0`).fadeIn(250);
    objIcon.addClass("error");        // agrega la class error al Icon del input.
  }
  // Esta sentencia remueve el error del input.
  if ((checker == "remove") && (objHelpBagde.html.length != 0)) {
    objIcon.removeClass("error");
    objHelpBagde.fadeOut(50).delay(5);
    objHelpBagde.html(errorText);
  }
}

function markErrorRemove(inputs) {
  //const inputs = getInputsCredito();
  for (const input of inputs) {
    markError($(input));          //Reutilizamos la función modificada para que por default sea remover error.
  }
}

// esta funcion se encarga de verificar todos los Inputs del formulario.
function validarInputs(inputs) {
  let check = true;
  //const inputs = getInputsCredito();     // El array devuelto es Capital, Interés, Meses, el errorText sigue ese orden.
  const errorTexts = [
    "<b>monto a solicitar</b>",
    "<b>interés anual</b>",
    "<b>número de cuotas</b>"
  ];
  // Validando cada Input.
  for (let index = 0; index < inputs.length; index++) {
    if (validarInput($(inputs[index]),errorTexts[index]) != true) {
      check = false;
    }
  }
  return check;                 // Regresando validación, Si alguna Input es invalido se retorna una false. 
}

// Esta función se encarga de append en el nodo especificado.
function domAddToNode(text, node) {
  node.append(text);
}

// Esta función se encarga limpiar los valores de los input y hacer foco en el primer input.
// Se usa al inicio del programa y cuando se ejecuta el form.
function resetInput(inputs) {
  //const inputs = getInputsCredito();
  for (const input of inputs) {
    $(input).val("");
  }
  $(inputs[0]).focus(); // foco siempre al primer input.
}

// Esta función crea un objeto con los datos de los input y devuelve el objeto creado, si los Input son correctos.
function crearSimulacion() {
  if (validarInputs(getInputsCredito())) {
    let capital = parseFloat($("#capital").val());
    let interes = parseFloat($("#interes").val());
    let meses = parseInt($("#meses").val());
    const simulacion = new Cuotas(capital, interes, meses);
    return simulacion;
  }
}

// Esta función va a mostrar la información del crédito de manera rápida.
function visualizarSimulacion(simulacion) {
  let tablas = cualTabla("cal");
  let tablaHeader = tablas[0]; // EL array devuelto siempre debe traer el Header de primero, luego la de datos
  let tablaRow  = tablas[1];
  // El texto del encabezado de la tabla.
  let textsHeader =`
  <tr>
    <th class="hidden" scope="col"># de Cuotas</th>
    <th class="hidden" scope="col">Capital Solicitado</th>
    <th class="hidden" scope="col">Interés Anual</th>
    <th class="hidden" scope="col">Cuota Promedio</th>
  </tr>`;

  // El texto de la fila de la tabla.
  let textsRow =`
  <tr>
    <td class="hidden" scope="row"><strong>${simulacion.leerMeses}</strong></td>
    <td class="hidden">${simulacion.leerCapital.toFixed(2)}</td>
    <td class="hidden">${simulacion.leerInteres.toFixed(2)}</td>
    <td class="hidden">${simulacion.leerCuota.toFixed(2)}</td>
  </tr>`;

  // Debido a que se elimina codigo, es necesario un retraso al momento de volver a escribir los datos nuevos.
  setTimeout( function (){
    domAddToNode(textsHeader, tablaHeader);
    domAddToNode(textsRow, tablaRow);
    tableAnimate(cualTabla("cal")); // Animación de la tabla.
  },200);                           // El valor es el numero del retraso de la animación.
}

// Esta función va a mostrar el desglose de la cuota mes a mes, Interés pagado, capital, y cuota pura.
function mostrarDesglose(simulacion) {
  let tablas = cualTabla("cal");
  let tablaHeader = tablas[0]; // EL array devuelto siempre debe traer el Header de primero, luego la de datos
  let tablaRow  = tablas[1];

  // Recuperando el Arreglo del desglose de las cuotas.
  let desgloseCuotasArray = simulacion.leerDesgloseCuotas;

  // Texto del encabezado de la tabla.
  let textHeader = `
  <tr>
    <th class="hidden" scope="col"># de Cuota</th>
    <th class="hidden" scope="col">Capital Pendiente</th>
    <th class="hidden" scope="col">Capital Amortizado</th>
    <th class="hidden" scope="col">Interés Mensual</th>
    <th class="hidden" scope="col">Cuota</th>
  </tr>`;

  // Debido a que se elimina codigo de los div, es necesario un retraso en el momento de volver a escribir los datos nuevos.
  setTimeout( function (){
    domAddToNode(textHeader, tablaHeader);                  // Se envia el encabezado de la tabla.
    for (const desgloseCuota of desgloseCuotasArray) {
      // Texto de cada fila de la tabla.
      let textRow = `
      <tr>
        <td class="hidden" scope="row"><strong>${desgloseCuota.leerMes}</strong></td>
        <td class="hidden">${desgloseCuota.leerCapitalPendiente.toFixed(2)}</td>
        <td class="hidden">${desgloseCuota.leerAmortizado.toFixed(2)}</td>
        <td class="hidden">${desgloseCuota.leerInteresMes.toFixed(2)}</td>
        <td class="hidden">${simulacion.leerCuota.toFixed(2)}</td>
      </tr>`;

      domAddToNode(textRow, tablaRow);                      // Se enviá el texto de fila a la tabla.
    }
    tableAnimate(tablas);                                   // Animación de las filas de la tabla calculadora
  },200);                                                   // El valor es el numero del retraso de la animación.

  scrollToNodo(tablaHeader);                                // Animación para central la tabla.
}

function cualTabla(pCual) {
  if(pCual == "cal") {
    return ([$("#table-header"),$("#table-datos")])
  }

  if(pCual == "dolar") {
    return ([$("#table-header-ajax"),$("#table-datos-ajax")])
  }
}

// Esta Función se encarga de eliminar los datos de la tabla al reiniciar.
function borrarDatosTabla(pCual) {
  let tablas = cualTabla(pCual);
  let tablaHeader = tablas[0];            // EL array devuelto siempre debe traer el Header de primero, luego la de datos.
  let tablaRow  = tablas[1];

  // Se consulta si existen datos en la tabla, consultando si tabla-datos contiene algún hijo.
  if (tablaRow.children().length != 0) {
    tableAnimate(tablas,"H");

    // Esta llamada lo que hace es retrasar el borrado de la tabla para que la animación se pueda ver.
    setTimeout( function (){
      tablaRow.empty();
      tablaHeader.empty();
    }, 150);
  }
}

// Funcion para mostrar u ocultar los datos S = Show (mostrar) / H = Hidden (ocultar).
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

// Esta función anima todo el texto del Hero
function animateHero() {
  $(".hero-title").fadeIn(250, function () {
    $(".hero-p").slideDown(250);
    $(".hero button").fadeIn();
  });
}

// Esta función centra a un nodo la pantalla.
function scrollToNodo(nodo) {
  $('html, body').animate({
    scrollTop: nodo.offset().top
  }, 1500);
}

// Esta función es la implementación de lo que seria un evento AJAX JSON
function obtenerAPI() {
  const URLGET = "/data/dolarAPI.json";

  $.getJSON(URLGET, function (respuestas, estado) {
    let headerAjax = $("#table-header-ajax")
    if(estado === "success"){
      let textHeader =`
      <tr>
        <th scope="col">Dólar</th>
        <th scope="col">Fecha</th>
        <th scope="col">Compra</th>
        <th scope="col">Venta</th>
      </tr>
      `;
      domAddToNode(textHeader, headerAjax);

      for (const objJson of respuestas) {
        obtenerCotizaciones(objJson);
      }
      scrollToNodo(headerAjax);
    }
  });
}

// Esta es la implementación de un Ajax con estructura diferente, obtiene los datos desde un objeto el cual tiene 
// la Api de cotización y la va mostrando en pantalla.
function obtenerCotizaciones(objJson) {
  $.ajax({
    dataType: objJson.metodo,
    url: objJson.url,
    success:( (response) => {
      let textRow = `
      <tr>
        <td scope="row"><strong>${objJson.descripcion}</strong></td>
        <td>${response.fecha.slice(0, 10)}</td>
        <td>${response.compra}</td>
        <td>${response.venta}</td>
      </tr>
      `;
      domAddToNode(textRow, $("#table-datos-ajax"));
    })
  });
}

function crearInteresCompuesto() {
  let inputs = getInputsInteres();
  let capital = parseFloat(inputs[0].val());
  let interes = parseFloat(inputs[1].val());
  let meses = parseInt(inputs[2].val());
  let tipoPeriodo = parseInt(inputs[3].val());

  const intComp = new InteresComp(capital, interes, meses, tipoPeriodo);

  $("#form-interes-interes-ganado").val(intComp.interesCompuesto.toFixed(2));
  $("#form-interes-capital-ganado").val(intComp.capitalFinal.toFixed(2));
  
  console.log("capital Final");
  console.log(intComp.capitalFinal.toFixed(2));
  console.log("Interes Ganado");
  console.log(intComp.interesCompuesto.toFixed(2));
    
}

export { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla, 
  validarInputs, animateHero, markErrorRemove, obtenerAPI, crearInteresCompuesto, getInputsCredito, getInputsInteres }
