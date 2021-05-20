export const pageCotizacion = `
<!--DIV donde se muestre de AJAX-->
<div class="container cotizaciones hidden">
  <div class="row justify-content-center mt-4 mb-4">
    <h3 class="mt-4 mb-4 text-center"><span class="wrap-title-inside">Cotización del dolar</span></h3>
  </div>
  <div class="row animate hidden">
    <div class="preloader"></div>
  </div>

  <div class="mt-1 text-center">
    <table class="table table-hover">
      <thead class="thead-light" id="table-header-ajax">
      </thead>
      <tbody id="table-datos-ajax">
      </tbody>
    </table>
  </div>
</div>
`;