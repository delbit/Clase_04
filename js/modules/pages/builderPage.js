// Import de la paginas necesrias.
import { pageSimulador } from "./simulador.js";
import { pageCotizacion } from "./cotizacion.js";
import { pageInteres } from "./interes.js";

export function builderPage() {
  let pages = [pageSimulador, pageCotizacion, pageInteres];
  let wrapper = $("#wrapper");

  for (const page of pages) {
    wrapper.append(page);
  }
}
