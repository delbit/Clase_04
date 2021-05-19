// Import de la paginas necesarias.
import { pageSimulador } from "./simulador.js";
import { pageCotizacion } from "./cotizacion.js";
import { pageInteres } from "./interes.js";

/**
 * Se agregan los nodos de cada pagina al DOM
 */
export function builderPage() {
  let pages = [pageSimulador, pageCotizacion, pageInteres];
  let wrapper = $("#wrapper");

  for (const page of pages) {
    wrapper.append(page);
  }
}
