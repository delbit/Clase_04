/*
 * Script
 * @author: David Eloy Lucena Rey
 * @date: 20/05/2021
 * @desafió: Proyecto Final
 * @resume: Modulo HTML perteneciente al calculo del interés compuesto.
 * */

export const pageInteres = `
<!--DIV donde se muestre el Interés compuesto-->
<div class="wrap-interes hidden">
  <div class="container mt-4 mb-4 col-12 col-md-8 col-lg-6 col-xl-4">
    <div class="row justify-content-center mt-4 mb-4">
      <h3 class="mt-4 mb-4 text-center"><span class="wrap-title-inside">Calculador de Interés Compuesto</span></h3>
    </div>

    <form id="form-interes">
      <div class="input-group mb-3">
        <div class="col-12 col-md-4 p-0">
          <div class="input-group-prepend">
            <span class="input-group-text w-100">Capital Inicial</span>
          </div>
        </div>
        <div class="col-12 col-md-8 p-0">
          <input type="text" class="form-control" id="form-interes-capital" placeholder="Ingrese el Capital" aria-label="Capital">
          <div class="help w-100"><div class="help-bagde w-100"></div></div>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="col-12 col-md-4 p-0">
          <div class="input-group-prepend">
            <span class="input-group-text w-100">Interés Anual</span>
          </div>
        </div>
        <div class="col-12 col-md-8 p-0">
          <input type="text" class="form-control" id="form-interes-interes"placeholder="Ingrese el Interés Anual" aria-label="Interés">
          <div class="help w-100"><div class="help-bagde w-100"></div></div>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="col-12 col-md-4 p-0">
          <div class="input-group-prepend">
            <span class="input-group-text w-100" id="basic-addon1">Tiempo en Meses</span>
          </div>
        </div>
        <div class="col-12 col-md-8 p-0">
          <input type="text" class="form-control" id="form-interes-meses" placeholder="Ingrese los Meses" aria-label="Meses">
          <div class="help w-100"><div class="help-bagde w-100"></div></div>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="col-12 col-md-4 p-0">
          <div class="input-group-prepend">
            <label class="input-group-text w-100 " for="inputGroupSelect01">Frecuencia de Pago</label>
          </div>
        </div>
        <div class="col-12 col-md-8 p-0">
          <select class="custom-select" id="form-interes-periodo">
            <option value="1">Anual</option>
            <option value="2">Semestral</option>
            <option value="4">Trimestral</option>
            <option value="6">Bimestral</option>
            <option value="12">Mensual</option>
          </select>
          <div class="help w-100"><div class="help-bagde w-100"></div></div>
        </div>
      </div>
      <!--DIV donde se muestre los resultados compuesto-->

      <div class="input-group mb-3">
        <div class="input-group-prepend col-12 col-md-4 p-0">
          <span class="input-group-text w-100">Interés Ganados</span>
        </div>
        <div class="col-12 col-md-8 p-0">
          <input type="text" class="form-control font-weight-bolder text-success" id="form-interes-interes-ganado" disabled="" placeholder="Los interés ganados en el tiempo" aria-label="CApital">
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend col-12 col-md-4 p-0">
          <span class="input-group-text w-100">Capital Futuro</span>
        </div>
        <div class="col-12 col-md-8 p-0">
          <input type="text" class="form-control font-weight-bolder text-success" id="form-interes-capital-ganado" disabled="" placeholder="El capital al concluir el tiempo" aria-label="CApital">
        </div>
      </div>

      <div class="row text-center">
        <div class="col-md"></div>
        <div class="col-6 col-md-4 col-lg-3 text-center">
          <button type="submit" class="btn btn-success">Calcular</button>
        </div>
        <div class="col-6 col-md-4 col-lg-3 text-center">
          <button type="button" id="form-interes-reset" class="btn btn-info">Limpiar</button>
        </div>
        <div class="col-md"></div>
      </div>

    </form>

  </div>
</div>
`;