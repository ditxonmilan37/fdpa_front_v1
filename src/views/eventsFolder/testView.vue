<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12" md="3">
          <listEvents />
        </v-col>
        <v-col cols="12" md="9">
          <dataTableTestVue />
          <dataTableSerieVue v-if="$route.params.idTest" />
          <modalSelectTestVue />
          <modalFormNewEventsVue />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import listEvents from "@/components/eventsComponents/listEvents.vue";
import dataTableTestVue from "@/components/eventsComponents/dataTableTest.vue";
import modalSelectTestVue from "./modalSelectTest.vue";
import dataTableSerieVue from "@/components/serieComponents/dataTableSerie.vue";
import modalFormNewEventsVue from "../serieFolder/modalFormSerie.vue";
export default {
  name: "testView",
  components: {
    listEvents,
    dataTableTestVue,
    modalSelectTestVue,
    dataTableSerieVue,
    modalFormNewEventsVue,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.state._titleNavigation = "CONTROL DE PRUEBAS";
    this.$store.state._nameEventSelected = "";
    this.$store.state.itemsTestEvents = [];
    this.$store.state.itemsSerieTest = [];

    if (this.$route.params.active) {
      this.$store.state.__modal_select_test = true;
    }
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

.__list_main_event {
  background-color: #1b1e39 !important;
  border-radius: 15px !important;
}
</style>