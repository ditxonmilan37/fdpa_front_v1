<template>
  <div>
    <v-data-table
      :loading="$store.state.__loadingGetSerieTest"
      dark
      :search="$store.state.__searchEvent"
      :headers="headersSerie"
      :items="$store.state.itemsSerieTest"
      :items-per-page="5"
      class="elevation-0 __data_table_main mt-2"
    >
      <template v-slot:top>
        <v-toolbar class="__data_table_main" elevation="0">
          <v-toolbar-title
            ><h4 color="#b9bab8">LISTA DE SERIES</h4></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn
            v-if="!$store.state.mode_juez"
            color="pink"
            small
            rounded
            @click="$store.state.__modal_form_serie = true"
          >
            Agregar Serie
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.flag`]="{ item }">
        <v-avatar size="24">
          <v-img width="30" :src="item.flag"></v-img>
        </v-avatar>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip v-if="item.status == 1" small color="success" dark>
          Activo
        </v-chip>
        <v-chip v-if="item.status == 0" small color="error" dark>
          Inactivo
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          v-if="!$store.state.mode_juez"
          rounded
          small
          @click="__openUploadFile(item.id)"
          color="info"
          >{{
            $route.params.idTypeTest == 4 ? "CARGAR ATLETA" : "ARCHIVO LIF"
          }}</v-btn
        >

        <v-btn
          v-if="$store.state.mode_juez"
          rounded
          small
          @click="__openUploadFile(item.id)"
          color="info"
          >SUBIR RESULTADOS</v-btn
        >

        <v-btn
          v-if="!$store.state.mode_juez"
          fab
          class="ml-5 orange"
          @click="openEdit(item)"
          x-small
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
      </template>
    </v-data-table>

    <v-dialog
      v-model="modalEdit"
      scrollable
      persistent
      max-width="500"
      transition="dialog-transition"
    >
      <v-card dark class="__data_table_main">
        <v-card-title>MODIFICAR SERIE </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row dense>
              <v-col cols="6">
                <v-text-field v-model="code" label="Codigo"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="name" label="Nombre"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  v-model="description"
                  label="Descripción"
                  rows="1"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="id_status"
                  :items="itemsStatus"
                  item-text="name"
                  item-value="id"
                  label="Estado"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="modalEdit = false">CANCELAR</v-btn>
          <v-btn @click="_putSerie()" color="success">GUARDAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { timingSafeEqual } from "crypto";
export default {
  name: "dataTableSerie",
  data() {
    return {
      headersSerie: [
        {
          text: "Codigo",
          align: "start",
          sortable: false,
          value: "code",
        },
        { text: "Nombre", value: "name" },
        {
          text: "Descripción",
          value: "description",
        },
        { text: "Estado", value: "status" },
        { text: "Acción", value: "action" },
      ],
      itemsStatus: [
        { id: 1, name: "Activo" },
        { id: 0, name: "Inactivo" },
      ],
      modalEdit: false,
      id_status: null,
      code: "",
      name: "",
      description: "",
      id_selected: "",
    };
  },
  mounted() {
    this._getSerieTest();
  },
  methods: {
    openEdit(item) {
      this.code = item.code;
      this.name = item.name;
      this.description = item.description;
      this.id_status = item.status;
      this.id_selected = item.id;
      this.modalEdit = true;
    },
    _putSerie() {
      let vm = this;
      var data = JSON.stringify({
        code: vm.code,
        name: vm.name,
        description: vm.description,
        id_test: vm.$route.params.idTest,
        status: vm.id_status,
      });

      var config = {
        method: "put",
        url: process.env.VUE_APP_URLBASE + "serie/update/" + vm.id_selected,
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
              title: "Serie actualizada",
              showConfirmButton: false,
              timer: 1500,
            });
            vm._getSerieTest();
            vm.modalEdit = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    __openUploadFile(selected) {
      this.$store.state.__modal_test_upload_file = true;
      this.$store.state.idSerieSelected = selected;
    },
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
      vm.$store.state.__loadingGetSerieTest = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.__data_table_main {
  background-color: #15182f !important;
  border-radius: 15px;
}

.__data_toolbar_main {
  background-color: #0b0d20 !important;
  border-radius: 15px 15px 0px 0px;
}
</style>
