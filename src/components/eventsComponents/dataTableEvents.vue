<template>
  <div>
    <v-data-table
      :loading="$store.state.__loadingGetEvents"
      dark
      :search="$store.state.__searchEvent"
      :headers="headersEvents"
      :items="$store.state.itemsEvents"
      :items-per-page="5"
      class="elevation-0 __data_table_main mt-2"
    >
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
        <v-btn fab x-small color="orange" @click="__editEvent(item)"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
      </template>
    </v-data-table>

    <v-dialog max-width="600" v-model="modalEdit">
      <v-card dark class="__data_table_main">
        <v-card-title> MODIFICAR EVENTO </v-card-title>
        <v-container fluid>
          <v-row dense>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="name"
                clearable
                filled
                dense
                label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                v-model="dialogDate_begin"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    clearable
                    v-model="date_begin"
                    label="Fecha de Inicio"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    filled
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_begin"
                  @input="dialogDate_begin = false"
                  locale="pe-ES"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                v-model="dialogDate_end"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    clearable
                    v-model="date_end"
                    label="Fecha de Cierre"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    filled
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_end"
                  @input="dialogDate_end = false"
                  locale="pe-ES"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="location"
                clearable
                filled
                dense
                label="Locación"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                :items="itemsPais"
                v-model="id_pais"
                item-text="name"
                item-value="id"
                clearable
                filled
                dense
                label="Pais"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                :items="itemsOrganizers"
                v-model="id_organizer"
                item-text="name"
                item-value="id"
                clearable
                filled
                dense
                label="Organizador"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                :items="itemsInspectors"
                v-model="id_inspector"
                item-text="name"
                item-value="id"
                clearable
                filled
                dense
                label="Fiscalizador"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="12">
              <v-autocomplete
                :items="itemsStatus"
                v-model="id_status"
                item-text="name"
                item-value="id"
                clearable
                filled
                dense
                label="Estado"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn block color="red" @click="__close()">CANCELAR</v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="_setEvent" block color="success"
                >GUARDAR EVENTO</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

import modalFormNewEventsVue from "@/views/eventsFolder/modalFormNewEvents.vue";
export default {
  name: "dataTableEvents",
  components: {
    modalFormNewEventsVue,
  },
  data() {
    return {
      modalEdit: false,
      headersEvents: [
        {
          text: "Codigo",
          align: "start",
          sortable: false,
          value: "code",
        },
        { text: "Nombre", value: "name" },
        {
          text: "Fecha de Incio",
          value: "date_time_begin_string",
        },
        { text: "Fecha de Cierre", value: "date_time_end_string" },
        { text: "Locación", value: "location" },
        { text: "Bandera", value: "flag" },
        { text: "País", value: "name_pais" },
        { text: "Organizador", value: "name_organizer" },
        { text: "Fiscalizador", value: "name_inspector" },
        { text: "Estado", value: "status" },
        { text: "Acción", value: "action" },
      ],
      itemsEventsEdit: [],
      itemsStatus: [
        { id: 1, name: "Activo" },
        { id: 0, name: "Inactivo" },
      ],

      name: "",
      date_begin: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date_end: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dialogDate_begin: false,
      dialogDate_end: false,
      location: "",
      id_pais: 1,
      id_organizer: "",
      id_inspector: "",
      id_selected: "",

      id_status: null,
      itemsPais: [],
      itemsOrganizers: [],
      itemsInspectors: [],

      dataSuccess: false,

      insertId: null,
    };
  },
  mounted() {
    this._getInspectors();
    this._getOrganizers();
    this._getPais();
    this._getEvents();
  },

  methods: {
    __close() {
      this.modalEdit = false;
    },
    _getPais() {
      let vm = this;
      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "pais/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsPais = response.data.data;
          vm.id_pais = 1;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getOrganizers() {
      let vm = this;
      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "organizers/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsOrganizers = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    _getInspectors() {
      let vm = this;
      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "inspectors/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.itemsInspectors = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    _setEvent() {
      let vm = this;
      var data = JSON.stringify({
        code: 3,
        name: vm.name,
        date_time_begin: vm.date_begin,
        date_time_end: vm.date_end,
        location: vm.location,
        id_pais: vm.id_pais,
        id_organizer: vm.id_organizer,
        id_inspector: vm.id_inspector,
        status: vm.id_status,
      });

      var config = {
        method: "put",
        url: process.env.VUE_APP_URLBASE + "events/update/" + this.id_selected,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.statusBol == true) {
            vm._getEvents();
            vm.$swal({
              position: "top-end",
              icon: "success",
              title: "Evento actualizado",
              showConfirmButton: false,
              timer: 1500,
            });
            vm.modalEdit = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    __editEvent(item) {
      this.name = item.name;
      this.date_begin = item.date_time_begin_string;
      this.date_end = item.date_time_end_string;
      this.location = item.location;
      this.id_pais = item.id_pais;
      this.id_organizer = item.id_organizer;
      this.id_inspector = item.id_inspector;
      this.id_selected = item.id;
      this.id_status = item.status;
      this.modalEdit = true;
    },
    _getEvents() {
      let vm = this;
      vm.$store.state.__loadingGetEvents = true;
      var config = {
        method: "get",
        url: process.env.VUE_APP_URLBASE + "events/listAll",
        headers: {},
      };

      axios(config)
        .then(function (response) {
          vm.$store.state.itemsEvents = response.data.data;
          vm.$store.state.__loadingGetEvents = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.__data_table_main {
  background-color: #15182f !important;
  border-radius: 15px;
}
</style>