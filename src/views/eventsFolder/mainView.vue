<template>
  <div>
    <div>
      <v-toolbar class="__toolbar_main" dark flat>
        <v-toolbar-title>
          <h3>EVENTOS 2023</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="$store.state.__searchEvent"
          label="Buscar evento"
          class="mr-5"
        ></v-text-field>
        <v-btn
          color="success"
          @click="$store.state.__modal_new_events = true"
          small
          rounded
          dark
          elevation="0"
          >NUEVO EVENTO</v-btn
        >
      </v-toolbar>
    </div>

    <div>
      <dataTableEventsVue />
    </div>

    <modalFormNewEventsVue />
  </div>
</template>

<script>
import dataTableEventsVue from "@/components/eventsComponents/dataTableEvents.vue";
import modalFormNewEventsVue from "./modalFormNewEvents.vue";
export default {
  name: "mainView",
  components: {
    dataTableEventsVue,
    modalFormNewEventsVue,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.state._titleNavigation = "EVENTOS";
  },
  methods: {
    name() {},
  },
};
</script>

<style lang="scss" scoped>
.__toolbar_main {
  background-color: #1b1e39 !important;
}
</style>
