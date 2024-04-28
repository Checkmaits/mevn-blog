<template>
  <div class="login__wrapper">
    <div class="login__container card card-body p-4">
      <header class="text-center">
        <h1 class="fw-bold">Login</h1>
        <p class="mb-0">Login to your account to continue</p>
      </header>
      <main class="mt-4">
        <div v-if="loading" class="text-center">
          <div class="spinner spinner-border text-primary"></div>
        </div>
        <form v-else @submit.prevent="handleSubmit()">
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <div v-else-if="success" class="alert alert-success">{{ success }}</div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="text" v-model="email" class="form-control" required placeholder="xyz@mail.com" />
          </div>
          <div class="form-group mt-2">
            <label>Password</label>
            <input type="password" v-model="password" class="form-control" required placeholder="********" />
          </div>
          <button type="submit" class="btn btn-outline-primary w-100 mt-3">Login</button>
        </form>
      </main>
      <footer class="mt-4 text-center">
        <p class="mb-0">
          Don't have an account? <router-link to="/register" class="link-offset-3">Register here</router-link>
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      success: "",
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.error = ""; // reset error

      const request = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      const response = await request.json();
      if (!request.ok) {
        this.error = response.error;
        return;
      }

      localStorage.clear();
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("token", response.data.token);
      this.success = "User signed in. Redirecting...";
      setTimeout(() => {
        this.$router.push({ name: "HomeView" });
      }, 3000);
    },
  },
};
</script>

<style scoped>
.login__wrapper {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}

.login__container {
  width: 500px;
}

@media screen and (max-width: 768px) {
  .login__wrapper {
    padding: 10px;
  }

  .login__container {
    width: 100%;
  }
}
</style>
