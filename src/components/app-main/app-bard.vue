<template>
  <div>
    <v-app-bar app class="__app_bar_main">
      <v-app-bar-nav-icon
        dark
        @click="$store.state.__drawer = !$store.state.__drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title v-if="!onDevice">{{
        $store.state._titleNavigation
      }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        @click="changeMode()"
        :color="$store.state.mode_juez == 0 ? 'default' : 'success'"
        >MODO JUEZ</v-btn
      >
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "app-bar-comp",
  data() {
    return {
      onDevice: false,
    };
  },
  mounted() {
    this.modoDevice();
  },
  methods: {
    modoDevice() {
      if (screen.width < 800) {
        this.onDevice = true;
      } else {
        this.onDevice = false;
      }
    },
    changeMode() {
      this.$store.state.mode_juez = !this.$store.state.mode_juez;
      if (this.$store.state.mode_juez == true) {
        this.$store.state.__drawer = false;
      } else {
        if (this.$store.state.mode_juez == false) {
          this.$store.state.__drawer = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.__app_bar_main {
  background-color: #15182f !important;
  color: white !important;
  box-shadow: none !important;
}
</style>