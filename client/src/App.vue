<template>
  <header class="border-bottom">
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
      <div class="container">
        <span class="fw-bold navbar-brand">MEVN Store</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav ms-auto text-center">
            <li class="nav-item">
              <router-link :to="{ name: 'HomeView' }" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'ProductsView' }" class="nav-link">Products</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main class="mt-4">
    <div class="container">
      <router-view />
    </div>
  </main>
  <footer class="footer border-top">
    <div class="container text-center py-3">
      <p class="text-muted mb-0">
        Check out the code on <a href="https://github.com/Checkmaits/mevn-store" class="link-offset-3">GitHub</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.router-link-active {
  color: black;
}
</style>
