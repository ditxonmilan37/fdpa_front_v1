<template>
  <v-app id="inspire">
    <navigationDrawerVue />

    <appbard />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import appbard from "@/components/app-main/app-bard.vue";
import navigationDrawerVue from "./components/app-main/navigation-drawer.vue";

export default {
  name: "App",
  components: {
    appbard,
    navigationDrawerVue,
  },
  data: () => ({}),
};
</script>

<style lang="scss">
* {
  font-family: "Roboto";
}

.v-main {
  background-color: #1b1e39 !important;
  color: white !important;
}

.v-main__wrap {
  padding: 20px;

  @media (max-width: 800px) {
    padding: 5px;
  }
}
</style>
