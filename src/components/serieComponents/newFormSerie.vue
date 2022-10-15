<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="6">
          <v-text-field v-model="code" label="Codigo"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="name" label="Nombre"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="description"
            label="Descripción"
            rows="2"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            @click="$store.state.__modal_form_serie = false"
            color="error"
            >CANCELAR</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn block @click="_setSerie" color="success">GUARDAR</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "newFormSerie",
  data() {
    return {
      code: "",
      name: "",
      description: "",
    };
  },
  methods: {
    _getSerieTest() {
      let vm = this;
      vm.$store.state.__loadingGetSerieTest = true;
      var config = {
        method: "get",
        url:
          process.env.VUE_APP_URLBASE + "serie/list/" + vm.$route.params.idTest,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.itemsSerieTest = response.data.data;
          vm.$store.state.__loadingGetSerieTest = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    _setSerie() {
      let vm = this;
      var data = JSON.stringify({
        code: vm.code,
        name: vm.name,
        description: vm.description,
        id_test: vm.$route.params.idTest,
        status: 1,
      });

      var config = {
        method: "post",
        url: process.env.VUE_APP_URLBASE + "serie/save",
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
              title: "Serie registrada",
              showConfirmButton: false,
              timer: 1500,
            });
            vm._getSerieTest();
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
</style>