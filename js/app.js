/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 30/03/2021
 * @desafio: Clase 05
 * @resume: El siguiente script es un simulador de cuotas en el método francés, donde todas las cuotas son iguales.
 * Para este desafió, se parte de la base del desafió anterior realizando un completo ing para usar todo con Objetos, 
 * se mantienen alguna funciones de validaciones para asegurar que los método de la clase funcionen correctamente.
 * Se crearon los métodos GET y SET que se encargan de devolver los valores y asignar los nuevo de ser necesarios.
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
      alert("El deben estar comprendidos entre 1 y 250 %.")
    }
  }while (true);
    
}

function mostrar(cuota) {
  alert("La cuota de " + cuota.leerCapital + " a " + cuota.leerMeses + " meses y interés anual de " + cuota.leerInteres +  "% es de " + ((cuota.leerCuota).toFixed(2)));
}
// Funcion principal

function  main(){

  alert("El siguiente programa va a calcular las cuotas mensuales con el sistema de crédito Francés.");
  // Creando los valores para el nuevo Objeto
  let capital = ingresoCapital();
  let meses = ingresoMeses();
  let interes = ingresoInteres();

  // Se crea el objeto del tipo Cuotas con los valores.
  const cuota = new Cuotas(capital, meses, interes);
  mostrar(cuota);

  // Validando el metodo de cambiar capital
  capital = ingresoCapital();
  cuota.cambiarCapital = capital;
  mostrar(cuota);

  // Validando el metodo de cambiar meses
  meses = ingresoMeses();
  cuota.cambiarMeses = meses;
  mostrar(cuota);
  
  // Validando el metodo de cambiar Interes
  interes = ingresoInteres();
  cuota.cambiarInteres = interes;
  mostrar(cuota);

}

// Inicio del programa

main();

// Fin programa
