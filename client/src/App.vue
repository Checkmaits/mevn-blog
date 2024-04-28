<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    document.title = "MEVN Blog - Home";
  },
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
