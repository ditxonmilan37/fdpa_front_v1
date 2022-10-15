<template>
  <div>
    <v-dialog
      persistent
      max-width="900"
      v-model="$store.state.__modal_select_test"
    >
      <v-card class="__card_main" dark small>
        <v-card-title>
          <h4>SELECCIONAR LAS PRUEBAS A REGISTRAR</h4>
          <v-spacer></v-spacer>
          <v-switch
            label="Pruebas de campo"
            color="success"
            @change="_getListTest()"
            v-model="$store.state.value_type_test"
          ></v-switch>
        </v-card-title>
        <v-card-text>
          <dataListTestVue />
        </v-card-text>
        <v-card-actions>
          <v-btn color="orange">ADICIONAL NUEVA PRUEBA</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="$store.state.__modal_select_test = false"
            elevation="0"
            >Cerrar</v-btn
          >
          <v-btn
            color="success"
            v-if="
              $store.state.__id_test_category != '' &&
              $store.state.__id_test_time != '' &&
              $store.state.__id_test_turn != '' &&
              $store.state.__id_test_gender != ''
            "
            @click="_setTest()"
            elevation="0"
            >Guardar Pruebas</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="modalAdd"
      scrollable
      persistent
      max-width="600"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> ADICIONAL NUEVA PRUEBA </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row dense>
              <v-col cols="12" md="6"> </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import dataListTestVue from "@/components/eventsComponents/dataListTest.vue";
export default {
  name: "modalSelectTest",
  components: {
    dataListTestVue,
  },
  data() {
    return {};
  },
  methods: {
    _getTestEvents() {
      let vm = this;
      vm.$store.state.__loadingGetEvents = true;
      var config = {
        method: "get",
        url:
          process.env.VUE_APP_URLBASE +
          "datatest/listAll/" +
          vm.$route.params.idEvent,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.itemsTestEvents = response.data.data;
          vm.$store.state.__loadingGetEvents = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    _getListTest() {
      let vm = this;
      let valueType = null;

      if (vm.$store.state.value_type_test == 0) {
        valueType = 1;
      } else if (vm.$store.state.value_type_test == 1) {
        valueType = 4;
      }

      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "test/listAll/" + valueType,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.itemsListTest = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    _setTest() {
      let vm = this;
      var data = JSON.stringify({
        idEvent: vm.$route.params.idEvent,
        idCategory: vm.$store.state.__id_test_category,
        idTime: vm.$store.state.__id_test_time,
        idTurn: vm.$store.state.__id_test_turn,
        idGender: vm.$store.state.__id_test_gender,
        listTest: vm.$store.state.__test_selected,
      });

      var config = {
        method: "post",
        url: process.env.VUE_APP_URLBASE + "test/save",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.statusBol == true) {
            vm.$swal({
              position: "top-end",
              icon: "success",
              title: "Pruebas registradas",
              showConfirmButton: false,
              timer: 1500,
            });
            vm._getTestEvents();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.__card_main {
  background-color: #15182f;
}
</style>