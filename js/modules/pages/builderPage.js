/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 20/05/2021
 * @desafió: Proyecto Final
 * @resume: Para realizar la pagina lo mas similar a SPA se dividieron los distintas
 * ventanas de HTML individuales e insertando su HTML directo al DOM.
 * */

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
