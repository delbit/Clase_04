/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 20/05/2021
 * @desafió: Proyecto Final
 * @resume: Definición del Objeto para interés compuesto.
 * */

export class InteresComp {
  constructor(capital, interes, meses, tipoPeriodo) {
    this.capital = capital;
    this.meses = meses;
    this.tiempo = this.meses / 12;
    this.interes = interes;
    this.tipoPeriodo = tipoPeriodo;
    this.factor = this.calculoFactor();
    this.capitalFinal = this.capital * this.factor;
    this.interesCompuesto = this.capitalFinal - this.capital;
  }

  calculoFactor() {
    let parcial = (1 + (this.interes / (100 * this.tipoPeriodo)))
    let tiempoPeriodo = this.tiempo * this.tipoPeriodo;

    return (Math.pow(parcial, tiempoPeriodo))
  }

}