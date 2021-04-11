/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: 1era entrega Proyecto
 * @resume: La lógica del programa de Simulación.
 * Aca se encuentran toda la lógica para que el programa funciones, metodos y funciones necesarias.
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
