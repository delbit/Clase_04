/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: Clase 05
 * @resume: El siguiente script es un simulador de cuotas en el método francés, donde todas las cuotas son iguales.
 * Para este desafió, Se realiza el ordenamiento de un array de simulaciones, como se quiere solo probar el ordenamiento
 * se comento el ingreso de datos por promt y se crean valores estáticos.
 * El ordenamiento o sort se realiza a petición del usuario por las propiedades mas relevantes del objeto Cuotas,
 * Capital, Meses, Interés, Cuota.
 * Se modifica la función mostrar para que sea mas consistente al manejo de array
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
      alert("El monto solicitado de ser mayor a cero.");
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
      alert("Los meses deben estar comprendidos entre 1 y 60 meses.");
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
      alert("El numero ingresado debe estar comprendidos entre 1 y 250 %.");
    }
  }while (true);
}

// La función mostrar ahora tiene el capacidad de mostrar el array.
function mostrar(simulaciones) {

  for (let index = 0; index < simulaciones.length; index++) {
    console.log("La cuota de " + simulaciones[index].leerCapital + " a " + simulaciones[index].leerMeses + " meses y interés anual de " + simulaciones[index].leerInteres +  "% es de " + ((simulaciones[index].leerCuota).toFixed(2)));
  }
  console.log("-----------------");
}

//Se valida la cantidad se simulaciones que se usara para crear el Array
function validarCant() {
  do {
    let cantidad = parseInt(prompt("Por favor ingrese la cantidad de simulaciones a realizar entre 1 y 10"));
    if ((cantidad > 0) && (cantidad <= 10)) {
      return cantidad;
      break;
    }else {
      alert("El numero ingresado debe estar comprendidos entre 1 y 10.");
    }
  }while (true);
}

//Función de ordenamiento de array
function ordenamiento(simulaciones) {
  let ordenar;
  do {
    ordenar = prompt("Por que valor se realiza el Ordenamiento: [M]onto, Me[s], [I]nteres, [C]uotas");
    ordenar = ordenar.toLowerCase();
  }while (ordenar != "m" && ordenar != "i" && ordenar != "s" && ordenar != "c");

  switch (ordenar) {
    // caso de Monto o Capital
    case "m":
      simulaciones.sort(function (a, b) {
        if (a.leerCapital > b.leerCapital) {
          return 1;
        }
        if (a.leerCapital < b.leerCapital) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return simulaciones;
      break;

      //Caso para mes
      case "s":
      simulaciones.sort(function (a, b) {
        if (a.leerMeses > b.leerMeses) {
          return 1;
        }
        if (a.leerMeses < b.leerMeses) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return simulaciones;
      break;

      //Caso para Interes
      case "i":
      simulaciones.sort(function (a, b) {
        if (a.leerInteres > b.leerInteres) {
          return 1;
        }
        if (a.leerInteres < b.leerInteres) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return simulaciones;
      break;
  
      //Caso para cuota
      case "c":
      simulaciones.sort(function (a, b) {
        if (a.leerCuota > b.leerCuota) {
          return 1;
        }
        if (a.leerCuota < b.leerCuota) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return simulaciones;
      break;
  }
}

// Funcion principal

function  main(){

  // Creando el array
  const simulaciones = [];

  alert("El siguiente programa va a calcular las cuotas mensuales con el sistema de crédito Francés.");
  
  /* Omitiendo la entrada por usuario

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

*/
  const cuota1 = new Cuotas(4000, 20, 7);
  const cuota2 = new Cuotas(1400, 11, 18);
  const cuota3 = new Cuotas(3000, 10, 9);
  const cuota4 = new Cuotas(800, 2, 20);
  simulaciones.push(cuota1);
  simulaciones.push(cuota2);
  simulaciones.push(cuota3);
  simulaciones.push(cuota4);
  alert("Las simulaciones se visualizan por la consola");

  //Se muestra el array sin ordenar
  mostrar(simulaciones);
  
  // se reemplazan los items del array por el array ordenado devuelto por ordenamiento.
  simulaciones.splice(0, simulaciones.length, ...ordenamiento(simulaciones));

  //Se muestra el array ordenado según el criterio del usuario.
  mostrar(simulaciones);
}

// Inicio del programa

main();

// Fin programa
