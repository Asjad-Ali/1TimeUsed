<template>
  <footer class="text-muted">
    <!-- Section: Links  -->

    <div class="container flex justify-center">
      <!-- Grid row -->
      <div class="row">
        <!-- Grid column -->
        <div class="col-3 mx-auto">
          <!-- Content -->
          <h6 class="text-uppercase fw-bold">
            <div class="q-mr-xl">
              <img
                src="https://1timeused.com/assets/img/logo/logo.png"
                style="width: 180px; padding: 5px"
              />
            </div>
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-3 mx-auto">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold">Products</h6>
          <p>
            <a href="#" class="text-reset">Angular</a>
          </p>
          <p>
            <a href="#" class="text-reset">React</a>
          </p>
          <p>
            <a href="#" class="text-reset">Vue</a>
          </p>
          <p>
            <a href="#" class="text-reset">Laravel</a>
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-3 mx-auto">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold">Useful links</h6>
          <p>
            <a href="#" class="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#" class="text-reset">Settings</a>
          </p>
          <p>
            <a href="#" class="text-reset">Orders</a>
          </p>
          <p>
            <a href="#" class="text-reset">Help</a>
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-3 mx-auto mb-md-0">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold">Contact</h6>
          <p><q-icon name="home" /> New York, NY 10012, US</p>
          <p>
            <q-icon name="email" />
            info@example.com
          </p>
          <p><q-icon name="call" />+ 01 234 567 88</p>
          <p><q-icon name="print" /> + 01 234 567 89</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>

    <!-- Section: Links  -->

    <!-- Copyright -->
    <div
      class="text-center copy-right"
      style="background-color: rgba(0, 0, 0, 0.05)"
    >
      © 2021 Copyright:
      <a class="text-reset fw-bold" href="#">1timeused.com</a>
    </div>
    <!-- Copyright -->
  </footer>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
footer {
  background: #eceff1;
  background-image: url(../../../public/images/footer-bg.png);

  h6 {
    margin: 20px 0;
  }
  a {
    text-decoration: none;
    color: #545c64;
  }
  p {
    color: #545c64;
  }
  .copy-right {
    padding: 15px;
  }
}
</style>
