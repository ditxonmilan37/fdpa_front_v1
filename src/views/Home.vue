<template>
  <div>
    <h1>Bienvenido</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    this.$store.state._titleNavigation = "INICIO";
  },
  data: () => ({}),
};
</script>