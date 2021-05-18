export const pageSimulador = `
<div class="calculador hidden">

  <form id="form-simular">
    <div class="container mt-3">
      <div class="row justify-content-center mt-4 mb-4">
        <h3 class="mt-4 mb-4 text-center"><span class="wrap-title-inside">Simulador de Crédito Francés</span></h3>
      </div>

      <div class="row">
        <div class="col-12 col-md-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">$</span>
            </div>
            <input type="number" class="form-control" id="capital" placeholder="Monto a Solicitar" aria-label="Monto">
            <div class="help w-100"><div class="help-bagde w-100"></div></div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">%</span>
            </div>
            <input type="number" class="form-control" id="interes" placeholder="Interés Anual" aria-label="Interés">
            <div class="help w-100"><div class="help-bagde w-100"></div></div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">#</span>
            </div>
            <input type="number" class="form-control" id="meses" placeholder="Cantidad de Cuotas" aria-label="Meses">
            <div class="help w-100"><div class="help-bagde w-100"></div></div>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md"></div>
        <div class="col-4 col-md-3 col-lg-2 text-center">
          <button type="submit" class="btn btn-success">Simular Crédito</button>
        </div>
        <div class="col-4 col-md-3 col-lg-2 text-center">
          <button type="button" id="detalle" class="btn btn-primary">Mostrar Detalle</button>
        </div>
        <div class="col-4 col-md-3 col-lg-2 text-center">
          <button type="button" id="reset" class="btn btn-info">Limpiar Datos</button>
        </div>
        <div class="col-md"></div>
      </div>
    </div>
  </form>

  <!--Esta es la tabla que recibe los datos de la simulación-->
  <div class="container mt-3">
    <div class="row">
      <table class="table">
        <thead id="table-header">
        </thead>
        <tbody id="table-datos">
        </tbody>
      </table>
    </div>
  </div>

</div>
`;