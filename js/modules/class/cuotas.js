/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 08/05/2021
 * @desafió: 3era entrega Proyecto
 * @resume:
 * Clase a usar en el simulador de Crédito  francés.
 * Se modifico el constructor para hacerlo consistente con el Orden de los Input del HTML
 * Se adiciona una nueva propiedad a la clase para tener el detalle de cada cuota mensual.
 * Para esa propiedad se crea la función necesaria que realiza los cálculos necesarios del sistema francés
 * */

// Import de la class
import { Desglose } from "./desglose.js";
// Class
export class Cuotas {
  constructor(capital, interes, meses) {
    this.capital = capital;
    this.meses = meses;
    this.interes = interes;
    this.interesMensual;
    this.factor;
    this.cuota;
    this.actualizarCuota();
    this.desgloseCuotas = this.desgloseFrances();
  }

  // SET y GET para cambiar o mostrar los atributos de la clase
  set cambiarCapital(nuevoCapital) {
    this.capital = nuevoCapital;
    this.actualizarCuota();
    this.desgloseCuotas = this.desgloseFrances();
  }

  set cambiarMeses(nuevoMeses) {
    this.meses = nuevoMeses;
    this.actualizarCuota();
    this.desgloseCuotas = this.desgloseFrances();
  }

  set cambiarInteres(nuevoInteres) {
    this.interes = nuevoInteres;
    this.actualizarCuota();
    this.desgloseCuotas = this.desgloseFrances();
  }

  get leerCapital() {
    return this.capital;
  }

  get leerMeses() {
    return this.meses;
  }

  get leerInteres() {
    return this.interes;
  }

  get leerInteresMensual() {
    return this.interesMensual;
  }

  get leerCuota() {
    return this.cuota;
  }

  get leerDesgloseCuotas() {
    return this.desgloseCuotas;
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

  // Realiza el calculo de cada una de las cuotas del Sistema Frances.
  desgloseFrances() {
    let desgloseArray = [];
    let capitalPendiente = this.capital;
    let interesMensual = this.interesMensual;
    let cuota = this.cuota;

    for (let index = 1; index <= this.meses; index++) {
      let interesMes = capitalPendiente * interesMensual;
      let amortizado = cuota - interesMes;
      const desgloseMes = new Desglose(capitalPendiente, amortizado,interesMes,index)
      capitalPendiente -= amortizado;
      desgloseArray.push(desgloseMes);
    }
    return (desgloseArray);
  }
}
