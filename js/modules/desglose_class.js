/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 22/04/2021
 * @desafió: 2da entrega Proyecto
 * @resume:
 * Clase complementaria para el detalle de la cuota simulador de Crédito  francés.
 * Los calculos estan en la clase de cuotas quien se encarga de crear cada elemento necesario
 * */
export class Desglose {
  constructor(capitalPendiente, amortizado, interesMes, mes) {
    this.capitalPendiente = capitalPendiente;
    this.amortizado = amortizado;
    this.interesMes = interesMes;
    this.mes = mes;
  }
  get leerCapitalPendiente(){
    return this.capitalPendiente;
  }

  get leerAmortizado(){
    return this.amortizado;
  }

  get leerInteresMes(){
    return this.interesMes;
  }

  get leerMes(){
    return this.mes;
  }
}
