<template>
  <div class="container">
    <h1 class="fw-bold">Hello, {{ user.username }}</h1>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = this.$route.params.user;
  },
};
</script>

<style scoped></style>
