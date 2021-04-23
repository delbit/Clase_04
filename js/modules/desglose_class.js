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