/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 30/03/2021
 * @resume: El siguiente script es un simulador de cuotas en el método francés, donde todas las cuotas son iguales.
 * para este desafió se agregaron 3 nuevas funciones, se realizaron funciones especificas en para complementar la función calculoCuota
 * y se llevo todo a una función el código necesario a na función llamada main.
 * por lo tanto main se encarga de llamar a las demás funciones.
 * */

// Funciones

function ingresoCapital() {
  do {
    let capital = parseInt(prompt("Por favor ingresa Monto a Solicitar"));
    if (capital > 0) {
      return capital;
      break;
    } else {
      alert("El monto solicitado de ser mayor a cero.")
    }
  }while (true);
    
}
 
function ingresoMeses() {
  do {
    let meses = parseInt(prompt("Por favor ingrese el plazo en meses"));
    if ((meses > 0) && (meses <= 60)) {
      return meses;
      break;
    }else {
      alert("Los meses deben estar comprendidos entre 1 y 60 meses.")
    }
  }while (true);
    
}

function ingresoInteres() {
  do {
    let interes = parseInt(prompt("Por favor ingrese el interés anual"));
    if ((interes > 0) && (interes <= 250)) {
      return interes;
      break;
    }else {
      alert("El deben estar comprendidos entre 1 y 250 %.")
    }
  }while (true);
    
}

function factorFunc(interesMensual, meses) {
  return (Math.pow(interesMensual + 1,meses));
}

function cuotaFunc(capital, interesMensual, factor) {
  return (capital * interesMensual * factor / (factor - 1));
}

function calculoCuota(capital, meses, interes) {
  let interesMensual = interes / 1200;
  let factor = factorFunc(interesMensual,meses);
  return cuotaFunc(capital, interesMensual, factor);
}

// Funcion principal

function  main(){
  let capital = ingresoCapital();
  let meses = ingresoMeses();
  let interes = ingresoInteres();

  let cuota = calculoCuota(capital, meses, interes);

  alert ("La cuota de " + capital + " a " + meses + " meses y interés anual de " + interes +  "% es de " + (cuota.toFixed(2)));
}

// Inicio del programa

main();

// Fin programa
