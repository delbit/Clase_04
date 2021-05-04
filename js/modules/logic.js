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
import { Cuotas } from "./cuotas_class.js";

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

function markErrorRemove() {
  const inputs = getInputs();
  for (const input of inputs) {
    markError($(input));          //Reutilizamos la función modificada para que por default sea remover error.
  }
}

// esta funcion se encarga de verificar todos los Inputs del formulario.
function validarInputs() {
  let check = true;
  const inputs = getInputs();     // El array devuelto es Capital, Interés, Meses, el errorText sigue ese orden.
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

// Esta función se encarga de escribir el Header de la Tabla.
function domHeaderTable(texts) {
  let padreTabla = $("#table-header");
  padreTabla.append(texts);
}
// Esta función se encarga de escribir una fila de la Tabla.
function domRowTable(texts) {
  let padreTabla = $("#table-datos");
  padreTabla.append(texts);
}

// Esta función se encarga limpiar los valores de los input y hacer foco en el primer input.
// Se usa al inicio del programa y cuando se ejecuta el form.
function resetInput() {
  const inputs = getInputs();
  // Limpia los Input.
  for (const input of inputs) {
    $(input).val("");
  }
  $(inputs[0]).focus(); // foco siempre al primer input.
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

// Esta función va a mostrar la información del crédito de manera rápida.
function visualizarSimulacion(simulacion) {
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

  // Debido a que se elimina codigo, es necesario un retraso en el moeto de volver a escribir los datos nuevos.
  setTimeout(function (){
    domHeaderTable(textsHeader);  // Se enviá el encabezado de la tabla.
    domRowTable(textsRow);        // Se enviá la fila a la tabla.
    tableAnimate();               // Animación de las filas de la tabla.
  },200);                         // El valor es el numero del retraso de la animación.
}

// Esta función va a mostrar el desglose de la cuota mes a mes, Interes pagado, capital, y cuota pura.
function mostrarDesglose(simulacion) {
  // Recuperando el Arreglo del desglose de las cuotas.
  let desgloseCuotasArray = simulacion.leerDesgloseCuotas;
  // Texto del encabezado de la tabla.
  let textsHeader = `
  <tr>
    <th class="hidden" scope="col"># de Cuota</th>
    <th class="hidden" scope="col">Capital Pendiente</th>
    <th class="hidden" scope="col">Capital Amortizado</th>
    <th class="hidden" scope="col">Interés Mensual</th>
    <th class="hidden" scope="col">Cuota</th>
  </tr>`;

  // Debido a que se elimina codigo de los div, es necesario un retraso en el momento de volver a escribir los datos nuevos.
  setTimeout(function (){
    domHeaderTable(textsHeader); // Se envia el encabezado de la tabla.
    for (const desgloseCuota of desgloseCuotasArray) {
      // Texto de cada fila de la tabla.
      let textsRow = `
      <tr>
        <td class="hidden" scope="row"><strong>${desgloseCuota.leerMes}</strong></td>
        <td class="hidden">${desgloseCuota.leerCapitalPendiente.toFixed(2)}</td>
        <td class="hidden">${desgloseCuota.leerAmortizado.toFixed(2)}</td>
        <td class="hidden">${desgloseCuota.leerInteresMes.toFixed(2)}</td>
        <td class="hidden">${simulacion.leerCuota.toFixed(2)}</td>
      </tr>`;

      domRowTable(textsRow);  // Se enviá el texto de fila a la tabla.
    }
    tableAnimate();           // Animación de las filas de la tabla.
  },200);                     // El valor es el numero del retraso de la animación.

  tableScroll();              // Animación para central la tabla.
}

// Esta Función se encarga de eliminar los datos de la tabla al reiniciar.
function borrarDatosTabla() {
  // Verificando y removiendo los errores de los Inputs.
  markErrorRemove();
  // Se consulta si existen datos en la tabla, consultando si tabla-datos contiene algún hijo.
  let padreTabla = $("#table-datos");
  if (padreTabla.children().length != 0) {
    tableAnimate("H");

    // esta llamada lo que hace es retrasar el borrado de la tabla para que la animación se pueda ver.
    setTimeout(function (){
      padreTabla.empty();
      padreTabla = $("#table-header");
      padreTabla.empty();
    }, 150);
  }
}

// Funcion para mostrar u ocultar los datos S = Show (mostrar) / H = Hidden (ocultar).
function tableAnimate(evento = "S") {
  let headerTabla = $("#table-header th");
  let rowsTabla = $("#table-datos td");

  if (evento == "S") {
    headerTabla.slideDown(250);
    rowsTabla.slideDown(250);
  } else {
    headerTabla.slideUp(150);
    rowsTabla.slideUp(150);
  }
}

// Esta función anima todo el texto del Hero
function animateHero() {
  $(".hero-title").fadeIn(250, function () {
    $(".hero-p").slideDown(250);
    $("#empezar").fadeIn("fast");
  });
}

// Esta función centra la tabla en la pantalla.
function tableScroll() {
  $('html, body').animate({
    scrollTop: $("#table-header").offset().top
  }, 1500);
}

// Esta función es la implementación de lo que seria un evento AJAX JSON
function ajaxTest() {
  const URLGET = "http://hp-api.herokuapp.com/api/characters";

  $.getJSON(URLGET, function (respuesta, estado) {
    if(estado === "success"){
      let ajaxBox = $(".ajax-test-box");
      let personajes = respuesta;

      for (const personaje of personajes) {
        ajaxBox.append(`
        <div class="col-6 col-md-4 col-lg-3">
          <div>
            <div class="w-100">
              <img class="img-box" srcset="${personaje.image}">
            </div>
            <h4>${personaje.name}</h4>
            <h5>${personaje.house}</h5>
          </div>
        </div>`);
      }
    }
  });
}

export { mostrarDesglose, resetInput, crearSimulacion, visualizarSimulacion, borrarDatosTabla, validarInputs, animateHero, ajaxTest }
