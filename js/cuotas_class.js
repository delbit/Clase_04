/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 09/04/2021
 * @desafio: 1era entrega Proyecto
 * @resume: Separando las clase de toda la logica del programas.
 * Se crea la clase a usar el simulador de Credito  frances.
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