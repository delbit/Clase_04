/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 30/03/2021
 * @desafio: Clase 05
 * @resume: El siguiente script es un simulador de cuotas en el método francés, donde todas las cuotas son iguales.
 * Para este desafió, se parte de la base del desafió anterior, 
 * aca se agrega el concepto de array, pidiéndole al usuario cuantas simulaciones de crédito quiere realizar.
 * */


// Class
class Cuotas {
  constructor(capital, meses, interes) {
    this.capital = capital;
    this.meses = meses;
    this.interes = interes;
    this.interesMensual;
    this.factor;
    this.cuota;
    this.actualizarCuota();
  }

  // SET y GET para cambiar o mostrar los atributos de la clase
  set cambiarCapital(nuevoCapital){
    this.capital = nuevoCapital;
    this.actualizarCuota();
  }

  set cambiarMeses(nuevoMeses){
    this.meses = nuevoMeses;
    this.actualizarCuota();
  }

  set cambiarInteres(nuevoInteres){
    this.interes = nuevoInteres;
    this.actualizarCuota();
  }

  get leerCapital(){
    return this.capital;
  }

  get leerMeses(){
    return this.meses;
  }

  get leerInteres(){
    return this.interes;
  }

  get leerInteresMensual(){
    return this.interesMensual;
  }

  get leerCuota(){
    return this.cuota;
  }

  // Funciones propias para el calculo de la cuota
  actualizarCuota () {
    this.interesMensual = this.interes / 1200; // actualiza el interes mensual
    this.factorFunc(); // actualiza el factor
    this.cuotaFunc(); // actualiza la cuota mensual
  }

  factorFunc() {
    this.factor = (Math.pow(this.interesMensual + 1,this.meses));
  }
  
  cuotaFunc() {
    this.cuota = (this.capital * this.interesMensual * this.factor / (this.factor - 1));
  }
  
}

// Funciones

//valida el capital
function ingresoCapital() {
  do {
    let capital = parseInt(prompt("Por favor ingresa el monto a solicitar"));
    if (capital > 0) {
      return capital;
      break;
    } else {
      alert("El monto solicitado de ser mayor a cero.")
    }
  }while (true);
    
}

//valida los Meses
function ingresoMeses() {
  do {
    let meses = parseInt(prompt("Por favor ingrese el plazo en meses entre 1 y 60 meses"));
    if ((meses > 0) && (meses <= 60)) {
      return meses;
      break;
    }else {
      alert("Los meses deben estar comprendidos entre 1 y 60 meses.")
    }
  }while (true);
    
}

//valida el Interes
function ingresoInteres() {
  do {
    let interes = parseInt(prompt("Por favor ingrese el interés anual debe estar entre 1 y 250"));
    if ((interes > 0) && (interes <= 250)) {
      return interes;
      break;
    }else {
      alert("El numero ingresado debe estar comprendidos entre 1 y 250 %.")
    }
  }while (true);
    
}

// se modifica la funcion para que la salida de datos sea mas rapida.
function mostrar(cuota) {
  console.log("La cuota de " + cuota.leerCapital + " a " + cuota.leerMeses + " meses y interés anual de " + cuota.leerInteres +  "% es de " + ((cuota.leerCuota).toFixed(2)));
}

//Se valida la cantidad se simulaciones que se usara para crear el Array
function validarCant() {
  do {
    let cantidad = parseInt(prompt("Por favor ingrese la cantidad de simulaciones a realizar entre 1 y 10"));
    if ((cantidad > 0) && (cantidad <= 10)) {
      return cantidad;
      break;
    }else {
      alert("El numero ingresado debe estar comprendidos entre 1 y 10.")
    }
  }while (true);
  
}

// Funcion principal

function  main(){

  // Creando el array
  const simulaciones = [];

  alert("El siguiente programa va a calcular las cuotas mensuales con el sistema de crédito Francés.");
  let cantidad = validarCant();

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

  alert("Las simulaciones se visualizan por la consola")
  for (let index = 0; index < simulaciones.length; index++) {
    mostrar(simulaciones[index]);
  }  

}

// Inicio del programa

main();

// Fin programa
