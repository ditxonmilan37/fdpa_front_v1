<template>
  <div>
    <div>
      <v-img
        class="mx-auto"
        max-width="50%"
        src="../../../public/img/success.svg"
      ></v-img>

      <h1 class="text-center mt-5 text-h3">{{ title }}</h1>
      <p class="text-center mt-2 text-h5">{{ text }}</p>

      <!-- <div class="text-center">
        <v-btn color="success" rounded elevation="0" dark class="text-center"
          >OK</v-btn
        >
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "notifySucess",
  props: {
    title: "",
    text: "",
  },
};
</script>

<style lang="scss" scoped>
</style>